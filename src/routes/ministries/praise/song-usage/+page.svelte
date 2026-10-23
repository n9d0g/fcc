<script lang="ts">
	import FccLayout from '#lib/components/FccLayout.svelte'
	import { enhance } from '$app/forms'
	import { toaster } from '#lib/stores/toaster.js'
	import { SONG_LIMITS } from '#lib/schemas/songs.js'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	let songs = $derived(data.songs)
	let tHead = $derived(data.tHead)

	let adding = $state(false)
</script>

<FccLayout heading="Song Usage">
	<section aria-labelledby="add-song" class="mb-10">
		<h2 id="add-song" class="h3 mb-4">Add a song</h2>
		<form
			method="POST"
			action="?/add"
			use:enhance={() => {
				adding = true
				return async ({ result, update }) => {
					adding = false
					await update()
					if (result.type === 'success') {
						toaster.success({ title: `Added ${result.data?.added ?? 'song'}` })
					} else if (result.type === 'failure') {
						toaster.error({ title: String(result.data?.message ?? 'Something went wrong.') })
					}
				}
			}}
			class="card grid gap-3 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end"
		>
			<label class="label flex flex-col gap-1 text-sm">
				<span>Song name</span>
				<input class="input" name="songName" maxlength={SONG_LIMITS.songName} required />
			</label>
			<label class="label flex flex-col gap-1 text-sm">
				<span>Artist</span>
				<input class="input" name="artist" maxlength={SONG_LIMITS.artist} placeholder="Optional" />
			</label>
			<label class="label flex flex-col gap-1 text-sm">
				<span>Spotify link</span>
				<input
					class="input"
					type="url"
					name="spotify"
					placeholder="https://open.spotify.com/track/…"
				/>
			</label>
			<button class="btn btn-primary" disabled={adding}>Add</button>
		</form>
	</section>

	{#await songs}
		<p class="text-muted">Loading songs…</p>
	{:then songs}
		<!-- schedule table -->
		<div class="table-container">
			<table class="table-compact table">
				<thead>
					<tr>
						{#each tHead as header, index}
							<th class={index > 1 ? 'text-center' : ''}>{header}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each songs as song}
						<tr>
							<td>{song.song_name}</td>
							<td>{song.artist}</td>
							<td class="text-center font-semibold tabular-nums">{song.times_played}</td>
							<td>
								{#if song.spotify}
									<a
										href={song.spotify}
										target="_blank"
										class="btn btn-sm w-full bg-[#1ed760] px-6 text-black hover:brightness-95"
									>
										Link
									</a>
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/await}
</FccLayout>
