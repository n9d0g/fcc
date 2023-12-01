<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'

	export let data
	const { title, breadcrumb, headData, links } = data
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<div class="flex flex-col gap-4">
		<p>
			Zoom Meeting LINK:
			<a href={links.zoom} class="anchor variant-filled btn ml-2">
				Click Here
			</a>
		</p>
		<p>Meeting ID: <span class="font-bold"> 878 126 4602 </span></p>
	</div>

	<hr class="mt-8" />

	<div class="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
		<div class="flex flex-col gap-1">
			<h2 class="h2 mb-3 text-2xl font-bold">Women Chasing God Group 1</h2>
			<p>Every 1st Saturday (monthly)</p>
			<p>Toronto/Connecticut: 9:30AM</p>
			<p>UK: 2:30PM</p>
			<p>Manila: 9:30PM</p>
			<p>
				Study Material: <a href={links.core52} class="anchor" target="_blank">
					Core 52 by Mark E. Moore
				</a>
			</p>
		</div>

		<div class="flex flex-col gap-1">
			<h2 class="h2 mb-3 text-2xl font-bold">Women Chasing God Group 2</h2>
			<p>Every 1st Saturday (monthly)</p>
			<p>LA: 8:00AM</p>
			<p>AZ: 9:00AM</p>
			<p>Toronto: 11:00PM</p>
			<p>
				Study Material: <a href={links.core52} class="anchor" target="_blank">
					Core 52 by Mark E. Moore
				</a>
			</p>
		</div>

		<div class="flex flex-col gap-1">
			<h2 class="h2 mb-3 text-2xl font-bold">Women Chasing God Group 3</h2>
			<p>Every last Saturday (monthly)</p>
			<p>Toronto: 9:00AM</p>
			<p>
				Study Material: <a
					href={links.doctrines}
					class="anchor"
					target="_blank"
				>
					Doctrines
				</a>
			</p>
		</div>

		<div class="flex flex-col gap-1">
			<h2 class="h2 mb-3 text-2xl font-bold">Girls Chasing God</h2>
			<p>Every last Saturday (monthly)</p>
			<p>Manila: 8:00PM</p>
			<p>Toronto: 8:00AM</p>
			<p>
				Study Material: <a
					href={links.teenTopics}
					class="anchor"
					target="_blank"
				>
					Teen Topics
				</a>
			</p>
		</div>
	</div>

	<div
		class="mx-auto my-8 flex max-w-3xl flex-col justify-center gap-4 text-center"
	>
		<p>
			These bible study groups meet only once a month with the purpose of using
			the other weeks for discipling their own small groups in their local
			churches or neighborhoods. Study materials are sent out in advance, then
			we gather to discuss, to dig deeper, to fellowship, and to pray for one
			another.
		</p>
		<p>
			If you’d like to join any of our small groups, please contact sis Joi.
			<br />
			<br />
			Email:
			<a href="mailto:irenejoi@fcccanada.ca" class="anchor" target="_blank">
				irenejoi@fcccanada.ca
			</a>
			<br />
			<a
				href="https://www.instagram.com/joifulworld/"
				class="anchor"
				target="_blank"
			>
				@joifulworld
			</a>
			on Threads and IG
		</p>
	</div>
</FccLayout>
