import app from "./app.js";
import { port } from "./config.js";
import { connectToDb } from "./db.js";

async function main() {
  await connectToDb();

  app.listen(port);
  console.log('server on port: ', port);
  console.log('http://localhost:3000/');
}

main();




