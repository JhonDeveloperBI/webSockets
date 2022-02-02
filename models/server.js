const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server); // informacion clientes conectados

        this.paths = {}

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        //sockets
        this.sockets();

    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS NO ES NECESARIO PARA LOS SOCKETS I.O
        this.app.use( cors() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        
    }

    sockets(){
        this.io.on('connection',socket =>{ // validacion del JWT
           console.log('cliente conectado', socket.id);
           socket.on('disconnect',() =>{
            console.log('cliente desconectado',socket.id); // id volatiles
           })
          // return socket.disconect();

            //escuchar mensaje
            socket.on('enviar-mensaje',(payload) =>{
                console.log('enviar mensaje desde el server', payload);
            })
            
        });
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;