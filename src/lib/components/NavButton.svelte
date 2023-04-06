<script lang="ts">
	// props
	export let text: string
	export let link: string
	export let nav: string

	// TODO: active nav
	let activeNav: boolean = false

	if (link === '/' && nav === 'home') activeNav = true
	else if (link.includes(nav)) activeNav = true

	const nonActiveClass = 'flex w-fit btn hover:variant-filled-surface h-10 btn-icon p-4 z-20 rounded-lg'
	const activeClass = 'flex w-fit btn h-10 btn-icon p-4 z-20 font-bold variant-filled-surface rounded-lg'
</script>

<a href={link} class={!activeNav ? nonActiveClass : activeClass}>
	{text}
</a>
