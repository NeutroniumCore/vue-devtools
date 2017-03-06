import { initDevTools } from 'src/devtools'
import Bridge from 'src/bridge'
import CircularJson from 'circular-json'


// 2. init devtools
initDevTools({
  connect(cb) {
      // 4. send back bridge
      cb(new Bridge({
        listen(fn) {
          window.addEventListener('message', evt => fn(CircularJson.parse(evt.data)))
        },
        send(data) {
          console.log('devtools -> backend', data)
          window.__listener__.postMessage( CircularJson.stringify(data))
        }
      }))
  },
  onReload(reloadFn) {
  }
})

