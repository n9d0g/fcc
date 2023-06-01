<script lang="ts">
	// props
	export let text: string
	export let link: string
	export let nav: string

	let activeNav: boolean = false

	if (link === '/' && nav === 'home') activeNav = true
	else if (link.includes(nav)) activeNav = true

	const nonActiveClass = 'w-28 btn hover:variant-filled-surface h-10 btn-icon p-4 z-20 rounded-lg'
	const activeClass = 'w-28 btn h-10 btn-icon p-4 z-20 font-bold variant-filled-surface rounded-lg'
</script>

<a href={link} class={!activeNav ? nonActiveClass : activeClass}>
	<span>
		{text}
	</span>
</a>
