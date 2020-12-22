
function Emitter () {
	if (!(this instanceof Emitter)) {
		return new Emitter()
	}

	this.table = Object.create(null)
}

Emitter.prototype.on = function (name, fn) {
	const { table } = this
	if (!table[name]) {
		table[name] = []
	}

	table[name].push(fn)

	return this
}

Emitter.prototype.off = function (name, fn) {
	const { table } = this
	const targetQueue = table[name]
	if (targetQueue) {
		if (fn) {
			const index = targetQueue.indexOf(fn)
			if (~index) {
				return targetQueue.splice(index, 1).length > 0
			}
		} else {
			targetQueue.length = 0
			return true
		}
	}

	return false
}

Emitter.prototype.emit = function (name, context) {
	if (!name) { return }

	const { table } = this
	const targetQueue = table[name]
	if (!targetQueue) { return }

	runFuncs(targetQueue)

	function runFuncs (fns) {
		const len = fns.length
		for (let i = 0; i < len; i++) {
			const fn = fns[i]
			fn.call(context)
		}
	}
}

Emitter.prototype.abort = function () {
	// this._abort = true
}

export default Emitter
