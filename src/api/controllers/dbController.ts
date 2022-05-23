import { Request, Response } from "express";
import dbDAO from "../../dao/dbDAO";
import isUser from "../../utils/validators/isUser";
import isUserOwner from "../../utils/validators/isUserOwner";

export default class DBControllers {
  static async createDB(req: Request, res: Response) {
    try {
      if (!isUser(req.body.isAuth, req.body.userData)) {
        return res
          .status(403)
          .send(`you don't have the permission to create a DB`);
      }

      const { collectionName, username } = req.body.data;

      const dbExists = await dbDAO.doesCollectionExist(collectionName);

      if (dbExists) {
        return res
          .status(403)
          .send(`DB with name ${collectionName} already exists`);
      }

      await dbDAO.createCollection(collectionName, username);

      return res
        .status(200)
        .send(`collection ${collectionName} created successfully`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async insertOne(req: Request, res: Response) {
    try {
      if (!isUser(req.body.isAuth, req.body.userData)) {
        return res.status(403).send(`user doesn't have permission to insert`);
      }

      const { collectionName, doc } = req.body.data;

      const isOwner = isUserOwner(collectionName, req.body.userData);

      if (!isOwner) {
        return res.status(403).send(`user doesn't own this database`);
      }

      await dbDAO.insertOne(collectionName, doc);
      return res.status(200).send(`Doc successfully inserted`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async deleteOne(req: Request, res: Response) {
    try {
      if (!isUser(req.body.isAuth, req.body.userData)) {
        return res.status(403).send(`user doesn't have permission to insert`);
      }

      const { collectionName, docId } = req.body.data;

      const isOwner = isUserOwner(collectionName, req.body.userData);

      if (!isOwner) {
        return res.status(403).send(`user doesn't own this database`);
      }

      await dbDAO.deleteOne(collectionName, docId);
      return res.status(200).send(`Doc successfully deleted`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
