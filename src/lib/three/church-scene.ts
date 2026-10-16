import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'

/**
 * A little 3D diorama of 5225 Orbitor Drive, built from primitives (no model
 * file to download), animated with keyframe clips in the style of
 * threejs.org/examples/#webgl_animation_keyframes.
 *
 * It follows the real lot: you turn in at the "5225" end, drive along the
 * aisle with the building on your left and parking on your right, all the
 * way to Unit 3 at the far end. Unit 3's door is inside the arch beside the
 * "Kalayaan Community Centre" sign.
 *
 *   - "build": the building assembles itself once, when it first scrolls in
 *   - "arrival": a car drives in, parks across from Unit 3, and the
 *     Kalayaan door opens
 *   - loops: other doors, drifting clouds, circling doves, the Unit 3 marker
 *
 * Units are metres. The building's front faces +z and runs along x, with the
 * entrance at -x and Unit 3 near +x.
 */

export type ChurchScene = {
	/** Starts rendering (call when the canvas is on screen). */
	start(): void
	/** Stops rendering, e.g. while scrolled away or the tab is hidden. */
	stop(): void
	setNight(_night: boolean): void
	/** Plays the build and arrival animations again. */
	replay(): void
	dispose(): void
}

type Options = { reducedMotion: boolean; night: boolean }

const BUILDING = { left: -26, right: 36, depth: 14, height: 5.2 }
const TILE_TOP = 2.9
const STRIPE = { y: 2.4, height: 0.3 }
/** Curb line: sidewalk in front of the units, then the aisle. */
const SIDEWALK = 4.2
const STALLS = { front: 11.8, back: 17.2 }
/** The section just before Unit 3 that juts out toward the lot. */
const PROTRUSION = { left: -6, right: 7, depth: 2, height: 5.6 }
/** Where the parking row stops and the field begins, near the far end. */
const STALLS_END = 27
/** Centre of the stall across the aisle from Unit 3's arch. */
const UNIT3_X = 16.8

const COLORS = {
	stucco: '#c9bfa9',
	coping: '#8f8f8a',
	tile: '#7a1626',
	grout: '#561620',
	yellow: '#e6bd1c',
	mullion: '#8b9197',
	glass: '#33414b',
	interior: '#1c1f22',
	warm: '#ffc874',
	concrete: '#c2beb4',
	asphalt: '#46484b',
	soil: '#5b4a3c',
	grass: '#6f9a45',
	gravel: '#9a9184',
	shrub: '#7ea33f',
	shrubLime: '#b5c93f',
	shrubDark: '#5f8a34',
	pine: '#2f5a37',
	trunk: '#5a4232',
	flower: '#d9353f',
	plaque: '#1f2b4d',
	pin: '#d9473b',
}

const SKY = {
	day: { top: new THREE.Color('#5d9bd5'), bottom: new THREE.Color('#dce9f3') },
	night: {
		top: new THREE.Color('#070d22'),
		bottom: new THREE.Color('#283556'),
	},
}

// --- Textures ------------------------------------------------------------

const canvasTexture = (
	width: number,
	height: number,
	draw: (_ctx: CanvasRenderingContext2D) => void
) => {
	const canvas = document.createElement('canvas')
	canvas.width = width
	canvas.height = height
	draw(canvas.getContext('2d')!)
	const texture = new THREE.CanvasTexture(canvas)
	texture.colorSpace = THREE.SRGBColorSpace
	texture.anisotropy = 4
	return texture
}

/** Speckled noise, for stucco, concrete and asphalt. */
const noiseTexture = (base: string, speck: string, amount: number) => {
	const texture = canvasTexture(256, 256, (ctx) => {
		ctx.fillStyle = base
		ctx.fillRect(0, 0, 256, 256)
		ctx.fillStyle = speck
		for (let i = 0; i < amount; i++) {
			ctx.globalAlpha = Math.random() * 0.35
			ctx.fillRect(Math.random() * 256, Math.random() * 256, 2, 2)
		}
	})
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping
	return texture
}

/** The small square red tiles on the lower facade. */
const tileTexture = () => {
	const texture = canvasTexture(256, 256, (ctx) => {
		const cells = 8
		const size = 256 / cells
		ctx.fillStyle = COLORS.grout
		ctx.fillRect(0, 0, 256, 256)
		for (let x = 0; x < cells; x++) {
			for (let y = 0; y < cells; y++) {
				const c = new THREE.Color(COLORS.tile).multiplyScalar(
					0.9 + Math.random() * 0.2
				)
				ctx.fillStyle = `#${c.getHexString()}`
				ctx.fillRect(x * size + 2, y * size + 2, size - 4, size - 4)
			}
		}
	})
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping
	return texture
}

type Line = { text: string; size: number; italic?: boolean }

/** Navy sign with a gold border, like the ones beside each arch. */
const plaqueTexture = (lines: Line[]) =>
	canvasTexture(512, 400, (ctx) => {
		ctx.fillStyle = COLORS.plaque
		ctx.fillRect(0, 0, 512, 400)
		ctx.strokeStyle = '#d9c27a'
		ctx.lineWidth = 10
		ctx.strokeRect(18, 18, 476, 364)
		ctx.fillStyle = '#ffffff'
		ctx.textAlign = 'center'
		ctx.textBaseline = 'middle'
		const total = lines.reduce((sum, l) => sum + l.size * 1.25, 0)
		let y = 200 - total / 2
		for (const line of lines) {
			y += (line.size * 1.25) / 2
			ctx.font = `${line.italic ? 'italic ' : 'bold '}${line.size}px Georgia, serif`
			ctx.fillText(line.text, 256, y)
			y += (line.size * 1.25) / 2
		}
	})

// --- Scene ----------------------------------------------------------------

