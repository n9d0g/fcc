<script lang="ts">
	import FccLayout from '$lib/components/FccLayout.svelte'

	// Svelte 5 props
	let { data }: { data: any } = $props()
	const { title, breadcrumb, headData, songs, tHead } = data
</script>

<FccLayout {title} {breadcrumb} {headData}>
	{#await songs}
		<div>awaiting data...</div>
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
							<td class="flex items-center justify-center">
								<p>
									{song.times_played}
								</p>
							</td>
							<td>
								<a
									href={song.spotify}
									target="_blank"
									class="btn btn-sm w-full bg-[#1ed760] px-8 font-bold text-black"
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
