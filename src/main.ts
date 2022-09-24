import './style.css'
import { wsClient } from './ws-clients';



document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Seccion de socket</h1>
  </div>
`
wsClient()

