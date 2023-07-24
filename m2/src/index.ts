import express from "express";
import { connect, Channel, Connection } from 'amqplib';

const app = express();
const port = 3001;

let channel: Channel, connection: Connection;

async function rabbit() {
    let host = process.env.HOST || 'amqp://localhost';
    console.log(`Host is: ${host}`);

    connection = await connect(host);
    channel = await connection.createChannel();

    await channel.assertQueue('tasks', { durable: false });
    await channel.assertQueue('done', { durable: false });

    await channel.consume('tasks', (msg) => {
        console.log(`Got new task ${ msg?.content.toString() }`);
        let done = `[X] ${ msg?.content.toString() }`;
        channel.ack(msg!);
        channel.sendToQueue('done', Buffer.from(done));
        console.log(`Finished processing: ${done}`);
        
    })
}

app.get('*', (req, res) => {
    res.status(403).send('403 Forbidden');
})

rabbit();

app.listen(port, async () => {
    return console.log(`Express is listening at http://localhost:${port}`);
})