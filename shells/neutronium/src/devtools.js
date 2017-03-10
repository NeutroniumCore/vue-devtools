import { initDevTools } from 'src/devtools'
import Bridge from 'src/bridge'
import CircularJson from 'circular-json-es6'
import mitt from 'mitt'

window.__listener__.emitter = new mitt()


// 1. init devtools
initDevTools({
  connect(cb) {
    // 2. called by devtools: inject backend
    inject(() => {
      // 3. send back bridge
      cb(new Bridge({
        listen(fn) {
          window.__listener__.emitter.on('data', data => {
            const dataValue = CircularJson.parse(data)
            fn(dataValue)
          })
        },
        send(data) {
          window.__listener__.postMessage('main', CircularJson.stringify(data))
        }
      }))
    })
  },
  onReload(reloadFn) {
  }
})

function inject(done) {
  window.__listener__.emitter.on('inject', done)
  window.__listener__.postMessage('inject', '')
}