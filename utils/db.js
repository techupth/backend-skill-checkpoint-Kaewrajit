// Todo: Setup database connection here
import { MongoClient } from "mongodb";

// MongoDB จะมี Url ให้เราทำการเชื่อมต่อ
// โดยปกติแล้ว Url จะอยู๋ในรูปแบบ `mongodb://url:port`
const connectionString = "mongodb://localhost:27017";

export const client = new MongoClient(connectionString, {
  useUnifiedTopology: true, // เป็นการใช้ Connection management engine ตัวใหม่
});

// กำหนดให้ DB ที่จะใช้งานคือ "practice-mongo"
export const db = client.db("practice-mongo");
