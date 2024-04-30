
const express = require("express");

const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = 5000;
//miidle ware
app.use(cors());
app.use(express.json());

/* firebase deplay with envfile */
require('dotenv').config()



//========COLLECTION==============

/* ====================================================================== */

const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster1.phei2xm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`;

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
    const internationlCollections = client.db("addSpotDB").collection("internationalSpot");

/* get internarion data */
app.get('/getAllInternationalData',async(req,res)=>{
    const cursor= await internationlCollections.find()
    const result=await cursor.toArray()
    res.send(result)

})



/* get data */
app.get('/allSpot',async(req,res)=>{
    const cursor= await spotCollection.find()
    const result=await cursor.toArray()
    res.send(result)

})

/* view detail================ */
app.get("/viewDetail/:id",async (req,res)=>{

    const result=await spotCollection.findOne({_id: new ObjectId(req.params.id)})
    console.log(result)
    res.send(result)
})

/* al ALLL  data store */
app.post("/allSpot", async (req, res) => {
     console.log(req.body);
     const result = await spotCollection.insertOne(req.body);

     console.log(result);
     res.send(result);
   });




/* post methdo MY LIST 🚩✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅ */
    app.post("/addTourism", async (req, res) => {
     // console.log(req.body);
      const result = await spotCollection.insertOne(req.body);

     // console.log(result);
      res.send(result);
    });

    /* get method mylislt ============*/
    app.get("/myList/:email", async (req, res) => {
      //console.log(req.params.email);
      const result = await spotCollection
        .find({ email: req.params.email })
        .toArray();
      res.send(result);
    });

    /* single update dataat ==================*/

    app.get("/singleUpdate/:id", async (req, res) => {
      const result = await spotCollection.findOne({
        _id: new ObjectId(req.params.id),
      });
      //console.log(result);
      res.send(result);
    });

    /* update ======================= */
    app.put("/AllUpdate/:id", async (req, res) => {
      //console.log(req.params.id);
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
      const result=await spotCollection.updateOne(quary,data)
      console.log(result)
      res.send(result)
    });


/* delelte */
app.delete("/delete/:id",async (req,res)=>{

    const id=req.params.id;
      const filter={_id:new ObjectId(id)}
      const result=await spotCollection.deleteOne(filter)
      res.send(result)


})




    /* ==============v✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅============ */

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
