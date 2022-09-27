import './style.css'
import { wsClient } from './ws-clients';



document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Seccion de socket</h2>
    <input id="jwToken" placeholder="Json Web Token" />
    <button id="btn-connect">Connect</button>
    <br>
   <span id="connectWs">offline</span>
   <ul id="listClient"></ul>
   <form id="formulario">
   <input id="inputMessage" placeholder="send a message"/>
   </form>
   <h3>Messages</h3>
   <ul id="listMessages">
   </ul>
  </div>
`
// wsClient()
const inputToken = document.querySelector<HTMLInputElement>('#jwToken')!
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!

btnConnect.addEventListener('click', () => {
  if(inputToken.value.trim().length <= 0) return alert('Enter at valid JWT')
  wsClient(inputToken.value.trim())
})


