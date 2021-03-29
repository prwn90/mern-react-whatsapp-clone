import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "YOUR APP ID",
    key: "YOUR KEY",
    secret: "YOUR SECRET",
    cluster: "eu",
    useTLS: true
});

const db = mongoose.connection;

db.once('open', () => {
    console.log('DB Connected');

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change) => {
        console.log('change: ',change);

        if (change.operationType === "insert") {
            const messageDetails = change.fullDocument;
            pusher.trigger("messages","inserted",{
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            });
        } else {
            console.log("Error Triggering Pusher");
        }
    });
});


app.use(express.json());
app.use(cors());

//Mongo DB Config 
const connection_url = 'YOUR DB CONFIG';

mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Routes API
app.get('/',(req,res) => res.status(200).send('Hello World'));

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => { 
    
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
});

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body;

    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
});


//Listening port
app.listen(port, () => console.log(`Listening on localhost:${port}`));
