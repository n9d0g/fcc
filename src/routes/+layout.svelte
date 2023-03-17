<script>
	import '../app.css'
	import Footer from '../lib/Footer.svelte'
	import Header from '../lib/Header.svelte'
</script>

<Header />

<main class="min-h-screen bg-slate-300">
	<slot />
</main>

<Footer />
