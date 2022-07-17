const http = require("http");
const app = require("./app");

normalizePort = val => {
    let port = parseInt(val, 10);
    if(isNaN(port))
        return val;

    if(port >= 0)
        return port;  
    
    return false;
    
}  

const port = normalizePort(process.env.PORT || 4000);

app.set("port", port);

const normalizeAddress = address => {
    const bind = typeof address === "string" ? "bind " + address : "port " + port;
    return bind;
};

const handleError = error => {
    if(error.syscall() !== "listen")
        throw error;

    const bind = normalizeAddress(server.address());
    switch(error.code) {
        case 'EACCES':
            console.error(`${bind} requires higher privilege`);
            process.exit(1);
            break;
        case 'EADDRINUSE': 
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error
    }
};

const server = http.createServer(app);

server.on("error", handleError);
server.on("listening", () => {
    console.log(`Server listening on ${normalizeAddress(server.address())}`);
});

server.listen(port);
