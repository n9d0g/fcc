<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'

	// server fetching
	export let data
	export let form
	const { title, breadcrumb, headData } = data
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<section class="flex items-center justify-center">
		{#if form?.success}
			<div
				class="mx-auto my-4 flex w-full max-w-2xl flex-col gap-4 rounded border border-surface-500 p-4 sm:p-24"
			>
				<p class="mx-auto max-w-sm text-center">
					Thank you for contacting us! An FCC representative will be in contact
					with you soon.
				</p>
				<a href="/" class="variant-filled-surface btn">Back to Homepage</a>
			</div>
		{:else}
			<form
				method="POST"
				class="mx-auto my-4 flex w-full max-w-2xl flex-col gap-4 rounded border border-surface-500 p-4 sm:p-10"
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
				<button type="submit" class="variant-filled btn">Send</button>
			</form>
		{/if}
	</section>
</FccLayout>
