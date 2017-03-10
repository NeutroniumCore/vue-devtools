import { initBackend } from 'src/backend'
import Bridge from 'src/bridge'
import CircularJson from 'circular-json-es6'
import mitt from 'mitt'

window.__listener__.emitter = new mitt()

const bridge = new Bridge({
  listen(fn) {
    window.__listener__.emitter.on('data', data => {
      const dataValue = CircularJson.parse(data)
      fn(dataValue)
    })
  },
  send(data) {
    window.__listener__.postMessage('debug', CircularJson.stringify(data))
  }
})

initBackend(bridge)
