const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) =>{ // validacion del JWT


       // Cuando un cliente se conecta
       socket.emit( 'ultimo-ticket', ticketControl.ultimo );
       socket.emit( 'estado-actual', ticketControl.ultimos4 );

       //tickets-pendientes
       socket.emit( 'tickets-pendientes', ticketControl.tickets.length);
  
         socket.on('siguiente-ticket',(payload,callback) =>{
        
            const siguiente = ticketControl.siguiente();
            callback( siguiente );
            
            socket.broadcast.emit( 'tickets-pendientes', ticketControl.tickets.length);

         })

         socket.on('atender-ticket', ({ escritorio }, callback) => {
        
            if ( !escritorio ) {
                return callback({
                    ok: false,
                    msg: 'Es escritorio es obligatorio'
                });
            }
    
            const ticket = ticketControl.atenderTicket( escritorio );
    
            /// notificar cambio en los ultimos 4
            socket.broadcast.emit( 'estado-actual', ticketControl.ultimos4 );

            socket.emit( 'tickets-pendientes', ticketControl.tickets.length);
            //emitir cantidad nueva al cliente
            socket.broadcast.emit( 'tickets-pendientes', ticketControl.tickets.length);
    
            if ( !ticket ) {
                callback({
                    ok: false,
                    msg: 'Ya no hay tickets pendientes'
                });
            } else {
                callback({
                    ok: true,
                    ticket
                })
            }
    
        })
         
     }

module.exports ={
    socketController
}