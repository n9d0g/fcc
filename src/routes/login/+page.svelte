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
				<a href="/" class="w-fit italic text-gray-600 hover:underline">Forgot your password?</a>
			</div>

			<!-- login button -->
			<button class="btn variant-filled"> Continue </button>
		</form>
	</section>
</FccLayout>
