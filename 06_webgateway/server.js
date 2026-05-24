import http from "http";

const myServer = http.createServer((req, res)=>{

    console.log(`request received from : ${req.url} `);

    res.writeHead(200, {"content-type" : "text/plain"});

    res.end("Message received from server")
})

const port = 3000;
myServer.listen(port, ()=>{
    console.log(`port is listening at ${port}`);
})