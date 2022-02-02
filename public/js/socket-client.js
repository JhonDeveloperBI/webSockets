//Referencias del HTML
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');


//socket cliente
const socket = io();


//listening events
socket.on('connect',() =>{
    console.log('conectado al servidor');
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
    
})

socket.on('disconnect',() =>{
    console.log('Desconectado del servidor');
    lblOffline.style.display = '';
    lblOnline.style.display = 'none';
})