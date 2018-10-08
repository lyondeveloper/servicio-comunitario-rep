const {io} = require('../../server');

io.on('connection', (client) => {

    client.on('connection', () => {

        console.log('server - Connected');

    });

});