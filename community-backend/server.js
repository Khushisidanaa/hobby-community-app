import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import Cards from "./dbCards.js";

//App Config
const app = express();
const port = process.env.PORT || 8001;
const connection_url =
  "mongodb+srv://admin:I85oJKoJl7rvBoRu@cluster0.gulitgd.mongodb.net/?retryWrites=true&w=majority";

//Middlewares
app.use(express.json());
app.use(Cors());

//DB Config
mongoose.connect(
  connection_url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  console.log("Successfully commected!")
);

//API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello World !!"));

app.post("/community/cards", async (req, res) => {
  try {
    const dbCard = req.body;
    const createdCard = await Cards.create(dbCard);
    res.status(201).send(createdCard);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/community/cards", async (req, res) => {
  try {
    const data = await Cards.find().exec();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));

//password is yHSPAVmzvfbnIGXZ
