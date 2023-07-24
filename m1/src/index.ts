import express from "express";
import { Request, Response } from "express";
import { connect, Channel, Connection, ConsumeMessage } from 'amqplib';

const app = express();
app.use(express.json());

const port = 3000;

let channel: Channel, connection: Connection, done: string;

async function rabbit() {
    let host = process.env.HOST || 'amqp://localhost';
    console.log(`Host is: ${host}`);
    
    connection = await connect(host);
    channel = await connection.createChannel();

    await channel.assertQueue('tasks', { durable: false });
    await channel.assertQueue('done', { durable: false });

    channel.consume('done', (msg: ConsumeMessage | null) => {
        console.log(`Received processed task: ${ msg?.content }`);
        channel.ack(msg!);
        done = JSON.stringify({'done': `${ msg?.content }`});
        console.log(`Task completed: ${done}`);
    });
}

app.get('*', (req: Request, res: Response) => {
    res.status(403).send('Forbidden')
})

app.post('/addtask', async (req: Request, res: Response) => {
    const data = req.body;

    console.log(`Received POST request with data: ${JSON.stringify(data)}`);

    const task = data['task'];

    if (task) {
        channel.sendToQueue('tasks', Buffer.from(task));

        setTimeout(() => {
            res.json(JSON.parse(done));
        }, 1000);
    }
    else {
        res.status(400).send('400 Bad request');
    }
})

rabbit();

app.listen(port, async () => {
    return console.log(`Express is listening at http://localhost:${port}`);
})