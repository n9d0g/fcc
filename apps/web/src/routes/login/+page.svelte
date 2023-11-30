<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'

	export let data
	const { title, breadcrumb, headData } = data
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
				<a href="/" class="w-fit italic text-gray-600 hover:underline"
					>Forgot your password?</a
				>
			</div>

			<!-- login button -->
			<button class="variant-filled btn"> Continue </button>
		</form>
	</section>
</FccLayout>
