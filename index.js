const express = require('express')
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qplrqms.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try{
        await client.connect();
       const partsCollection = client.db('skylink-computers').collection('parts');
       const userCollection = client.db('skylink-computers').collection('users');

       app.get('/part', async(req, res) => {
           const query = {};
           const cursor = partsCollection.find(query);
           const parts = await cursor.toArray();
           res.send(parts);
       });

       app.get('/part/:id', async(req, res) => {
           const id = req.params.id;
           const query = {_id: ObjectId(id)};
           const part = await partsCollection.findOne(query);
           res.send(part);
       })

       app.put('/user/:email', async(req, res) => {

       });
    }
    finally{

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`listening to slylink computers on port ${port}`)
})