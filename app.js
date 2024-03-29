import express from "express";
import questionRouter from "./apps/questions.js";
import { client } from "./utils/db.js";

async function init() {
  await client.connect();
  const app = express();
  const port = 4000;
  //conect Database
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //use questionRouter
  app.use("/questions", questionRouter);

  app.get("/", (req, res) => {
    return res.json("Hello Skill Checkpoint #2");
  });

  app.get("*", (req, res) => {
    return res.status(404).json("Not found");
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

init();
