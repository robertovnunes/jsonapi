const server = require('./conf/server');

const consign = require('consign');

consign().include('routes')
.then('controllers')
.into(server);

server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});