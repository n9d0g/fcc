<script lang="ts">
	type Role =
		| 'LEADER'
		| 'ACOUSTIC_GUITAR'
		| 'KEYS'
		| 'BASS'
		| 'DRUMS'
		| 'ELECTRIC_GUITAR'
		| 'BACKUP'
	type Assignment = { role: string; names: string[] }

	// Svelte 5 props
	let { praiseAssignments }: { praiseAssignments: Assignment[] } = $props()

	const transformedAssignments: Record<Role, string[]> = {
		LEADER: [],
		ACOUSTIC_GUITAR: [],
		KEYS: [],
		BASS: [],
		DRUMS: [],
		ELECTRIC_GUITAR: [],
		BACKUP: [],
	}

	// Normalize role names for consistent matching
	const normalizeRole = (role: string): Role => {
		const normalized = role.toUpperCase().replace(/[-\s]/g, '_')
		if (normalized === 'LEADER' || normalized === 'LEADERS') return 'LEADER'
		if (normalized === 'ACOUSTIC' || normalized === 'ACOUSTIC_GUITAR') return 'ACOUSTIC_GUITAR'
		if (normalized === 'ELECTRIC' || normalized === 'ELECTRIC_GUITAR') return 'ELECTRIC_GUITAR'
		return normalized as Role
	}

	praiseAssignments.forEach((assignment) => {
		const role = normalizeRole(assignment.role)
		if (role in transformedAssignments) {
			transformedAssignments[role] = assignment.names || []
		}
	})
</script>

<div class="my-16">
	<h2 class="h2 my-4 font-bold">2025 Praise Assignments</h2>

	<div class="table-container">
		<table class="table-compact table">
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
				{#each Array(Math.max(...Object.values(transformedAssignments).map((arr) => arr.length))) as _, i}
					<tr>
						<td class="table-cell-fit">
							{transformedAssignments.LEADER[i] || ''}
						</td>
						<td class="table-cell-fit">
							{transformedAssignments.ACOUSTIC_GUITAR[i] || ''}
						</td>
						<td class="table-cell-fit">
							{transformedAssignments.KEYS[i] || ''}
						</td>
						<td class="table-cell-fit">
							{transformedAssignments.BASS[i] || ''}
						</td>
						<td class="table-cell-fit">
							{transformedAssignments.DRUMS[i] || ''}
						</td>
						<td class="table-cell-fit">
							{transformedAssignments.ELECTRIC_GUITAR[i] || ''}
						</td>
						<td class="table-cell-fit">
							{transformedAssignments.BACKUP[i] || ''}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
