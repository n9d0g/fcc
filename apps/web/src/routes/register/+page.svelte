<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'

	type ActionData = {
		username?: string
		errors?: {
			username?: string[]
			password?: string[]
			server?: string
		}
	}

	export let data
	export let form: ActionData
	const { title, breadcrumb, headData } = data
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<section class="flex items-center justify-center">
		<form
			method="post"
			action="?/register"
			class="card mx-auto flex h-fit w-full max-w-lg flex-col gap-6 p-8"
		>
			<!-- username -->
			<label class="label flex flex-col gap-2">
				<span>Username</span>
				<input
					class={`input ${form?.errors?.username && '!border-red-500'}`}
					type="text"
					name="username"
					placeholder="Username"
					value={form?.username ?? ''}
				/>
				{#if form?.errors?.username}
					<p class="text-error-500 text-sm">{form?.errors?.username}</p>
				{/if}
			</label>

			<!-- password -->
			<label class="label flex flex-col gap-2">
				<span>Password</span>
				<input
					class={`input ${form?.errors?.password && '!border-red-500'}`}
					type="password"
					name="password"
					placeholder="Password"
				/>
				{#if form?.errors?.password}
					<p class="text-error-500 text-sm">{form?.errors?.password}</p>
				{/if}
			</label>

			<!-- forgot pw -->
			<div class="flex w-full justify-end">
				<a href="/" class="w-fit italic text-gray-600 hover:underline"
					>Forgot your password?</a
				>
			</div>

			<!-- server error -->
			{#if form?.errors?.server}
				<p class="text-error-500 text-sm">{form?.errors?.server}</p>
			{/if}

			<!-- login button -->
			<button class="variant-filled btn"> Continue </button>
		</form>
	</section>
</FccLayout>
