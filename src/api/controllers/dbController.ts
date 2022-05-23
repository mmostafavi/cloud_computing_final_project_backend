import { Request, Response } from "express";
import dbDAO from "../../dao/dbDAO";
import isUser from "../../utils/validators/isUser";

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
}
