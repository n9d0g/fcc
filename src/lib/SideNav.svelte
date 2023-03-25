<script lang="ts">
	import { sideNavOpen } from '$lib/stores/store.js'

	let sideNavOpenValue: boolean
	sideNavOpen.subscribe((value) => {
		sideNavOpenValue = value
	})

	const closeSideNav = () => {
		sideNavOpen.set(false)
	}
</script>

{#if sideNavOpenValue}
	<section class="lg:hidden flex flex-col gap-8 p-8 min-h-screen w-screen">
		<a on:click={closeSideNav} class="btn flex justify-start" href="/">Home</a>
		<a on:click={closeSideNav} class="btn flex justify-start" href="/about">About</a>
		<a on:click={closeSideNav} class="btn flex justify-start" href="/sermons">Sermons</a>
		<a on:click={closeSideNav} class="btn flex justify-start" href="/ministries">Ministries</a>
		<a on:click={closeSideNav} class="btn flex justify-start" href="/small-groups">Small Groups</a>
		<a on:click={closeSideNav} class="btn flex justify-start" href="/give">Give</a>
	</section>
{/if}
