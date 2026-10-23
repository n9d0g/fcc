/** Where Send-once records what has already gone out. */
export type Ledger<K> = {
	/** False if `key` was already claimed (sent, or being sent by another run) */
	claim(key: K): Promise<boolean>
	release(key: K): Promise<void>
	/** Called once delivery finishes, with how many people it reached */
	record?(key: K, delivered: number): Promise<void>
}

/**
 * Delivers the message keyed by `key` at most once. Claims the key first, so
 * an overlapping run skips it, then calls `deliver`, which returns how many
 * people it reached and throws only if it reached nobody. On that throw the
 * claim is released so a later run can try again; a partial delivery keeps
 * the claim, so nobody gets the message twice.
 *
 * Returns how many people were reached, or null if it was already sent.
 */
export async function sendOnce<K>(
	ledger: Ledger<K>,
	key: K,
	deliver: () => Promise<number>
): Promise<number | null> {
	if (!(await ledger.claim(key))) return null

	let delivered: number
	try {
		delivered = await deliver()
	} catch (e) {
		await ledger.release(key)
		throw e
	}
	await ledger.record?.(key, delivered)
	return delivered
}

/** In-memory ledger for tests. */
export function memoryLedger<K>(toId: (key: K) => string = String) {
	const claimed = new Map<string, number | undefined>()
	const ledger: Ledger<K> = {
		async claim(key) {
			if (claimed.has(toId(key))) return false
			claimed.set(toId(key), undefined)
			return true
		},
		async release(key) {
			claimed.delete(toId(key))
		},
		async record(key, delivered) {
			claimed.set(toId(key), delivered)
		},
	}
	return { ledger, claimed }
}
