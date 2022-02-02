const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) =>{ // validacion del JWT


       // Cuando un cliente se conecta
       socket.emit( 'ultimo-ticket', ticketControl.ultimo );
       socket.emit( 'estado-actual', ticketControl.ultimos4 );
       socket.emit( 'tickets-pendientes', ticketControl.tickets.length);
  
         socket.on('siguiente-ticket',(payload,callback) =>{
        
            const siguiente = ticketControl.siguiente();
            callback( siguiente );
            socket.broadcast.emit( 'tickets-pendientes', ticketControl.tickets.length);

         })
         
     }

module.exports ={
    socketController
}