<script lang="ts">
	// props
	export let text: string
	export let link: string
	export let nav: string

	// TODO: active nav
	let activeNav: boolean = false

	if (link === '/' && nav === 'home') activeNav = true
	else if (link.includes(nav)) activeNav = true

	const activeClass = 'flex w-32 btn h-10 btn-icon p-4 z-20 font-bold variant-filled-surface'
	const nonActiveClass = 'flex w-32 btn hover:variant-filled-surface h-10 btn-icon p-4 z-20'
</script>

<a href={link} class={activeNav ? activeClass : nonActiveClass}>
	{text}
</a>
