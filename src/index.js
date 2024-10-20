import app from "./app.js";
import { port } from "./config.js";
import { connectToDb } from "./db.js";

async function main() {
  await connectToDb();

  app.listen(8080);
  console.log('server on port: ', 8080);
  console.log('http://localhost:3000/');
}

main();




