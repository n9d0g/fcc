<script lang="ts">
	import FccLayout from '#lib/components/FccLayout.svelte'
	import Icon from '@iconify/svelte'
	import { enhance, type SubmitFunction } from '$app/forms'
	import { page } from '$app/state'
	import { toaster } from '#lib/stores/toaster.js'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)

	let pending = $state(false)
	let selected = $state<string[]>([])

	// Reset to what's saved whenever the page data reloads (e.g. after saving)
	$effect(() => {
		selected = [...data.blocked]
	})

	const dirty = $derived(
		selected.length !== data.blocked.length ||
			selected.some((d) => !data.blocked.includes(d))
	)

	// Group the upcoming Sundays under month headings
	const months = $derived.by(() => {
		const groups = new Map<string, string[]>()
		for (const d of data.sundays) {
			const month = new Date(`${d}T00:00:00Z`).toLocaleDateString('en-CA', {
				timeZone: 'UTC',
				month: 'long',
				year: 'numeric',
			})
			groups.set(month, [...(groups.get(month) ?? []), d])
		}
		return [...groups]
	})

	const dayOfMonth = (d: string) => Number(d.slice(8, 10))

	const submit: SubmitFunction = () => {
		pending = true
		return async ({ result, update }) => {
			pending = false
			await update({ reset: false })
			if (result.type === 'success') {
				const changed =
					(result.data?.added?.length ?? 0) + (result.data?.removed?.length ?? 0)
				toaster.success({
					title: changed ? 'Availability saved' : 'No changes to save',
					description: changed
						? "We've let the worship leaders know."
						: undefined,
				})
			} else if (result.type === 'failure') {
				toaster.error({
					title: String(result.data?.message ?? 'Something went wrong.'),
				})
			}
		}
	}
</script>

<FccLayout {title} {breadcrumb} {headData}>
	<section class="mx-auto max-w-3xl">
		{#if data.state === 'signedOut'}
			<div class="card flex flex-col items-center gap-6 p-8 text-center sm:p-12">
				<span class="icon-chip size-14">
					<Icon icon="lucide:log-in" class="size-6" />
				</span>
				<p class="max-w-md text-lg">
					Log in to let us know which Sundays you can't serve.
				</p>
				<a
					href="/login?redirectTo={encodeURIComponent(page.url.pathname)}"
					class="btn btn-primary w-full sm:w-auto"
				>
					Log in
				</a>
			</div>
		{:else if data.state === 'notMember'}
			<div class="card flex flex-col items-center gap-6 p-8 text-center sm:p-12">
				<span class="icon-chip size-14">
					<Icon icon="lucide:music" class="size-6" />
				</span>
				<p class="max-w-md text-lg">
					Blocking out Sundays is for worship team members.
				</p>
				<a href="/ministries/praise/join" class="btn btn-primary w-full sm:w-auto">
					Join the worship team
				</a>
			</div>
		{:else}
			<p class="lede mb-8">
				Select the Sundays you can't make it. The worship leaders are notified
				whenever you save, so they can plan the schedule around you.
			</p>

			{#if data.loadError}
				<p
					class="mb-6 rounded-xl border border-error-200 bg-error-50 px-4 py-3 text-sm text-error-700"
					role="alert"
				>
					We couldn't load your saved Sundays. Please refresh the page before
					making changes.
				</p>
			{/if}

			<form
				method="POST"
				use:enhance={submit}
				aria-busy={pending}
				class="flex flex-col gap-8"
			>
				{#each months as [month, sundays] (month)}
					<fieldset>
						<legend class="label mb-3">{month}</legend>
						<div class="flex flex-wrap gap-2">
							{#each sundays as sunday (sunday)}
								<label
									class="flex min-w-16 cursor-pointer items-center justify-center gap-2 rounded-xl border border-line px-3 py-2.5 text-sm tabular-nums transition hover:bg-surface-100 has-checked:border-error-500 has-checked:bg-error-50 has-checked:text-error-700 has-checked:line-through has-focus-visible:ring-2 has-focus-visible:ring-primary-500"
								>
									<input
										type="checkbox"
										name="sundays"
										value={sunday}
										bind:group={selected}
										class="sr-only"
									/>
									<span class="sr-only">Sunday,</span>
									{month.split(' ')[0].slice(0, 3)}
									{dayOfMonth(sunday)}
								</label>
							{/each}
						</div>
					</fieldset>
				{/each}

				<div
					class="card sticky bottom-4 flex flex-col items-center justify-between gap-3 p-4 shadow-lift sm:flex-row"
				>
					<p class="text-muted text-sm">
						{selected.length === 0
							? "You're available every Sunday."
							: `Unavailable ${selected.length} Sunday${selected.length === 1 ? '' : 's'}.`}
					</p>
					<button
						type="submit"
						class="btn btn-primary w-full sm:w-auto"
						disabled={pending || !dirty || data.loadError}
					>
						{pending ? 'Saving…' : 'Save availability'}
					</button>
				</div>
			</form>
		{/if}
	</section>
</FccLayout>
