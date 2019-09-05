const http = require('http');
const express = require("express");
const app = express();
const api =require("./routes/api");
const bodyParser = require("body-parser");
const mongo = require("./db/connect");
const server = http.createServer(app);
const timeout = require("express-timeout-handler");
const { PORT, TIMEOUT } = require("./config");

const options = {
    timeout: TIMEOUT,
    onTimeout: function(req, res, next) {
        return next(new Error('Service unavailable. Please retry.'));
    }
};

app.use(timeout.handler(options));
app.use(bodyParser.json());
app.use('/api', api);
app.use((err, req, res, next) => {
    if(err.message.match(/not found/)){
        return res.status(404).send({error: err.message});
    }
    if(err.message.match(/Service unavailable/)){
        return res.status(503).send({error: err.message});
    }    
    res.status(500).send({error: err.message});
})

async function initMongo(){
    const db = await mongo.connect();
    if(db) { initExpress(); }
}

function initExpress() {
    console.log('Iniciando Express');
    server.listen(PORT, ()=>{
        console.log("Express ha iniciado correctamente!");
        process.on("SIGINT", closeApp);
        process.on("SIGTERM", closeApp);
    });
}

function closeApp(){
    mongo.disconnect()
        .then(()=>process.exit(0));
}

initMongo();
