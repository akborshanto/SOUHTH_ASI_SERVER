// /SOUTHEASTASIA
//elkIin98K53Weqff
const express=require('express')

const cors=require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app=express()
const port=5000;
//miidle ware
app.use(cors())
app.use(express.json())
//========COLLECTION==============

/* ====================================================================== */


const uri = "mongodb+srv://SOUTHEASTASIA:elkIin98K53Weqff@cluster1.phei2xm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

const spotCollection=client.db('addSpotDB').collection('addSpot')

/* get method with ADD SPOT */
app.get('/addSpot',async (req,res)=>{

    const result=await spotCollection.find().toArray()
    res.send(result)
})

/* single view detal */
app.get('/singleSpot/:id',async (req,res)=>{
    console.log(req.params.id)
    const result=await spotCollection.findOne({_id:new ObjectId(req.params.id)})
    res.send(result)
})
/* post method with ADD SPOT*/
app.post('/addSpot',async (req,res)=>{
    const newSpot=req.body;
    const result=await spotCollection.insertOne(newSpot)
    res.send(result)
})



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);




/* ====================================================================== */
app.get('/',(req,res)=>{
    res.send("SOUTHEST SURBERIS RUNNIN")
})
app.listen(port,()=>{
    console.log(`SOuntehs server listenti ${port}`)
})