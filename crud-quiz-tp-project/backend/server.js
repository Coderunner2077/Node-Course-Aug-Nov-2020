const http = require("http");
const app = require("./app");

const normalizePort = val => {
    let port = parseInt(val, 10);
    if(isNaN(port))
        return val;

    if(port >= 0)
        return port;
    
    return false;
}

const port = normalizePort(process.env.PORT || 3000);

app.set("port", port);


const normalizeAddress = address => {
    let bind = typeof address === "string" ? "pipe " + port : "port " + port;
    return bind;
}

const errorHandler = error => {
    if(error.syscall() !== 'listen')
        throw error;
    let bind = normalizeAddress(server.address());
    
    switch(error.code) {
        case 'EACCES': 
            process.error(bind + " requires higher prvileges");
            process.exti(1);
            break;
        case 'EADDRINUSE':
            process.error(bind + " already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
    let bind = normalizeAddress(server.address());
    console.log("Listening on " + bind);
});

server.listen(port);