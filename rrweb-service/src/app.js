import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectMysql, insertData, queryAllUserLatestEvents, queryUserLatestEvents } from './mysql';

const app = express();
let DB = null;

app.use(bodyParser.json({ limit: '50mb' }));// for parsing application/json
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

app.get('/', (_, res) => {
    res.send('rrweb-express-service');
});


app.post('/reportEvents', async (req, res) => {
    await insertData(DB, req.body);
    res.json({ success: true });
});

app.get('/getAllUserLatestEventList', async (_, res) => {
    const data = await queryAllUserLatestEvents(DB);
    res.json({ success: true, data });
});

app.get('/getUserLatestEventList', async (req, res) => {
    const data = await queryUserLatestEvents(DB, req.query.userName);
    res.json({ success: true, data: data[0] || {} });
});


app.listen(3000, async () => {
    console.log('http://localhost:3000');
    DB = await connectMysql();
});