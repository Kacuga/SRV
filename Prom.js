const client = require('prom-client');
const collectDefaultMetrics = client.collectDefaultMetrics;
const Registry = client.Registry;
const register = new Registry();
collectDefaultMetrics({ register });
const path = require('path');
const express = require('express');
const app = express();
const log4js = require("log4js");
app.use(require('express-status-monitor')());
log4js.configure({
    appenders: {
        console: { type: "console" },
        file: { type: "file", filename: "F:/SRV/Prom/logs/log.csv" },
    },
    categories: {
        msg: { appenders: ["file"], level: "info" },
        default: { appenders: ["console"], level: "info" },
    },
});

const logger = log4js.getLogger("msg");
app.use(log4js.connectLogger(logger, { level: "auto" }));

collectDefaultMetrics();
app.get('/metrics', async (_req, res) => {
    try {
        res.set('Content-Type', register.contentType);
        res.end(await register.metrics());
    } catch (err) {
        res.status(500).end(err);
    }
});


app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'views')))
app.use(express.static(path.join(__dirname, 'osn')))
app.use(express.static(path.join(__dirname, 'release')))
app.use(express.static(path.join(__dirname, 'stats')))
app.use(express.static(path.join(__dirname, 'HealthC')))
app.get('/OSS', (req, res) => {
    res.send('Contour : OSS');
    console.log('Request OSS')
});
app.get('/', (req, res) => {
    res.sendFile('views/index.html', { root:__dirname})
    console.log('Request Index')
});
app.get('/error', (req, res) => {
    res.sendFile('osn/error.html', { root:__dirname})
    console.log('Request Error')
});
app.get('/key', (req, res) => {
    res.sendFile('osn/key.html', { root:__dirname})
    console.log('Request Key')
});
app.get('/ras', (req, res) => {
    res.sendFile('osn/ras.html', { root:__dirname})
    console.log('Request ras')
});
app.get('/ras2', (req, res) => {
    res.sendFile('osn/ras2.html', { root:__dirname})
    console.log('Request ras2')
});
app.get('/server', (req, res) => {
    res.sendFile('osn/Server.html', { root:__dirname})
    console.log('Request Server')
});
app.get('/r1', (req, res) => {
    res.sendFile('release/r1.html', { root:__dirname})
    console.log('Request r1')
});
app.get('/r2', (req, res) => {
    res.sendFile('release/r2.html', { root:__dirname})
    console.log('Request r2')
});
app.get('/salter', (req, res) => {
    res.sendFile('stats/SAlter.html', { root:__dirname})
    console.log('Request SAlter')
});
app.get('/sprom', (req, res) => {
    res.sendFile('stats/sprom.html', { root:__dirname})
    console.log('Request sprom')
});
app.get('/stat', (req, res) => {
    res.sendFile('stats/stat.html', { root:__dirname})
    console.log('Request stat')
});
app.get('/ststand', (req, res) => {
    res.sendFile('stats/ststand.html', { root:__dirname})
    console.log('Request ststand')
});
app.get('/Prom', (req, res) => {
    res.sendFile('HealthC/mon.html', { root:__dirname})
    console.log('Request Monitoring')
});




app.listen(6000, () => {
    console.log('Prom');
    console.log('Contour : Prom');
    console.log('Server status: UP', 'Port :5002')
    console.log('Realese : 0.0.2');
    console.log('Bild : SVR.03.02G')
});
