export function once (fn) {
	let isExecuted = false
	return function (...args) {
		if (!isExecuted) {
			fn.apply(this, args)
			isExecuted = true
		}

		return isExecuted
	}
}
