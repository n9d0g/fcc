<script lang="ts">
	// props
	export let text: string
	export let link: string
	export let nav: string

	let activeNav: boolean = false

	if (link === '/' && nav === 'home') activeNav = true
	else if (link.includes(nav)) activeNav = true

	const nonActiveClass = 'hover:font-bold text-white'
	const activeClass = 'font-bold text-primary-400 dark:text-primary-600'
</script>

<a
	href={link}
	class={`btn btn-icon z-20 w-fit rounded-lg px-1 text-sm md:text-base 
	${!activeNav ? nonActiveClass : activeClass}`}
>
	{text}
</a>
