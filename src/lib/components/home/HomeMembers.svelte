<script lang="ts">
	import Icon from '@iconify/svelte'

	// Only things an account actually unlocks (event emails don't need one)
	const perks = [
		{
			icon: 'lucide:music',
			title: 'Serve on the worship team',
			blurb:
				'Ask to join the praise team, then see the Sunday schedule and mark the dates you’re away.',
			href: '/ministries/praise/join',
		},
		{
			icon: 'lucide:hand-heart',
			title: 'Lead a prayer meeting',
			blurb:
				'Prayer leaders get email reminders two weeks before, one week before and on the day.',
			href: '/ministries/prayer',
		},
		{
			icon: 'lucide:notebook-pen',
			title: 'Write for the blog',
			blurb:
				'Share a testimony or reflection. Request author access and submit posts for review.',
			href: '/blog',
		},
		{
			icon: 'lucide:user-round-check',
			title: 'One login for it all',
			blurb:
				'Keep your name and email up to date in one place, and find your team tools in the account menu.',
		},
	]
</script>

<section class="section relative isolate overflow-hidden bg-primary-950 text-white">
	<div
		class="absolute -top-32 -right-32 -z-10 size-96 rounded-full bg-secondary-500/15 blur-3xl"
		aria-hidden="true"
	></div>

	<div class="wrap grid gap-12 lg:grid-cols-[2fr_3fr] lg:items-center lg:gap-16">
		<div>
			<p class="eyebrow text-secondary-200">For our church family</p>
			<h2 class="h2 mt-3 text-white" data-testid="members-header">
				Already part of FCC? Create your account.
			</h2>
			<p class="mt-5 text-lg leading-relaxed text-white/85">
				A free account brings the ways you serve at FCC into one place. It takes a
				minute to set up with your name and email.
			</p>
			<div class="mt-8 flex flex-wrap gap-3">
				<a
					href="/signup"
					class="btn btn-lg btn-light"
					data-testid="members-signup"
				>
					<Icon icon="lucide:user-plus" class="size-4" />
					Create an account
				</a>
				<a href="/login" class="btn btn-lg btn-glass">Log in</a>
			</div>
		</div>

		<ul class="grid gap-4 sm:grid-cols-2">
			{#each perks as perk}
				<li class="rounded-2xl border border-white/10 bg-white/5 p-5">
					<span
						class="flex size-11 items-center justify-center rounded-xl bg-secondary-400/15 text-secondary-200 ring-1 ring-secondary-300/30"
					>
						<Icon icon={perk.icon} class="size-5" />
					</span>
					<p class="mt-4 font-semibold">
						{#if perk.href}
							<a
								href={perk.href}
								class="hover:text-secondary-200 hover:underline"
								data-sveltekit-preload-data="hover"
							>
								{perk.title}
							</a>
						{:else}
							{perk.title}
						{/if}
					</p>
					<p class="mt-1 text-sm leading-relaxed text-white/75">{perk.blurb}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>
