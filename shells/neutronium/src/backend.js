import { initBackend } from 'src/backend'
import Bridge from 'src/bridge'
import CircularJson from 'circular-json'


const bridge = new Bridge({
  listen (fn) {
    window.addEventListener('message', evt => {      
      const data = CircularJson.parse(evt.data);   
      console.log('devtools -> backend', data) 
      fn(data)
    })
  },
  send (data) {
    console.log('backend -> devtools', data)
    const dataToSend = {data, type:'data'}
    window.__listener__.postMessage('debug', CircularJson.stringify(data))
  }
})

initBackend(bridge)
