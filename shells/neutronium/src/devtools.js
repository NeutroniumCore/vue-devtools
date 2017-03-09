import { initDevTools } from 'src/devtools'
import Bridge from 'src/bridge'
import CircularJson from 'circular-json'


// 2. init devtools
initDevTools({
  connect(cb) {
    // 3. called by devtools: inject backend
    inject(() => {
      // 4. send back bridge
      cb(new Bridge({
        listen(fn) {
          window.addEventListener('message', reactTo('data', fn))
        },
        send(data) {
          console.log('devtools -> backend', data)
          window.__listener__.postMessage('main', CircularJson.stringify(data))
        }
      }))
    })
  },
  onReload(reloadFn) {
  }
})

function inject(done) {
  window.addEventListener('message', reactTo('inject', done))
  window.__listener__.postMessage('inject', '') 
}

function reactTo(dataType, cb) {
  return evt => {
    const data = CircularJson.parse(evt.data)
    if (data.type = dataType)
      cb(data.data)
  }
}