export function createChurchScene(
	canvas: HTMLCanvasElement,
	{ reducedMotion, night: startAtNight }: Options
): ChurchScene {
	const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
	renderer.toneMapping = THREE.ACESFilmicToneMapping
	renderer.toneMappingExposure = 0.9
	renderer.shadowMap.enabled = true
	renderer.shadowMap.type = THREE.PCFShadowMap

	const scene = new THREE.Scene()
	const pmrem = new THREE.PMREMGenerator(renderer)
	const room = new RoomEnvironment()
	scene.environment = pmrem.fromScene(room, 0.04).texture
	room.dispose()

	// Looking back along the building from past Unit 3, as in the photo
	// from the Unit 3 end of the lot
	const camera = new THREE.PerspectiveCamera(32, 1, 0.5, 400)
	const BASE_AZIMUTH = 0.5
	const WIDE = { target: new THREE.Vector3(14, 1.8, 6), phi: 1.2 }
	// Close-up once the visitor has parked: Unit 3's way in, framing the
	// Kalayaan sign and the left side of the arch
	const ENTRANCE = {
		target: new THREE.Vector3(UNIT3_X - 1.6, 1.6, 1.4),
		phi: 1.28,
		// Nearly square on, so the arch's deep surround doesn't hide the sign
		theta: 0.06,
		/** Fraction of the wide shot's distance. */
		zoom: 0.3,
	}
	const controls = new OrbitControls(camera, canvas)
	controls.target.copy(WIDE.target)
	camera.position
		.setFromSpherical(new THREE.Spherical(40, WIDE.phi, BASE_AZIMUTH))
		.add(controls.target)
	// Horizontal drags turn the view; vertical swipes still scroll the page,
	// and the mouse wheel is left alone so the page never gets stuck
	controls.enableDamping = true
	controls.enablePan = false
	controls.enableZoom = false
	controls.minAzimuthAngle = -0.6
	controls.maxAzimuthAngle = 1.35
	controls.minPolarAngle = 0.55
	controls.maxPolarAngle = 1.38
	canvas.style.touchAction = 'pan-y'

	// --- Materials

	const textures: THREE.Texture[] = []
	const keep = <T extends THREE.Texture>(t: T) => {
		textures.push(t)
		return t
	}

	const { left, right, depth, height } = BUILDING
	const width = right - left

	const stuccoMap = keep(noiseTexture(COLORS.stucco, '#8a8270', 9000))
	stuccoMap.repeat.set(14, 2)
	const tileMap = keep(tileTexture())
	const asphaltMap = keep(noiseTexture(COLORS.asphalt, '#9a9a9a', 14000))
	asphaltMap.repeat.set(9, 5)
	const concreteMap = keep(noiseTexture(COLORS.concrete, '#7d786f', 6000))
	concreteMap.repeat.set(18, 1)

	/** Red tile sized so the tiles stay the same size on any panel. */
	const tileMaterial = (w: number, h: number) => {
		const map = keep(tileMap.clone())
		map.repeat.set(w / 1.3, h / 1.3)
		return new THREE.MeshStandardMaterial({ map, roughness: 0.45 })
	}

	const mat = {
		stucco: new THREE.MeshStandardMaterial({ map: stuccoMap, roughness: 0.95 }),
		coping: new THREE.MeshStandardMaterial({
			color: COLORS.coping,
			roughness: 0.7,
		}),
		yellow: new THREE.MeshStandardMaterial({
			color: COLORS.yellow,
			roughness: 0.5,
		}),
		mullion: new THREE.MeshStandardMaterial({
			color: COLORS.mullion,
			metalness: 0.7,
			roughness: 0.35,
		}),
		glass: new THREE.MeshStandardMaterial({
			color: COLORS.glass,
			metalness: 0.9,
			roughness: 0.06,
			transparent: true,
			opacity: 0.55,
		}),
		// Behind the glass: dark by day, lit up warm at night
		interior: new THREE.MeshStandardMaterial({
			color: COLORS.interior,
			emissive: COLORS.warm,
			emissiveIntensity: 0,
			roughness: 1,
		}),
		lamp: new THREE.MeshStandardMaterial({
			color: '#202020',
			emissive: COLORS.warm,
			emissiveIntensity: 0,
		}),
		concrete: new THREE.MeshStandardMaterial({
			map: concreteMap,
			roughness: 0.9,
		}),
		asphalt: new THREE.MeshStandardMaterial({ map: asphaltMap, roughness: 1 }),
		soil: new THREE.MeshStandardMaterial({ color: COLORS.soil, roughness: 1 }),
		grass: new THREE.MeshStandardMaterial({
			color: COLORS.grass,
			roughness: 1,
		}),
		gravel: new THREE.MeshStandardMaterial({
			color: COLORS.gravel,
			roughness: 1,
		}),
		shrub: new THREE.MeshStandardMaterial({
			color: COLORS.shrub,
			roughness: 0.85,
			flatShading: true,
		}),
		shrubLime: new THREE.MeshStandardMaterial({
			color: COLORS.shrubLime,
			roughness: 0.85,
			flatShading: true,
		}),
		shrubDark: new THREE.MeshStandardMaterial({
			color: COLORS.shrubDark,
			roughness: 0.85,
			flatShading: true,
		}),
		pine: new THREE.MeshStandardMaterial({
			color: COLORS.pine,
			roughness: 0.9,
			flatShading: true,
		}),
		trunk: new THREE.MeshStandardMaterial({
			color: COLORS.trunk,
			roughness: 1,
		}),
		flower: new THREE.MeshStandardMaterial({
			color: COLORS.flower,
			roughness: 0.6,
		}),
		paint: new THREE.MeshStandardMaterial({ color: '#f2f2ee', roughness: 0.8 }),
		paintYellow: new THREE.MeshStandardMaterial({
			color: '#e9c43a',
			roughness: 0.8,
		}),
		cloud: new THREE.MeshStandardMaterial({
			color: '#ffffff',
			roughness: 1,
			flatShading: true,
		}),
		dove: new THREE.MeshStandardMaterial({
			color: '#fbfbf8',
			roughness: 0.7,
			side: THREE.DoubleSide,
		}),
		tire: new THREE.MeshStandardMaterial({ color: '#1b1b1b', roughness: 0.9 }),
		pin: new THREE.MeshStandardMaterial({
			color: COLORS.pin,
			emissive: COLORS.pin,
			emissiveIntensity: 0.25,
			roughness: 0.4,
		}),
		plaqueEdge: new THREE.MeshStandardMaterial({ color: COLORS.plaque }),
	}

	// --- Helpers

	const root = new THREE.Group()
	root.name = 'root'
	scene.add(root)

	let uid = 0
	const named = <T extends THREE.Object3D>(object: T, prefix: string) => {
		object.name = `${prefix}-${uid++}`
		return object
	}

	const box = (
		w: number,
		h: number,
		d: number,
		material: THREE.Material | THREE.Material[],
		x = 0,
		y = 0,
		z = 0
	) => {
		const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material)
		mesh.position.set(x, y, z)
		return mesh
	}

	/** A group whose origin sits at the base, so scaling y "grows" it upward. */
	const piece = (prefix: string, x = 0, y = 0, z = 0) => {
		const group = named(new THREE.Group(), prefix)
		group.position.set(x, y, z)
		root.add(group)
		return group
	}

	const Y = new THREE.Vector3(0, 1, 0)
	/** Rotation that points a model's +x (its front) along `direction`. */
	const facing = (direction: THREE.Vector3) =>
		new THREE.Quaternion().setFromAxisAngle(
			Y,
			Math.atan2(-direction.z, direction.x)
		)
	const turn = (angle: number) =>
		new THREE.Quaternion().setFromAxisAngle(Y, angle).toArray()

	// --- Build animation tracks (filled in as pieces are made)

	const buildTracks: THREE.KeyframeTrack[] = []
	const TINY = 0.0001

	/** Grows `object` from nothing along the given axes, with a little overshoot. */
	const grow = (
		object: THREE.Object3D,
		at: number,
		duration = 0.6,
		axes = 'xyz'
	) => {
		const from = ['x', 'y', 'z'].map((a) => (axes.includes(a) ? TINY : 1))
		const over = ['x', 'y', 'z'].map((a) => (axes.includes(a) ? 1.08 : 1))
		buildTracks.push(
			new THREE.VectorKeyframeTrack(
				`${object.name}.scale`,
				[0, at, at + duration * 0.7, at + duration],
				[...from, ...from, ...over, 1, 1, 1]
			)
		)
	}

	/** Drops `object` into place from above, with a bounce. */
	const drop = (object: THREE.Object3D, at: number, rise = 9) => {
		const { x, y, z } = object.position
		buildTracks.push(
			new THREE.VectorKeyframeTrack(
				`${object.name}.position`,
				[0, at, at + 0.45, at + 0.6, at + 0.72],
				[x, y + rise, z, x, y + rise, z, x, y, z, x, y + 0.25, z, x, y, z]
			),
			// Hidden until its turn, so it doesn't hang in the sky
			new THREE.BooleanKeyframeTrack(
				`${object.name}.visible`,
				[0, at],
				[false, true]
			)
		)
	}

	// --- Ground: a diorama slab with the lot, sidewalk and grass

	const SLAB = { left: -36, right: 50, front: 27, back: -17 }
	/** The field past the end of the building. */
	const FIELD = 42
	const slabWidth = SLAB.right - SLAB.left
	const slabDepth = SLAB.front - SLAB.back
	const ground = piece('ground')
	ground.add(
		box(
			slabWidth,
			1.2,
			slabDepth,
			[mat.soil, mat.soil, mat.asphalt, mat.soil, mat.soil, mat.soil],
			(SLAB.left + SLAB.right) / 2,
			-0.6,
			(SLAB.front + SLAB.back) / 2
		)
	)
	// Sidewalk along the front, with a curb at the aisle
	ground.add(
		box(
			width + 2,
			0.16,
			SIDEWALK,
			mat.concrete,
			(left + right) / 2,
			0.08,
			SIDEWALK / 2
		)
	)
	ground.add(
		box(width + 2, 0.2, 0.25, mat.concrete, (left + right) / 2, 0.1, SIDEWALK)
	)
	// Grass behind the parking row, the open field past the far end (the
	// aisle curves round the end of the building to it), and the lawn across
	// the aisle once the parking row stops
	const grass = (x0: number, x1: number, z0: number, z1: number) =>
		ground.add(
			box(x1 - x0, 0.06, z1 - z0, mat.grass, (x0 + x1) / 2, 0.03, (z0 + z1) / 2)
		)
	grass(SLAB.left, FIELD, STALLS.back + 0.6, SLAB.front)
	grass(FIELD, SLAB.right, SLAB.back, SLAB.front)
	grass(STALLS_END + 0.6, FIELD, STALLS.front - 0.2, STALLS.back + 0.6)
	// The parking row on the far side of the aisle, with yellow lines
	const rowStart = SLAB.left + 2
	ground.add(
		box(
			STALLS_END - rowStart,
			0.02,
			0.12,
			mat.paintYellow,
			(rowStart + STALLS_END) / 2,
			0.01,
			STALLS.front
		)
	)
	for (let x = rowStart; x <= STALLS_END; x += 2.8) {
		ground.add(
			box(
				0.12,
				0.02,
				STALLS.back - STALLS.front,
				mat.paintYellow,
				x,
				0.01,
				(STALLS.front + STALLS.back) / 2
			)
		)
	}
	// Picnic table out on the field
	const wood = new THREE.MeshStandardMaterial({
		color: '#8a6a4a',
		roughness: 0.9,
	})
	const picnic = new THREE.Group()
	picnic.position.set(45, 0, 9)
	picnic.rotation.y = 0.4
	picnic.add(box(2, 0.08, 0.8, wood, 0, 0.75, 0))
	for (const side of [-1, 1]) {
		picnic.add(box(2, 0.06, 0.3, wood, 0, 0.45, side * 0.62))
		picnic.add(box(0.08, 0.75, 1.5, wood, side * 0.8, 0.37, 0))
	}
	ground.add(picnic)
	grow(ground, 0, 0.7)

	// --- Arches: openings cut into the front wall, flush with the red tile
	// either side, with a porch set back into the building

	const ARCH = { opening: 3.4, spring: 3.0, depth: 1.7 }
	const ARCHES = [-14.2, UNIT3_X, 28.4]
	type Doors = { left: THREE.Object3D; right: THREE.Object3D }

	const archOpening = (r: number, cx = 0) => {
		const path = new THREE.Shape()
		path.moveTo(cx - r, 0)
		path.lineTo(cx + r, 0)
		path.lineTo(cx + r, ARCH.spring)
		path.absarc(cx, ARCH.spring, r, 0, Math.PI, false)
		path.lineTo(cx - r, 0)
		return path
	}

	/** Never drawn: for faces that would cover an arch opening. */
	const hidden = new THREE.MeshBasicMaterial({ visible: false })
	// Extruded shapes get UVs in metres rather than 0..1, so the stucco
	// texture is scaled to match the boxes (one repeat per 4.4 m x 2.6 m)
	const stuccoFor = (side: THREE.Side) => {
		const map = keep(stuccoMap.clone())
		map.repeat.set(1 / 4.4, 1 / 2.6)
		return new THREE.MeshStandardMaterial({ map, roughness: 0.95, side })
	}
	const FACADE_DEPTH = 0.25

	// --- Building shell

	const walls = piece('walls')
	// The box's front face is left off; the front wall below has the holes
	walls.add(
		box(
			width,
			height,
			depth,
			[mat.stucco, mat.stucco, mat.stucco, mat.stucco, hidden, mat.stucco],
			(left + right) / 2,
			height / 2,
			-depth / 2
		)
	)
	// Coping along the roof edge
	walls.add(
		box(
			width + 0.3,
			0.22,
			0.4,
			mat.coping,
			(left + right) / 2,
			height + 0.06,
			0.05
		)
	)
	walls.add(
		box(0.4, 0.22, depth, mat.coping, left - 0.05, height + 0.06, -depth / 2)
	)
	walls.add(
		box(0.4, 0.22, depth, mat.coping, right + 0.05, height + 0.06, -depth / 2)
	)
	const frontWall = new THREE.Shape()
	frontWall.moveTo(left, 0)
	frontWall.lineTo(right, 0)
	frontWall.lineTo(right, height)
	frontWall.lineTo(left, height)
	frontWall.closePath()
	for (const x of ARCHES) frontWall.holes.push(archOpening(ARCH.opening / 2, x))
	const front = new THREE.Mesh(
		new THREE.ExtrudeGeometry(frontWall, {
			depth: FACADE_DEPTH,
			bevelEnabled: false,
			curveSegments: 32,
		}),
		stuccoFor(THREE.FrontSide)
	)
	front.position.z = -FACADE_DEPTH
	walls.add(front)
	grow(walls, 0.5, 0.9, 'y')

	// The section before Unit 3 sits forward of the rest, a little taller
	const P = PROTRUSION
	const protrusion = piece('protrusion')
	protrusion.add(
		box(
			P.right - P.left,
			P.height,
			P.depth,
			mat.stucco,
			(P.left + P.right) / 2,
			P.height / 2,
			P.depth / 2
		)
	)
	protrusion.add(
		box(
			P.right - P.left + 0.3,
			0.22,
			0.4,
			mat.coping,
			(P.left + P.right) / 2,
			P.height + 0.06,
			P.depth + 0.05
		)
	)
	for (const x of [P.left - 0.05, P.right + 0.05]) {
		protrusion.add(
			box(0.4, 0.22, P.depth, mat.coping, x, P.height + 0.06, P.depth / 2)
		)
	}
	// Red tile and the yellow stripe carry on across its front and round
	// both sides
	const pWidth = P.right - P.left
	const pMiddle = (P.left + P.right) / 2
	protrusion.add(
		box(
			pWidth,
			TILE_TOP,
			0.12,
			tileMaterial(pWidth, TILE_TOP),
			pMiddle,
			TILE_TOP / 2,
			P.depth + 0.06
		)
	)
	protrusion.add(
		box(
			pWidth,
			STRIPE.height,
			0.16,
			mat.yellow,
			pMiddle,
			STRIPE.y + STRIPE.height / 2,
			P.depth + 0.08
		)
	)
	const sideTiles = tileMaterial(P.depth + 0.12, TILE_TOP)
	for (const side of [-1, 1]) {
		const x = side < 0 ? P.left : P.right
		protrusion.add(
			box(
				0.12,
				TILE_TOP,
				P.depth + 0.12,
				sideTiles,
				x + side * 0.06,
				TILE_TOP / 2,
				(P.depth + 0.12) / 2
			)
		)
		protrusion.add(
			box(
				0.16,
				STRIPE.height,
				P.depth + 0.16,
				mat.yellow,
				x + side * 0.08,
				STRIPE.y + STRIPE.height / 2,
				(P.depth + 0.16) / 2
			)
		)
	}
	// Utility box at the foot of its corner, as in the photos
	protrusion.add(
		box(0.5, 0.6, 0.06, mat.paint, P.right - 1.6, 0.6, P.depth + 0.15)
	)
	grow(protrusion, 0.7, 0.9, 'y')

	// "5225" up on the wall at the entrance end
	const numberTexture = keep(
		canvasTexture(512, 160, (ctx) => {
			ctx.fillStyle = '#2b2b2b'
			ctx.font = 'bold 130px Helvetica, Arial, sans-serif'
			ctx.textAlign = 'center'
			ctx.textBaseline = 'middle'
			ctx.fillText('5225', 256, 86)
		})
	)
	const number = new THREE.Mesh(
		new THREE.PlaneGeometry(3, 0.95),
		new THREE.MeshStandardMaterial({
			map: numberTexture,
			transparent: true,
			roughness: 0.6,
		})
	)
	number.position.set(left + 1.9, 4.3, 0.02)
	walls.add(number)

	// Red tile band and the yellow stripe across the units
	const tileLeft = left + 0.3
	const tileRight = right - 0.3
	// Spans of wall between the arch openings
	const spans: [number, number][] = []
	let spanStart = tileLeft
	for (const x of ARCHES) {
		spans.push([spanStart, x - ARCH.opening / 2])
		spanStart = x + ARCH.opening / 2
	}
	spans.push([spanStart, tileRight])

	const tiles = piece('tiles')
	for (const [x0, x1] of spans) {
		tiles.add(
			box(
				x1 - x0,
				TILE_TOP,
				0.12,
				tileMaterial(x1 - x0, TILE_TOP),
				(x0 + x1) / 2,
				TILE_TOP / 2,
				0.06
			)
		)
	}
	grow(tiles, 1.25, 0.6, 'y')

	// Grows from the left, so positions are relative to tileLeft
	const stripe = piece('stripe', tileLeft, 0, 0)
	for (const [x0, x1] of spans) {
		stripe.add(
			box(
				x1 - x0,
				STRIPE.height,
				0.16,
				mat.yellow,
				(x0 + x1) / 2 - tileLeft,
				STRIPE.y + STRIPE.height / 2,
				0.08
			)
		)
	}
	grow(stripe, 1.7, 0.6, 'x')

	// Rooftop units
	;[
		[-18, -5],
		[-4, -8],
		[10, -4],
		[24, -6],
	].forEach(([x, z], i) => {
		const unit = piece('hvac', x, height, z)
		unit.add(box(2.2, 1, 1.6, mat.coping, 0, 0.5, 0))
		unit.add(box(1.6, 0.12, 1.1, mat.mullion, 0, 1.06, 0))
		drop(unit, 3.9 + i * 0.12)
	})

	// --- Arched entrances: a recessed porch with fixed glass at the back
	// and a door in each side wall, one for the unit on either side

	const makeArch = (x: number, at: number): Doors => {
		const r = ARCH.opening / 2
		const group = piece('arch', x, 0, 0)

		// Raised moulding round the top of the arch, on the wall face
		const ring = new THREE.Shape()
		ring.absarc(0, ARCH.spring, r + 0.35, 0, Math.PI, false)
		ring.lineTo(-r, ARCH.spring)
		ring.absarc(0, ARCH.spring, r, Math.PI, 0, true)
		ring.lineTo(r + 0.35, ARCH.spring)
		group.add(
			new THREE.Mesh(
				new THREE.ExtrudeGeometry(ring, {
					depth: 0.1,
					bevelEnabled: false,
					curveSegments: 32,
				}),
				mat.stucco
			)
		)

		// The porch: walls and vaulted ceiling seen from inside (back faces of
		// an extruded arch), carrying on from the hole in the front wall
		const porchDepth = ARCH.depth - FACADE_DEPTH
		const porch = new THREE.Mesh(
			new THREE.ExtrudeGeometry(archOpening(r), {
				depth: porchDepth,
				bevelEnabled: false,
				curveSegments: 32,
			}),
			// Extrude groups: 0 = the end caps (left open), 1 = the sides
			[hidden, stuccoFor(THREE.BackSide)]
		)
		porch.position.z = -ARCH.depth
		group.add(porch)
		// Floor, level with the sidewalk
		group.add(
			box(
				ARCH.opening,
				0.16,
				ARCH.depth,
				mat.concrete,
				0,
				0.08,
				-ARCH.depth / 2
			)
		)

		// Back of the porch: fixed storefront glass with a centre bar
		const back = -ARCH.depth
		const lobby = new THREE.Mesh(
			new THREE.ShapeGeometry(archOpening(r), 32),
			mat.interior
		)
		lobby.position.z = back + 0.01
		group.add(lobby)
		const glass = new THREE.Mesh(
			new THREE.ShapeGeometry(archOpening(r - 0.02), 32),
			mat.glass
		)
		glass.position.z = back + 0.05
		group.add(glass)
		group.add(
			box(
				0.14,
				ARCH.spring + r,
				0.1,
				mat.mullion,
				0,
				(ARCH.spring + r) / 2,
				back + 0.09
			)
		)
		group.add(box(ARCH.opening, 0.08, 0.08, mat.mullion, 0, 2.2, back + 0.09))
		group.add(
			box(ARCH.opening, 0.08, 0.08, mat.mullion, 0, ARCH.spring, back + 0.09)
		)
		group.add(box(ARCH.opening, 0.12, 0.1, mat.mullion, 0, 0.22, back + 0.09))

		// A door in each side wall, hinged at the back and swinging out into
		// the porch. Hinge is at the back corner; the leaf runs forward (+z).
		const doorTop = 2.3
		const doorLength = 1.0
		// Hinged near the back of the porch; the leaf runs forward from there
		const hingeZ = -ARCH.depth + 0.4
		const makeDoor = (side: -1 | 1) => {
			const wallX = side * (r - 0.02)
			// Lit room behind the doorway
			group.add(
				box(
					0.02,
					doorTop + 0.1,
					doorLength + 0.1,
					mat.interior,
					wallX + side * 0.01,
					0.16 + (doorTop + 0.1) / 2,
					hingeZ + doorLength / 2
				)
			)
			const hinge = named(new THREE.Group(), 'door')
			hinge.position.set(wallX - side * 0.04, 0.16, hingeZ)
			const leaf = new THREE.Group()
			leaf.add(
				box(
					0.05,
					doorTop,
					doorLength,
					mat.glass,
					0,
					doorTop / 2,
					doorLength / 2
				)
			)
			leaf.add(
				box(0.08, 0.12, doorLength, mat.mullion, 0, 0.06, doorLength / 2)
			)
			leaf.add(
				box(
					0.08,
					0.08,
					doorLength,
					mat.mullion,
					0,
					doorTop - 0.04,
					doorLength / 2
				)
			)
			leaf.add(box(0.08, doorTop, 0.06, mat.mullion, 0, doorTop / 2, 0.03))
			leaf.add(
				box(0.08, doorTop, 0.06, mat.mullion, 0, doorTop / 2, doorLength - 0.03)
			)
			leaf.add(
				box(
					0.06,
					0.06,
					0.06,
					mat.mullion,
					-side * 0.06,
					1.05,
					doorLength - 0.15
				)
			)
			hinge.add(leaf)
			group.add(hinge)
			return hinge
		}
		const doors = { left: makeDoor(-1), right: makeDoor(1) }

		// Doormat
		group.add(box(1.8, 0.03, 0.9, mat.tire, 0, 0.17, -0.55))

		drop(group, at)
		return doors
	}

	// --- Sloped glass sunrooms

	type SunroomOptions = {
		/** Distance out from the wall it's built against. */
		z?: number
		/** Turn it to sit on a side wall (-PI/2 faces -x). */
		rotation?: number
		depth?: number
		front?: number
		back?: number
	}
	const makeSunroom = (
		x: number,
		w: number,
		at: number,
		{
			z = 0.12,
			rotation = 0,
			depth: D = 1.8,
			front = 2.7,
			back = 3.6,
		}: SunroomOptions = {}
	) => {
		const group = piece('sunroom', x, 0, z)
		group.rotation.y = rotation

		group.add(box(w, 0.3, D, mat.concrete, 0, 0.15, D / 2))
		// Dark room behind the glass. Sits just in front of the yellow stripe
		// (which stands 0.16 off the wall) so the two don't z-fight and flicker
		group.add(box(w - 0.1, back, 0.02, mat.interior, 0, back / 2, 0.1))

		// Glass: front, sloped roof, and the two trapezoid ends
		group.add(
			box(w, front - 0.3, 0.03, mat.glass, 0, 0.3 + (front - 0.3) / 2, D)
		)
		const run = Math.hypot(D, back - front)
		const roof = box(w, 0.03, run, mat.glass, 0, (front + back) / 2, D / 2)
		roof.rotation.x = Math.atan2(back - front, D)
		group.add(roof)
		const end = new THREE.Shape()
		end.moveTo(0, 0.3)
		end.lineTo(D, 0.3)
		end.lineTo(D, front)
		end.lineTo(0, back)
		end.closePath()
		for (const side of [-1, 1]) {
			const pane = new THREE.Mesh(new THREE.ShapeGeometry(end), mat.glass)
			pane.rotation.y = -Math.PI / 2
			pane.position.x = (side * w) / 2
			group.add(pane)
		}

		// Mullions: posts along the front, rafters along the roof
		const bays = Math.max(3, Math.round(w / 1.15))
		for (let i = 0; i <= bays; i++) {
			const px = -w / 2 + (i * w) / bays
			group.add(
				box(0.08, front - 0.3, 0.1, mat.mullion, px, 0.3 + (front - 0.3) / 2, D)
			)
			const rafter = box(
				0.08,
				0.08,
				run,
				mat.mullion,
				px,
				(front + back) / 2 + 0.03,
				D / 2
			)
			rafter.rotation.x = roof.rotation.x
			group.add(rafter)
		}
		group.add(box(w + 0.08, 0.1, 0.12, mat.mullion, 0, front, D))
		group.add(box(w + 0.08, 0.1, 0.12, mat.mullion, 0, 0.35, D))
		group.add(box(w + 0.08, 0.1, 0.12, mat.mullion, 0, back, 0.05))
		group.add(box(w, 0.06, 0.08, mat.mullion, 0, 1.6, D))

		drop(group, at)
	}

	// --- Plaques, lamps and planting

	const lights: THREE.PointLight[] = []

	/** The navy sign on a pier. Other units' piers are left as plain tile. */
	const makePlaque = (x: number, lines: Line[], at: number, size = 1) => {
		const face = new THREE.MeshStandardMaterial({
			map: keep(plaqueTexture(lines)),
			roughness: 0.4,
		})
		const group = piece('plaque', x, 1.75, 0.14)
		const edge = mat.plaqueEdge
		group.add(
			box(1.1 * size, 0.86 * size, 0.06, [edge, edge, edge, edge, face, edge])
		)
		grow(group, at, 0.4)
	}

	const makeLamp = (x: number, at: number) => {
		const group = piece('lamp', x, 3.35, 0.12)
		group.add(box(0.16, 0.34, 0.14, mat.lamp, 0, 0, 0.07))
		group.add(box(0.06, 0.06, 0.14, mat.coping, 0, 0.22, 0.04))
		const light = new THREE.PointLight(COLORS.warm, 0, 9, 1.6)
		light.position.set(0, -0.3, 0.6)
		group.add(light)
		lights.push(light)
		grow(group, at, 0.3)
	}

	const shrubGeometry = new THREE.IcosahedronGeometry(0.5, 1)
	const flowerGeometry = new THREE.SphereGeometry(0.07, 6, 4)

	const makeBed = (
		x: number,
		w: number,
		at: number,
		kind: 'shrubs' | 'lime' | 'flowers'
	) => {
		const bed = piece('bed', x, 0.16, 0.12)
		bed.add(box(w, 0.08, 1.1, mat.gravel, 0, 0.04, 0.55))
		grow(bed, at, 0.3, 'xz')
		const count = Math.max(2, Math.round(w / 0.7))
		for (let i = 0; i < count; i++) {
			const px = x - w / 2 + ((i + 0.5) * w) / count
			const plant = piece('plant', px, 0.2, 0.12 + 0.35 + Math.random() * 0.4)
			if (kind === 'flowers') {
				const leaves = new THREE.Mesh(shrubGeometry, mat.shrubDark)
				leaves.scale.setScalar(0.45)
				leaves.position.y = 0.18
				plant.add(leaves)
				for (let f = 0; f < 5; f++) {
					const flower = new THREE.Mesh(flowerGeometry, mat.flower)
					flower.position.set(
						(Math.random() - 0.5) * 0.4,
						0.35 + Math.random() * 0.12,
						(Math.random() - 0.5) * 0.3
					)
					plant.add(flower)
				}
			} else {
				const s = 0.7 + Math.random() * 0.6
				const material =
					kind === 'lime' ? mat.shrubLime : i % 2 ? mat.shrub : mat.shrubDark
				const shrub = new THREE.Mesh(shrubGeometry, material)
				shrub.scale.set(s, s * 0.85, s)
				shrub.position.y = 0.3 * s
				plant.add(shrub)
			}
			grow(plant, at + 0.15 + i * 0.05, 0.45)
		}
	}

	// --- Facade, from the entrance end (-x) to the far end (+x)

	let t = 2.0
	const next = (step = 0.12) => (t += step)

	// Entrance end: a bank of mailboxes on the end wall, with a small
	// sunroom at its front corner
	makeSunroom(left - 0.12, 3.6, next(), { z: -2.4, rotation: -Math.PI / 2 })
	const mailboxes = piece('mailboxes', left - 0.13, 0, -7.6)
	const mailboxMaterial = new THREE.MeshStandardMaterial({
		color: '#c3c7ca',
		metalness: 0.4,
		roughness: 0.5,
	})
	for (const dz of [-1.5, 0, 1.5]) {
		mailboxes.add(box(0.24, 0.9, 1.4, mailboxMaterial, 0, 1.55, dz))
		for (const dy of [-0.25, 0.05, 0.3]) {
			mailboxes.add(box(0.02, 0.02, 1.3, mat.coping, -0.13, 1.55 + dy, dz))
		}
	}
	grow(mailboxes, 3.4, 0.4)

	// First unit: a plain door in the red tile
	const sideDoor = piece('side-door', left + 1.5, 0, 0.12)
	sideDoor.add(box(1.1, 2.3, 0.04, mat.mullion, 0, 1.15, 0.02))
	sideDoor.add(box(0.95, 2.2, 0.05, mat.interior, 0, 1.1, 0.03))
	grow(sideDoor, 3.2, 0.4)
	makeLamp(left + 2.6, 3.55)
	makeBed(left + 3.4, 1.4, 3.5, 'shrubs')

	// A unit like Unit 3 on the way in
	makeSunroom(-20.5, 5, next())
	makeLamp(-17.2, 3.6)
	makeArch(ARCHES[0], next())
	makeLamp(-11.2, 3.65)
	makeBed(-11.2, 1.4, 3.5, 'shrubs')
	makeSunroom(-8.4, 3.8, next())

	// The section that juts out, with a wide, shallow window bay across it
	makeSunroom(-0.4, 6.8, next(), {
		z: PROTRUSION.depth + 0.12,
		depth: 1,
		front: 2.9,
		back: 3.4,
	})

	// Then back to the main wall: the sunroom beside Unit 3
	makeSunroom(9.9, 5.6, next())

	// Unit 3: Kalayaan Community Centre on the left pier, its door in the
	// left side of the arch
	makePlaque(
		13.7,
		[
			{ text: 'KALAYAAN', size: 62 },
			{ text: 'Community', size: 48, italic: true },
			{ text: 'Centre', size: 48, italic: true },
		],
		3.5,
		// A little larger than the real one, so it reads from across the lot
		1.35
	)
	makeLamp(13.7, 3.7)
	makeBed(13.7, 1.6, 3.6, 'flowers')
	const unit3Doors = makeArch(ARCHES[1], next())
	makeLamp(19.9, 3.75)
	makeBed(19.9, 1.6, 3.65, 'lime')

	// Past Unit 3: a sunroom, one more arch, and the sunroom at the end
	makeSunroom(22.8, 4, next())
	makeLamp(25.5, 3.8)
	makeBed(25.5, 1.2, 3.7, 'shrubs')
	makeArch(ARCHES[2], next())
	makeLamp(31.2, 3.85)
	makeSunroom(33.7, 3.8, next())

	// Curbed island at the corner, with red flowers round a tree
	const island = piece('island', right + 2.3, 0, 2.2)
	island.add(box(3.6, 0.18, 3.4, mat.concrete, 0, 0.09, 0))
	island.add(box(3.3, 0.22, 3.1, mat.soil, 0, 0.11, 0))
	for (let i = 0; i < 9; i++) {
		const flower = new THREE.Mesh(flowerGeometry, mat.flower)
		flower.scale.setScalar(1.6)
		flower.position.set(
			(Math.random() - 0.5) * 2.8,
			0.32,
			(Math.random() - 0.5) * 2.6
		)
		island.add(flower)
	}
	grow(island, 3.5, 0.4, 'xz')

	// --- Trees: pines and a few leafy ones on the grass

	const coneGeometry = new THREE.ConeGeometry(1.4, 3, 7)
	const trunkGeometry = new THREE.CylinderGeometry(0.18, 0.24, 1.4, 6)
	const leafyGeometry = new THREE.IcosahedronGeometry(1.6, 1)
	const makeTree = (
		x: number,
		z: number,
		at: number,
		kind: 'pine' | 'leafy'
	) => {
		const tree = piece('tree', x, 0, z)
		const trunk = new THREE.Mesh(trunkGeometry, mat.trunk)
		trunk.position.y = 0.7
		tree.add(trunk)
		if (kind === 'pine') {
			for (const [y, s] of [
				[2.2, 1.2],
				[3.6, 0.95],
				[4.8, 0.7],
			]) {
				const cone = new THREE.Mesh(coneGeometry, mat.pine)
				cone.position.y = y
				cone.scale.setScalar(s)
				tree.add(cone)
			}
		} else {
			const crown = new THREE.Mesh(leafyGeometry, mat.shrub)
			crown.position.y = 2.6
			crown.scale.set(1.2, 1, 1.2)
			tree.add(crown)
		}
		grow(tree, at, 0.5)
	}
	;[
		// Kept out of the way of the camera, which looks back from the far end
		[right + 2.3, 2.2, 'leafy'],
		[-33, 22, 'leafy'],
		[-26, 23, 'pine'],
		[-18, 22, 'pine'],
		[-9, 23.5, 'leafy'],
		[-1, 22, 'pine'],
		[44, -9, 'pine'],
		[47, -3, 'pine'],
		[46, 21, 'pine'],
		[48, 14, 'leafy'],
		[-34, 2, 'leafy'],
	].forEach(([x, z, kind], i) =>
		makeTree(x as number, z as number, 3.8 + i * 0.07, kind as 'pine' | 'leafy')
	)

	// --- Cars

	const wheelGeometry = new THREE.CylinderGeometry(0.36, 0.36, 0.28, 16)
	const makeCar = (color: string) => {
		const car = named(new THREE.Group(), 'car')
		const paint = new THREE.MeshStandardMaterial({
			color,
			metalness: 0.5,
			roughness: 0.35,
		})
		car.add(box(4.3, 0.75, 1.8, paint, 0, 0.65, 0))
		car.add(box(2.3, 0.62, 1.62, mat.glass, -0.2, 1.33, 0))
		car.add(box(2.1, 0.06, 1.5, paint, -0.2, 1.66, 0))
		for (const [wx, wz] of [
			[1.35, 0.85],
			[-1.35, 0.85],
			[1.35, -0.85],
			[-1.35, -0.85],
		]) {
			const w = new THREE.Mesh(wheelGeometry, mat.tire)
			w.rotation.x = Math.PI / 2
			w.position.set(wx, 0.36, wz)
			car.add(w)
		}
		root.add(car)
		return car
	}

	// Parked nose-in along the far side of the aisle, leaving the spot
	// across from Unit 3 free
	const stallZ = (STALLS.front + STALLS.back) / 2
	const parkedColors = [
		'#9aa4ad',
		'#1d1f24',
		'#e9e9e6',
		'#7d1d24',
		'#3b4a5c',
		'#c8ccd0',
		'#2a2c30',
	]
	let parkedCount = 0
	for (let x = SLAB.left + 3.4; x <= STALLS_END - 1; x += 2.8) {
		if (Math.abs(x - UNIT3_X) < 2 || Math.random() < 0.35) continue
		const car = makeCar(parkedColors[parkedCount % parkedColors.length])
		car.position.set(x, 0, stallZ)
		car.quaternion.copy(facing(new THREE.Vector3(0, 0, 1)))
		drop(car, 4 + (parkedCount++ % 8) * 0.08, 6)
	}
	// Snap the free stall onto the grid
	const freeStall =
		SLAB.left + 3.4 + Math.round((UNIT3_X - SLAB.left - 3.4) / 2.8) * 2.8

	// The visitor: in at the entrance end, down the aisle with the building
	// on the left, then a right turn into the free stall
	const driver = makeCar('#2f6fb3')
	const laneZ = (SIDEWALK + STALLS.front) / 2 + 1.2
	const route = new THREE.CatmullRomCurve3(
		[
			new THREE.Vector3(SLAB.left + 1, 0, laneZ),
			new THREE.Vector3(-10, 0, laneZ),
			new THREE.Vector3(freeStall - 5, 0, laneZ),
			new THREE.Vector3(freeStall - 1.6, 0, laneZ + 1.1),
			new THREE.Vector3(freeStall, 0, STALLS.front + 0.6),
			new THREE.Vector3(freeStall, 0, stallZ),
		],
		false,
		'catmullrom',
		0.5
	)
	const parkedAt = route.getPointAt(1)
	const parkedFacing = facing(new THREE.Vector3(0, 0, 1))
	driver.visible = false

	// --- Marker over Unit 3

	const marker = piece('marker', UNIT3_X, height + 1.6, 1)
	const bob = named(new THREE.Group(), 'bob')
	marker.add(bob)
	const pinHead = new THREE.Mesh(
		new THREE.SphereGeometry(0.55, 20, 14),
		mat.pin
	)
	pinHead.position.y = 0.9
	const pinTip = new THREE.Mesh(new THREE.ConeGeometry(0.42, 1, 20), mat.pin)
	pinTip.rotation.x = Math.PI
	pinTip.position.y = 0.25
	const pinDot = new THREE.Mesh(
		new THREE.SphereGeometry(0.22, 12, 8),
		new THREE.MeshStandardMaterial({ color: '#ffffff' })
	)
	pinDot.position.set(0, 0.9, 0.42)
	bob.add(pinHead, pinTip, pinDot)
	const labelTexture = keep(
		canvasTexture(1024, 128, (ctx) => {
			ctx.fillStyle = '#ffffff'
			ctx.beginPath()
			ctx.roundRect(4, 4, 1016, 120, 60)
			ctx.fill()
			ctx.fillStyle = '#1b4d48'
			ctx.font = 'bold 54px Helvetica, Arial, sans-serif'
			ctx.textAlign = 'center'
			ctx.textBaseline = 'middle'
			ctx.fillText('Unit 3 · Freedom in Christ Church', 512, 66)
		})
	)
	const label = new THREE.Sprite(
		new THREE.SpriteMaterial({ map: labelTexture })
	)
	label.scale.set(9.6, 1.2, 1)
	label.position.y = 2.2
	bob.add(label)
	grow(marker, 4.6, 0.5)

	// --- Sky, clouds, stars and doves

	const sky = new THREE.Mesh(
		new THREE.SphereGeometry(180, 32, 16),
		new THREE.ShaderMaterial({
			side: THREE.BackSide,
			depthWrite: false,
			uniforms: {
				top: { value: SKY.day.top.clone() },
				bottom: { value: SKY.day.bottom.clone() },
			},
			vertexShader: `
				varying vec3 vPosition;
				void main() {
					vPosition = position;
					gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
				}`,
			fragmentShader: `
				uniform vec3 top;
				uniform vec3 bottom;
				varying vec3 vPosition;
				void main() {
					float h = clamp(normalize(vPosition).y * 1.6 + 0.15, 0.0, 1.0);
					gl_FragColor = vec4(mix(bottom, top, h), 1.0);
				}`,
		})
	)
	scene.add(sky)
	const skyUniforms = (sky.material as THREE.ShaderMaterial).uniforms

	const starPositions: number[] = []
	for (let i = 0; i < 500; i++) {
		const v = new THREE.Vector3().randomDirection()
		v.y = Math.abs(v.y) * 0.9 + 0.08
		v.normalize().multiplyScalar(170)
		starPositions.push(v.x, v.y, v.z)
	}
	const stars = new THREE.Points(
		new THREE.BufferGeometry().setAttribute(
			'position',
			new THREE.Float32BufferAttribute(starPositions, 3)
		),
		new THREE.PointsMaterial({
			color: '#ffffff',
			size: 1.4,
			sizeAttenuation: false,
			transparent: true,
			opacity: 0,
		})
	)
	scene.add(stars)

	const puff = new THREE.IcosahedronGeometry(1, 1)
	const makeCloud = (y: number, z: number, scale: number) => {
		const cloud = named(new THREE.Group(), 'cloud')
		for (const [px, py, s] of [
			[0, 0, 1.5],
			[1.6, -0.2, 1.1],
			[-1.6, -0.3, 1.1],
			[0.8, 0.6, 1],
			[-0.7, 0.5, 0.9],
		]) {
			const p = new THREE.Mesh(puff, mat.cloud)
			p.position.set(px, py, 0)
			p.scale.set(s, s * 0.75, s)
			cloud.add(p)
		}
		cloud.scale.setScalar(scale)
		cloud.position.set(0, y, z)
		scene.add(cloud)
		return cloud
	}
	const clouds = [
		{ cloud: makeCloud(17, -20, 1.5), duration: 80, offset: 0.1 },
		{ cloud: makeCloud(13, -8, 1), duration: 60, offset: 0.55 },
		{ cloud: makeCloud(20, -30, 1.8), duration: 100, offset: 0.8 },
	]

	const wingShape = new THREE.Shape()
	wingShape.moveTo(0, 0)
	wingShape.lineTo(0.25, 0.9)
	wingShape.lineTo(-0.35, 0.75)
	wingShape.closePath()
	const wingGeometry = new THREE.ShapeGeometry(wingShape)

	const makeDove = () => {
		const dove = named(new THREE.Group(), 'dove')
		const body = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), mat.dove)
		body.scale.set(2.2, 0.9, 0.9)
		dove.add(body)
		const head = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), mat.dove)
		head.position.set(0.48, 0.1, 0)
		dove.add(head)
		const tail = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.5, 4), mat.dove)
		tail.rotation.z = Math.PI / 2
		tail.position.x = -0.6
		dove.add(tail)
		const wings = [-1, 1].map((side) => {
			const wing = named(new THREE.Mesh(wingGeometry, mat.dove), 'wing')
			wing.rotation.x = side * (Math.PI / 2)
			wing.position.y = 0.05
			dove.add(wing)
			return { wing, side }
		})
		scene.add(dove)
		return { dove, wings }
	}
	const doves = [0, 1, 2].map(makeDove)

	// --- Fewer draw calls
	//
	// Hundreds of small boxes (mullions, frames, car parts) would be one draw
	// call each, twice over with shadows. Everything that animates is a
	// Group, so each group's plain meshes can be merged, one per material,
	// without touching any animation.
	const compact = (group: THREE.Object3D) => {
		const byMaterial = new Map<THREE.Material, THREE.Mesh[]>()
		for (const child of group.children) {
			if (child instanceof THREE.Mesh && !Array.isArray(child.material)) {
				byMaterial.set(child.material, [
					...(byMaterial.get(child.material) ?? []),
					child,
				])
			} else if (child instanceof THREE.Group) {
				compact(child)
			}
		}
		for (const [material, meshes] of byMaterial) {
			if (meshes.length < 2) continue
			const geometries = meshes.map((mesh) => {
				mesh.updateMatrix()
				const g = mesh.geometry.index
					? mesh.geometry.toNonIndexed()
					: mesh.geometry.clone()
				return g.applyMatrix4(mesh.matrix)
			})
			const merged = mergeGeometries(geometries)
			for (const g of geometries) g.dispose()
			if (!merged) continue
			for (const mesh of meshes) group.remove(mesh)
			group.add(new THREE.Mesh(merged, material))
		}
	}
	compact(root)

	// --- Lights

	const hemi = new THREE.HemisphereLight('#dfefff', '#6b5d4c', 0.8)
	scene.add(hemi)
	const sun = new THREE.DirectionalLight('#fff3dc', 2.6)
	sun.position.set(22, 30, 26)
	sun.target.position.set(7, 0, 4)
	sun.castShadow = true
	const small = window.innerWidth < 640
	sun.shadow.mapSize.set(small ? 1024 : 2048, small ? 1024 : 2048)
	Object.assign(sun.shadow.camera, {
		left: -52,
		right: 52,
		top: 36,
		bottom: -36,
		near: 1,
		far: 130,
	})
	sun.shadow.bias = -0.0005
	sun.shadow.normalBias = 0.03
	sun.shadow.camera.updateProjectionMatrix()
	scene.add(sun, sun.target)

	root.traverse((o) => {
		if (o instanceof THREE.Mesh) {
			o.castShadow = o.material !== mat.glass
			o.receiveShadow = true
		}
	})

	// --- Animation clips

	const mixer = new THREE.AnimationMixer(root)
	const skyMixer = new THREE.AnimationMixer(scene)

	// Linear on purpose: the overshoot is in the keyframes, and smooth
	// interpolation turns repeated keyframe times into NaN
	const buildClip = new THREE.AnimationClip('build', -1, buildTracks)
	const build = mixer.clipAction(buildClip)
	build.setLoop(THREE.LoopOnce, 1)
	build.clampWhenFinished = true

	const loops: THREE.AnimationAction[] = []

	/** Keyframes for a door that opens at `open`, holds, and closes at `close`. */
	const OPEN_ANGLE = 1.2
	const doorTrack = (
		door: THREE.Object3D,
		side: -1 | 1,
		open: number,
		close: number,
		end: number
	) =>
		new THREE.QuaternionKeyframeTrack(
			`${door.name}.quaternion`,
			[0, open, open + 1, close, close + 1, end],
			[
				...turn(0),
				...turn(0),
				// Swings toward the middle of the porch
				...turn(side * OPEN_ANGLE),
				...turn(side * OPEN_ANGLE),
				...turn(0),
				...turn(0),
			]
		)

	// Arrival: drive in, park, then the camera moves in on the entrance and
	// the Kalayaan door opens to welcome them. It's the only door that ever
	// opens, and only while the camera is close.
	const DRIVE = 15
	const ARRIVAL = 24
	const ZOOM_IN = DRIVE + 0.3
	const ZOOM_OUT = ARRIVAL - 2.2
	const arrivalClip = (() => {
		const samples = 60
		const times: number[] = []
		const positions: number[] = []
		const rotations: number[] = []
		for (let i = 0; i <= samples; i++) {
			const s = i / samples
			// Steady along the aisle, easing off for the turn into the stall
			const u =
				s < 0.7 ? (s / 0.7) * 0.8 : 0.8 + (1 - (1 - (s - 0.7) / 0.3) ** 2) * 0.2
			times.push(s * DRIVE)
			positions.push(...route.getPointAt(u).toArray())
			rotations.push(
				...facing(route.getTangentAt(Math.min(u, 0.999))).toArray()
			)
		}
		// Hold in the stall until the clip ends
		times.push(ARRIVAL - 1)
		positions.push(...parkedAt.toArray())
		rotations.push(...parkedFacing.toArray())
		return new THREE.AnimationClip('arrival', ARRIVAL, [
			new THREE.VectorKeyframeTrack(
				`${driver.name}.position`,
				times,
				positions
			),
			new THREE.QuaternionKeyframeTrack(
				`${driver.name}.quaternion`,
				times,
				rotations
			),
			// Gone briefly before the next visitor turns in
			new THREE.BooleanKeyframeTrack(
				`${driver.name}.visible`,
				[0, ARRIVAL - 1],
				[true, false]
			),
			// Opens once the camera has arrived, and is shut again before it pulls back
			doorTrack(unit3Doors.left, 1, ZOOM_IN + 2, ZOOM_OUT - 1.6, ARRIVAL),
		])
	})()
	const arrival = mixer.clipAction(arrivalClip)
	const BUILD_DONE = 4.4

	// Clouds drift left to right across the scene
	for (const { cloud, duration, offset } of clouds) {
		const { y, z } = cloud.position
		const action = skyMixer.clipAction(
			new THREE.AnimationClip(`drift-${cloud.name}`, duration, [
				new THREE.VectorKeyframeTrack(
					`${cloud.name}.position`,
					[0, duration],
					[-70, y, z, 70, y, z]
				),
			])
		)
		action.time = duration * offset
		loops.push(action)
	}

	// Doves circle the building, flapping as they go
	const X = new THREE.Vector3(1, 0, 0)
	doves.forEach(({ dove, wings }, i) => {
		const duration = 22 + i * 3
		const radius = 26 + i * 3
		const samples = 36
		const times: number[] = []
		const positions: number[] = []
		const rotations: number[] = []
		for (let s = 0; s <= samples; s++) {
			const a = (s / samples) * Math.PI * 2
			times.push((s / samples) * duration)
			positions.push(
				7 + Math.cos(a) * radius,
				10 + i * 1.3 + Math.sin(a * 2) * 0.8,
				-2 + Math.sin(a) * radius * 0.5
			)
			const heading = new THREE.Vector3(-Math.sin(a), 0, Math.cos(a) * 0.5)
			rotations.push(...facing(heading).toArray())
		}
		const flight = skyMixer.clipAction(
			new THREE.AnimationClip(`flight-${dove.name}`, duration, [
				new THREE.VectorKeyframeTrack(
					`${dove.name}.position`,
					times,
					positions
				),
				new THREE.QuaternionKeyframeTrack(
					`${dove.name}.quaternion`,
					times,
					rotations
				),
			])
		)
		flight.time = (i / doves.length) * duration
		loops.push(flight)

		const flapTimes = [0, 0.22, 0.44]
		const flap = skyMixer.clipAction(
			new THREE.AnimationClip(
				`flap-${dove.name}`,
				0.44,
				wings.map(({ wing, side }) => {
					const angle = (a: number) =>
						new THREE.Quaternion().setFromAxisAngle(X, a).toArray()
					return new THREE.QuaternionKeyframeTrack(
						`${wing.name}.quaternion`,
						flapTimes,
						[
							...angle(side * (Math.PI / 2 - 0.7)),
							...angle(side * (Math.PI / 2 + 0.6)),
							...angle(side * (Math.PI / 2 - 0.7)),
						]
					)
				})
			)
		)
		flap.time = i * 0.13
		loops.push(flap)
	})

	// The Unit 3 marker bobs and turns
	loops.push(
		mixer.clipAction(
			new THREE.AnimationClip('bob', 3, [
				new THREE.VectorKeyframeTrack(
					`${bob.name}.position`,
					[0, 1.5, 3],
					[0, 0, 0, 0, 0.45, 0, 0, 0, 0]
				),
				new THREE.QuaternionKeyframeTrack(
					`${bob.name}.quaternion`,
					[0, 1.5, 3],
					[...turn(-0.35), ...turn(0.35), ...turn(-0.35)]
				),
			])
		)
	)

	const play = () => {
		build.reset().play()
		if (reducedMotion) {
			// Skip straight to the finished scene, the visitor already parked
			mixer.update(buildClip.duration)
			driver.visible = true
			driver.position.copy(parkedAt)
			driver.quaternion.copy(parkedFacing)
			return
		}
		arrival
			.reset()
			.startAt(mixer.time + BUILD_DONE)
			.play()
	}
	play()
	if (!reducedMotion) for (const action of loops) action.play()

	// --- Day / night

	let night = startAtNight ? 1 : 0
	let nightTarget = night
	const applyNight = (n: number) => {
		skyUniforms.top.value.lerpColors(SKY.day.top, SKY.night.top, n)
		skyUniforms.bottom.value.lerpColors(SKY.day.bottom, SKY.night.bottom, n)
		hemi.intensity = THREE.MathUtils.lerp(0.8, 0.18, n)
		sun.intensity = THREE.MathUtils.lerp(2.6, 0.25, n)
		sun.color.lerpColors(
			new THREE.Color('#fff3dc'),
			new THREE.Color('#9fb6ff'),
			n
		)
		scene.environmentIntensity = THREE.MathUtils.lerp(0.65, 0.2, n)
		mat.interior.emissiveIntensity = n * 1.3
		mat.lamp.emissiveIntensity = n * 3
		mat.pin.emissiveIntensity = 0.25 + n * 0.6
		for (const light of lights) light.intensity = n * 9
		;(stars.material as THREE.PointsMaterial).opacity = n
		mat.cloud.color.lerpColors(
			new THREE.Color('#ffffff'),
			new THREE.Color('#4a5677'),
			n
		)
	}
	applyNight(night)

	// --- Loop

	const timer = new THREE.Timer()
	let idleSince = 0
	let elapsed = 0
	controls.addEventListener('start', () => (idleSince = Infinity))
	controls.addEventListener('end', () => (idleSince = elapsed))

	const offset = new THREE.Vector3()
	const spherical = new THREE.Spherical()
	const goal = new THREE.Vector3()
	let wideDistance = 40
	/** 0 = wide shot, 1 = close on the entrance. Eased, so the move is smooth. */
	let focus = 0

	const resize = () => {
		const { clientWidth: w, clientHeight: h } = canvas
		if (!w || !h) return
		renderer.setSize(w, h, false)
		camera.aspect = w / h
		// Pull back on narrow screens so the end of the building fits
		const distance = 40 / Math.min(1, camera.aspect / 1.5)
		offset
			.copy(camera.position)
			.sub(controls.target)
			.multiplyScalar(distance / wideDistance)
		wideDistance = distance
		camera.position.copy(controls.target).add(offset)
		camera.updateProjectionMatrix()
	}
	const resizeObserver = new ResizeObserver(resize)
	resizeObserver.observe(canvas)
	resize()

	const frame = () => {
		// No timestamp: the frame's timestamp and timer.reset() use different
		// clocks, and a negative first delta runs the build animation backwards
		timer.update()
		const dt = THREE.MathUtils.clamp(timer.getDelta(), 0, 0.1)
		elapsed += dt

		if (!reducedMotion) {
			mixer.update(dt)
			skyMixer.update(dt)

			// Once the visitor has parked, move in on the entrance while the
			// Kalayaan door opens, then back out before the next car
			const atEntrance =
				arrival.isRunning() && arrival.time > ZOOM_IN && arrival.time < ZOOM_OUT
			focus += ((atEntrance ? 1 : 0) - focus) * Math.min(1, dt * 1.1)

			// While nobody is dragging, ease toward the shot: the close-up, or
			// the wide view drifting gently side to side
			if (elapsed - idleSince > 2.5) {
				const e = focus * focus * (3 - 2 * focus)
				const sway = BASE_AZIMUTH + Math.sin(elapsed * 0.12) * 0.35
				const k = Math.min(1, dt * 0.9)
				goal.lerpVectors(WIDE.target, ENTRANCE.target, e)
				controls.target.lerp(goal, k)
				offset.copy(camera.position).sub(controls.target)
				spherical.setFromVector3(offset)
				const radius = THREE.MathUtils.lerp(
					wideDistance,
					wideDistance * ENTRANCE.zoom,
					e
				)
				spherical.radius += (radius - spherical.radius) * k
				spherical.phi +=
					(THREE.MathUtils.lerp(WIDE.phi, ENTRANCE.phi, e) - spherical.phi) * k
				spherical.theta +=
					(THREE.MathUtils.lerp(sway, ENTRANCE.theta, e) - spherical.theta) *
					Math.min(1, dt * (0.4 + e))
				offset.setFromSpherical(spherical)
				camera.position.copy(controls.target).add(offset)
			}
		}

		if (Math.abs(nightTarget - night) > 0.001) {
			const step = reducedMotion ? 1 : Math.min(1, dt * 2.5)
			night += (nightTarget - night) * step
			applyNight(night)
		}

		controls.update(dt)
		renderer.render(scene, camera)
	}

	let running = false

	return {
		start() {
			if (running) return
			running = true
			timer.reset()
			renderer.setAnimationLoop(frame)
		},
		stop() {
			running = false
			renderer.setAnimationLoop(null)
		},
		setNight(on) {
			nightTarget = on ? 1 : 0
			if (!running) {
				night = nightTarget
				applyNight(night)
			}
		},
		replay() {
			if (reducedMotion) return
			play()
		},
		dispose() {
			renderer.setAnimationLoop(null)
			resizeObserver.disconnect()
			controls.dispose()
			mixer.stopAllAction()
			skyMixer.stopAllAction()
			scene.traverse((o) => {
				if (
					o instanceof THREE.Mesh ||
					o instanceof THREE.Points ||
					o instanceof THREE.Sprite
				) {
					o.geometry.dispose()
					const materials = Array.isArray(o.material)
						? o.material
						: [o.material]
					for (const m of materials) m.dispose()
				}
			})
			for (const tex of textures) tex.dispose()
			scene.environment?.dispose()
			pmrem.dispose()
			renderer.dispose()
		},
	}
}
