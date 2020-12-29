import { once } from 'src/util/index'

describe('uitl', () => {
	it('only once', () => {
		let i = 0
		const action = once(() => { expect(i++).equal(0) })
		action()
		action()
		action()
		action()
		action()
		action()
		expect(i).equal(1)
	})
})
