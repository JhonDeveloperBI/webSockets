const socketController = (socket) =>{ // validacion del JWT
      console.log('cliente conectado', socket.id);
        socket.on('disconnect',() =>{
         console.log('cliente desconectado',socket.id); // id volatiles
        })
       // return socket.disconect();

         //escuchar mensaje
         //callback referen the socket client enviar-mensaje
         socket.on('enviar-mensaje',(payload,callback) =>{

             const id = 123456;
             //send message to one client connect
             callback(id);

            // console.log('enviar mensaje desde el server', payload);
            
            // enviar mensaje a todos los clientes conectados
            //this.io.emit('enviar-mensaje', payload)
            //send message a everyone customers connected
            socket.broadcast.emit('enviar-mensaje', payload)

         })
         
     }

module.exports ={
    socketController
}