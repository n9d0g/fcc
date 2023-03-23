<script lang="ts">
	import { ListBox, ListBoxItem, popup } from '@skeletonlabs/skeleton'
	import type { PopupSettings } from '@skeletonlabs/skeleton'

	export let text: string
	export let link: string

	let comboboxValue: string = text

	let popupCombobox: PopupSettings = {
		event: 'hover',
		target: 'combobox',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	}
</script>

<!-- <a
	href={link}
	class="flex w-32 btn hover:variant-filled-surface h-10 btn-icon bg-transparent p-4"
	use:popup={popupCombobox}>{comboboxValue ?? 'Trigger'}</a
> -->

<a
	href={link}
	class="flex w-32 btn hover:variant-filled-surface h-10 btn-icon bg-transparent p-4"
	use:popup={popupCombobox}>{comboboxValue}</a
>

<!-- <div class="card w-48 py-2" data-popup="combobox">
	<ListBox rounded="rounded-none">
		<ListBoxItem bind:group={comboboxValue} name="medium" value="books">Books</ListBoxItem>
		<ListBoxItem bind:group={comboboxValue} name="medium" value="movies">Movies</ListBoxItem>
		<ListBoxItem bind:group={comboboxValue} name="medium" value="television">
			Television
		</ListBoxItem>
	</ListBox>
	<div class="arrow bg-surface-100-800-token" />
</div> -->
