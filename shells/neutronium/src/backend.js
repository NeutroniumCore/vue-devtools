import { initBackend } from 'src/backend'
import Bridge from 'src/bridge'
import CircularJson from 'circular-json'


const bridge = new Bridge({
  listen (fn) {
    window.addEventListener('message', evt => fn(CircularJson.parse(evt.data)))
  },
  send (data) {
    console.log('backend -> devtools', data)
    window.__listener__.postMessage( CircularJson.stringify(data))
  }
})

initBackend(bridge)
