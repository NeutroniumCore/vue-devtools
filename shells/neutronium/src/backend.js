import { initBackend } from 'src/backend'
import Bridge from 'src/bridge'
import listener from 'neutronium_listener'

const bridge = new Bridge({
  listen(fn) {
    listener.on('data',fn)
  },
  send(data) {
    console.log('backend -> devtools', data)
    listener.post('data', data)
  }
})

initBackend(bridge)
