<script lang="ts">
	import FccLayout from '#lib/components/FccLayout.svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	let title = $derived(data.title)
	let breadcrumb = $derived(data.breadcrumb)
	let headData = $derived(data.headData)
	let songs = $derived(data.songs)
	let tHead = $derived(data.tHead)
</script>

<FccLayout {title} {breadcrumb} {headData}>
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
								<a
									href={song.spotify}
									target="_blank"
									class="btn btn-sm w-full bg-[#1ed760] px-6 text-black hover:brightness-95"
								>
									Link
								</a>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/await}
</FccLayout>
