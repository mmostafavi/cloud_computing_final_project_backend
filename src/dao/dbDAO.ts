import { MongoClient, Db, ObjectId } from "mongodb";
import UsersDAO from "./usersDAO";
// import _ from "lodash";
// import bcrypt from "bcryptjs";

let db: Db;

export default class DBDAO {
  static async injectDB(client: MongoClient) {
    db = await client.db("cloud_computing_final_project");
  }

  static async doesCollectionExist(collectionName: string) {
    try {
      const collections = await db.listCollections().toArray();

      const transformedNames = collections!.map((entry) => entry.name);

      return transformedNames.includes(collectionName);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async createCollection(collectionName: string, username: string) {
    try {
      await db.createCollection(collectionName);

      await UsersDAO.addDB(collectionName, username);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async insertOne(collectionName: string, doc: any) {
    try {
      const collection = await db.collection(collectionName);
      await collection.insertOne(doc);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async deleteOne(collectionName: string, docId: string) {
    try {
      const collection = await db.collection(collectionName);
      await collection.deleteOne({ _id: new ObjectId(docId) });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
