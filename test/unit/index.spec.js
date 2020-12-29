import Emitter from 'src/index'

describe('emitter', () => {
	it('Handles emits', () => {
		const e = new Emitter()
		const test = function () {
			expect(this.name).equal('test')
		}
		e.on('start', test)
		e.emit('start', { name: 'test' })
	})

	it('Handles emit once', () => {
		const e = new Emitter()
		let count = 1
		const handle1 = function (data) {
			if (count > 1) {
				throw new Error('Should not have run')
			}
			expect(data).equal(1)
			count++
		}
		e.once('start', handle1)
		e.emit('start', null, 1)
		e.emit('start', null, 1)
		e.emit('start', null, 1)
		expect(count).equal(2)
	})

	it('Allows multiple handlers', () => {
		const e = Emitter()
		let count = 0
		for (let i = 0; i < 3; i++) {
			e.on('test', () => {
				count++
			})
		}

		e.emit('test')
		expect(count).equal(3)
	})

	it('Allows removal of handlers', () => {
		const e = Emitter()

		const handlerTest = (data) => {
			throw new Error('Should not have run')
		}
		e.on('test', handlerTest)
		e.off('test', handlerTest)
		e.on('parameters', data => {
			expect(data).equal(1)
		})

		e.emit('test', { name: '123' }, 1)
	})

	it('Allows parameters', () => {
		const e = Emitter()
		const handler = function (data) {
			expect(data).equal(3)
		}

		e.on('test', handler)
		e.emit('test', null, 3)
	})
})
