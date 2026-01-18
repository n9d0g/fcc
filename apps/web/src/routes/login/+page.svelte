<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<section class="flex items-center justify-center">
		<form class="card mx-auto flex h-fit max-w-lg flex-col gap-6 p-8">
			<!-- username -->
			<label class="label">
				<span>Username</span>
				<input class="input" type="text" placeholder="Username" />
			</label>

			<!-- password -->
			<label class="label">
				<span>Password</span>
				<input class="input" type="password" placeholder="Password" />
			</label>

			<!-- forgot pw -->
			<div class="flex w-full justify-end">
				<a href="/" class="w-fit text-gray-600 italic hover:underline"
					>Forgot your password?</a
				>
			</div>

			<!-- login button -->
			<button class="btn preset-filled">Continue</button>
		</form>
	</section>
</FccLayout>
