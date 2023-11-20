<script lang="ts">
	export let worshipAssignmentsData: any
</script>

<div class="my-16">
	<h2 class="h2 my-4 font-bold">2024 Worship Assignments</h2>

	<div class="table-container">
		<table class="table table-compact">
			<thead>
				<tr>
					<th class="table-cell-fit">Leaders</th>
					<th class="table-cell-fit">Acoustic Guitar</th>
					<th class="table-cell-fit">Keys</th>
					<th class="table-cell-fit">Bass</th>
					<th class="table-cell-fit">Drums</th>
					<th class="table-cell-fit">Electric</th>
					<th class="table-cell-fit">Backup</th>
				</tr>
			</thead>
			<tbody>
				{#each worshipAssignmentsData as row, index}
					<tr>
						<td class="table-cell-fit">{row.leader || ''}</td>
						<td class="table-cell-fit">{row.acousticGuitar || ''}</td>
						<td class="table-cell-fit">{row.keys || ''}</td>
						<td class="table-cell-fit">{row.bass || ''}</td>
						<td class="table-cell-fit">{row.drums || ''}</td>
						<td class="table-cell-fit">{row.electric || ''}</td>
						<td class="table-cell-fit">{row.backup || ''}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
