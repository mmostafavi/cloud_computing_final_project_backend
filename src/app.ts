import { MongoClient, ServerApiVersion } from "mongodb";
import UsersDAO from "./dao/usersDAO";
import app from "./server";

const PORT = process.env.PORT || 8000;

const uri = process.env.MONGODB_URI as string;

MongoClient.connect(uri, { serverApi: ServerApiVersion.v1 })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })

  .then(async (client) => {
    // *: inject client to DAOs here
    await UsersDAO.injectDB(client);
    // *: inject client to DAOs here

    app.listen(PORT, () => {
      console.log(`listening on http://localhost:${PORT}`);
    });
  });
