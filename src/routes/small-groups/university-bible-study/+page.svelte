<script lang="ts">
	import tableBibleStudy from '#lib/assets/community/table-bible-study.jpg'
	import FccLayout from '#lib/components/FccLayout.svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)
</script>

<FccLayout
	{title}
	{breadcrumb}
	{headData}
	image={tableBibleStudy}
	imageAlt="Students and members of FCC in a Bible study around a table"
	imagePosition="center 40%"
>
	<div class="card mx-auto max-w-2xl p-10 text-center md:p-14">
		<span class="icon-chip mx-auto size-14 text-2xl">🌱</span>
		<h2 class="h2 mt-6 mb-4">Coming soon</h2>
		<p class="text-muted">
			Details for this small group are being prepared. Check back soon or contact
			the church office for more information.
		</p>
		<a href="/contact" class="btn btn-primary mt-8">Contact us</a>
	</div>
</FccLayout>
