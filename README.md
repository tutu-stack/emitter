## Emitter
A tiny, fast,zero-dependency event emitter for Javascript.

## Usage

Create an emitter instance.

```js
const e = new Emitter()
// or
const e = Emitter()
```

add handlers


```js
const test = function () {
	console.log('test')
}
e.on('start', test)
```

Remove handlers.

```js
e.off('start', test)
```

Trigger events.

```js
// The second parameter here is the context you wish to
e.emit('start', { name: 'test' })
```
