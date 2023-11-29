<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'

	// server fetching
	export let data

	const title = data.title
	const breadcrumb = data.breadcrumb
	const headData = data.headData
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<section class="flex items-center justify-center">
		<form
			method="POST"
			class="border-surface-500 mx-auto my-4 flex w-full max-w-2xl flex-col gap-4 rounded border p-4 sm:p-10"
		>
			<div class="flex flex-col gap-4">
				<label for="name" class="label flex flex-col gap-2">
					<span>Name</span>
					<input
						name="name"
						type="text"
						placeholder="Name"
						class="input rounded-md"
					/>
				</label>
				<label for="message" class="label flex flex-col gap-2">
					<span>Message</span>
					<textarea
						name="message"
						placeholder="Message"
						class="textarea rounded-md"
						rows="6"
					/>
				</label>
			</div>
			<button type="submit" class="btn variant-filled">Send</button>
		</form>
	</section>
</FccLayout>
