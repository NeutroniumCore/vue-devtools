import { initDevTools } from 'src/devtools'
import Bridge from 'src/bridge'
import listener from 'neutronium_listener'

// 1. init devtools
initDevTools({
  connect(cb) {
    // 2. called by devtools: inject backend
    inject(() => {
      console.log('backend injected devtools ready')
      // 3. send back bridge
      cb(new Bridge({
        listen(fn) {
           listener.on('data', data => {
            console.log('backend -> devtools', data)
            fn(data)
          })
        },
        send(data) {
          console.log('devtools -> backend', data)
          listener.post('data', data)
        }
      }))
    })
  },
  onReload(reloadFn) {
    console.log('devtools onReload called')
  }
})

function inject(done) {
  listener.on('injectDone', done)
  listener.post('inject')
}