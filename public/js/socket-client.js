//Referencias del HTML
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar  = document.querySelector('#btnEnviar');


//socket cliente
const socket = io();


//listening events
socket.on('connect',() =>{
  //  console.log('conectado al servidor');
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
    
})

socket.on('disconnect',() =>{
   // console.log('Desconectado del servidor');
    lblOffline.style.display = '';
    lblOnline.style.display = 'none';
})

//send message all clients connected
socket.on('enviar-mensaje', (payload) => {
    console.log( payload )
})


btnEnviar.addEventListener( 'click', () => {

    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: '123ABC',
        fecha: new Date().getTime()
    }
    
    // send id for communication with the server
    socket.emit( 'enviar-mensaje', payload, ( id ) => {
        console.log('Desde el server', id );
    });
});