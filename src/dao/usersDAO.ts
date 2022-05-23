import { MongoClient, Db, Collection } from "mongodb";
import _ from "lodash";
import bcrypt from "bcryptjs";

let db: Db;
let usersCollection: Collection;

export default class UsersDAO {
  static async injectDB(client: MongoClient) {
    db = await client.db("cloud_computing_final_project");
    usersCollection = await db.collection("users");
  }

  static async doesUserExist(username: string) {
    try {
      const fetchedUser = await usersCollection.findOne({ username });

      return {
        exists: !_.isNil(fetchedUser),
        user: fetchedUser,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async createUser(
    username: string,
    password: string,
    fName: string,
    lName: string,
  ) {
    try {
      const hashedPassword = await bcrypt.hash(password, 12);

      await usersCollection.insertOne({
        username,
        password: hashedPassword,
        fName,
        lName,
        dbs: [],
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async addDB(collectionName: string, username: string) {
    try {
      await usersCollection.updateOne(
        { username },
        { $push: { dbs: collectionName } },
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
