<script>
	import '@skeletonlabs/skeleton/themes/theme-modern.css'
	import '@skeletonlabs/skeleton/styles/all.css'
	import '../app.postcss'
	import Footer from '../lib/Footer.svelte'
	import Header from '../lib/Header.svelte'
</script>

<Header />

<main class="min-h-screen bg-slate-300">
	<slot />
</main>

<Footer />
