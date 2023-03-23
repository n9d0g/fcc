<script>
	import '@skeletonlabs/skeleton/themes/theme-crimson.css'
	import '@skeletonlabs/skeleton/styles/all.css'
	import '../app.postcss'
	import Footer from '../lib/Footer.svelte'
	import Header from '../lib/Header.svelte'
	import { AppShell } from '@skeletonlabs/skeleton'
</script>

<AppShell>
	<svelte:fragment slot="header"><Header /></svelte:fragment>
	<slot />
	<Footer />
</AppShell>
