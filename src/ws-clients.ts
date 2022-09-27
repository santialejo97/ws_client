import { Manager, Socket } from "socket.io-client"
let socket : Socket
export const wsClient = (jwToken: string)=>{
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
        extraHeaders: {
            authentication: jwToken
        }
    })
    socket?.removeAllListeners()
    socket =  manager.socket('/')
    addListener()
}


const addListener = () => {


    const span = document.querySelector('#connectWs')!;
    const listClient = document.querySelector('#listClient')!;
    const form = document.querySelector<HTMLFormElement>('#formulario')!
    const message = document.querySelector<HTMLInputElement>('#inputMessage')!
    const listMessages = document.querySelector('#listMessages')!

    socket.on('connect', () =>{
        span.textContent = 'Online'; 
    })

    socket.on('disconnect', () =>{
        span.textContent = 'Offline';
    })

    socket.on('clients-updated', (listClients: string[]) =>{
         listClients.forEach(client => {
             const li = document.createElement('LI');
             li.innerHTML = client
            listClient.appendChild(li)
        })
     })
    
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        if ( message.value.trim().length <= 0 ) return
        console.log(message.value)
        socket.emit('message', { id: 'yo', message: message.value.trim() })
        message.value = ''
    })


    socket.on('message-serve', (payload: { fullName: string, message: string }) => {
        const messageLi = document.createElement('LI');
        messageLi.innerHTML = `${payload.fullName} - ${payload.message}`
        listMessages.appendChild(messageLi)
    })


    
    

}