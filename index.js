import express from "express"
import cors from "cors"
import { MongoClient } from 'mongodb';
import "dotenv/config"
const app = express() 
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())
const { DB_USER, DB_PASS } = process.env

if (!DB_USER || !DB_PASS) {
    throw new Error("DB_USER and DB_PASS must be set in the environment")
}

const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.voumct9.mongodb.net/`
const client = new MongoClient(mongoUri)
export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}
const cornectedClient = await connectToMongoDB();
const db = cornectedClient.db('simpleCrusdDB');
const users = db.collection('user');
app.get('/users', async(req, res) =>{
    const cursor = users.find({});
    const allUser = await cursor.toArray();
    res.send(allUser)
})
app.get('/', (req, res) =>(
    res.send("hellow world")
))
app.listen(port, () =>(
    console.log(`Exmpall from ${port}`)
))