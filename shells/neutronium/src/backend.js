import { initBackend } from 'src/backend'
import Bridge from 'src/bridge'
import listener from 'neutronium_listener'

const bridge = new Bridge({
  listen(fn) {
    listener.on('main:data',fn)
  },
  send(data) {
    listener.post('dev:data', data)
  }
})

initBackend(bridge)
