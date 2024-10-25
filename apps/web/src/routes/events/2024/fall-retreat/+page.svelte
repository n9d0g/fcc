<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'

	export let data
	const { title, breadcrumb, headData } = data
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<div class="container mx-auto">
		<div>
			<h2 class="h2 mb-3 font-bold">Worksheets</h2>

			<div class="flex flex-col gap-2">
				<a
					href="/pdf/2024/fall-retreat/session-1.pdf"
					class="anchor w-fit"
					target="_blank"
				>
					Session #1
				</a>
				<a
					href="/pdf/2024/fall-retreat/session-2.pdf"
					class="anchor w-fit"
					target="_blank"
				>
					Session #2
				</a>
				<a
					href="/pdf/2024/fall-retreat/session-3.pdf"
					class="anchor w-fit"
					target="_blank"
				>
					Session #3
				</a>
				<a
					href="/pdf/2024/fall-retreat/session-4.pdf"
					class="anchor w-fit"
					target="_blank"
				>
					Session #4
				</a>
			</div>
		</div>
	</div>
</FccLayout>
