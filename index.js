// require your server and launch it here
const server = require('./api/server');
const port = 9001;

server.listen(port,() => console.log(`server running on port ${port}`))