
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

Emitter.prototype.once = function (name, fn) {
	const self = this
	const { table } = this
	if (!table[name]) {
		table[name] = []
	}

	function onceFunc (...args) {
		self.off(name, onceFunc)
		fn.apply(this, args)
	}

	table[name].push(onceFunc)

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

Emitter.prototype.clear = function () {
	this.table = Object.create(null)
}

Emitter.prototype.emit = function (name, context, ...args) {
	if (!name) { return }

	const { table } = this
	const targetQueue = table[name]
	if (!targetQueue) { return }

	runFuncs(targetQueue)

	function runFuncs (fns) {
		const len = fns.length
		for (let i = 0; i < len; i++) {
			const fn = fns[i]
			fn.apply(context, args)
		}
	}
}

Emitter.prototype.abort = function () {
	// this._abort = true
}

export default Emitter
