import { createToaster } from '@skeletonlabs/skeleton-svelte'

// Shared toaster; <Toaster /> in the root layout renders whatever is queued here
export const toaster = createToaster({ placement: 'top', overlap: false })
