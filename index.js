// /SOUTHEASTASIA
//elkIin98K53Weqff
const express = require("express");

const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = 5000;
//miidle ware
app.use(cors());
app.use(express.json());
//========COLLECTION==============

/* ====================================================================== */

const uri =
  "mongodb+srv://SOUTHEASTASIA:elkIin98K53Weqff@cluster1.phei2xm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const spotCollection = client.db("addSpotDB").collection("addSpot");

    /* post methdo */
    app.post("/addTourism", async (req, res) => {
      console.log(req.body);
      const result = await spotCollection.insertOne(req.body);

      console.log(result);
      res.send(result);
    });

    /* get method mylislt */
    app.get("/myList/:email", async (req, res) => {
      console.log(req.params.email);
      const result = await spotCollection
        .find({ email: req.params.email })
        .toArray();
      res.send(result);
    });

    /* single update dataat */

    app.get("/singleUpdate/:id", async (req, res) => {
      const result = await spotCollection.findOne({
        _id: new ObjectId(req.params.id),
      });
      console.log(result);
      res.send(result);
    });

    /* update daaa */
    app.put("/AllUpdate/:id", async (req, res) => {
      console.log(req.params.id);
      const quary = { _id: new ObjectId(req.params.id) };
      const data = {
        $set: {
          photo: req.body.photo,
          country_Name: req.body.country_Name,
          ToureistName: req.body.ToureistName,
          location: req.body.location,
          description: req.body.description,
          average_cost: req.body.average_cost,
          seasonality: req.body.seasonality,
          travel_time: req.body.travel_time,

          totaVisitorsPerYear: req.body.totaVisitorsPerYear,
        },
      };
      const result=spotCollection.updateOne(quary,data)
      res.send(result)
    });

    /* ==============v 🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩============ */

    // /* get method with ADD SPOT */
    // app.get('/addSpot',async (req,res)=>{

    //     const result=await (await spotCollection.find().sort().toArray())
    //     res.send(result)
    // })

    // /* single view detal */
    // app.get('/singleSpot/:id',async (req,res)=>{
    //     console.log(req.params.id)
    //     const result=await spotCollection.findOne({_id:new ObjectId(req.params.id)})
    //     res.send(result)
    // })
    // /* post method with ADD SPOT*/
    // app.post('/addSpot',async (req,res)=>{
    //     const newSpot=req.body;
    //     const result=await spotCollection.insertOne(newSpot)
    //     console.log(result)
    //     res.send(result)
    // })

    /* update======================= */

    // app.put('/updateSpot/:id',async (req,res)=>{

    //     const quary={_id:new ObjectId(req.params.id)}
    //     const data={

    // $set:{
    //     photo:req.body.photo,
    //     country_Name:req.body.country_Name,
    //     ToureistName:req.body.ToureistName,
    //     location:req.body.location,
    //     description:req.body.description,
    //     average_cost:req.body.average_cost,
    //     seasonality:req.body.seasonality,
    //     travel_time:req.body.travel_time,

    //     totaVisitorsPerYear:req.body.totaVisitorsPerYear,

    // }

    //     }

    //     const result=await spotCollection.updateOne(quary,data)
    //     res.send(result)
    // })

    /* ===============MYLIST============= */
    // app.post('/addPD',async (req,res)=>{

    //     console.log(req.body)
    //     const result=await spotCollection.insertOne(req.body)
    //     console.log(result)
    //     res.send(result)
    // })

    // app.get('/addPD/:email',async (req,res)=>{
    // console.log(req.params.email)
    // const result=await spotCollection.find({email:req.params.email}).toArray()
    // res.send(result)
    // })

    // app.delete('/addPD/:id',async(req,res)=>{

    //     const id=req.params.id;
    //     const filter={_id:new ObjectId(id)}
    //     const result=await spotCollection.deleteOne(filter)
    //     res.send(result)
    // })

    // /* delete method with touristSPOt ======================*/
    // app.delete('/addSpot/:id',async(req,res)=>{

    //     const id=req.params.id;
    //     const filter={_id:new ObjectId(id)}
    //     const result=await spotCollection.deleteOne(filter)
    //     res.send(result)
    // })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

/* =====================COUNTRY=================== */

/* ====================================================================== */
app.get("/", (req, res) => {
  res.send("SOUTHEST SURBERIS RUNNIN");
});
app.listen(port, () => {
  console.log(`BULE BULE SOB SESH ${port}`);
});
