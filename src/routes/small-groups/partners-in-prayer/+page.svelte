<script lang="ts">
	import sundayServicePrayer from '#lib/assets/community/sunday-service-prayer.jpg'
	import FccLayout from '#lib/components/FccLayout.svelte'
</script>

<FccLayout
	heading="FCC Partners in Prayer Bible Study Group."
	image={sundayServicePrayer}
	imageAlt="FCC members praying together during a Sunday service"
	imagePosition="center 55%"
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
