import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const questionRouter = Router();

questionRouter.get("/", async (req, res) => {
  try {
    const collection = db.collection("questions");
    const allQuestion = await collection.find().toArray();
    return res.json({ data: allQuestion });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

questionRouter.post("/", async (req, res) => {
  try {
    const collection = db.collection("questions");

    const questionData = { ...req.body, created_at: new Date() };

    const newQuestionData = await collection.insertOne(questionData);
    return res.json({
      message: `Question Id ${newQuestionData.insertedId} has been created successfully`,
      data: questionData,
    });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});
questionRouter.put("/:id", async (req, res) => {
  try {
    const collection = db.collection("questions");

    const newQuestionData = { ...req.body, modified_at: new Date() };

    const questionId = new ObjectId(req.params.id);

    await collection.updateOne(
      {
        _id: questionId,
      },
      {
        $set: newQuestionData,
      }
    );
    return res.json({
      message: `Movie record ${questionId} has been updated successfully`,
    });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

questionRouter.delete("/:id", async (req, res) => {
  try {
    const collection = db.collection("questions");
    const questionId = new ObjectId(req.params.id);

    await collection.deleteOne({ _id: questionId });

    return res.json({
      message: `Question Id  ${questionId} has been deleted successfully`,
    });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});
export default questionRouter;
