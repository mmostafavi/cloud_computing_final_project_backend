import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import usersDAO from "../../dao/usersDAO";
// import isUser from "../../utils/validators/isUser";

export default class AuthControllers {
  static async userSignIn(req: Request, res: Response) {
    try {
      const { username, password } = req.body.data;

      // ----------------------------------------------------------
      // password validation
      // here....
      // password validation
      // ----------------------------------------------------------

      const userExist = await usersDAO.doesUserExist(username);

      if (!userExist.exists) {
        res.status(403).send(`User with username '${username}' does not exist`);
      } else {
        const isPasswordCorrect = await bcrypt.compare(
          password,
          userExist.user!.password,
        );

        if (isPasswordCorrect) {
          const token = jwt.sign(
            {
              userType: "user",
              username,
              userId: userExist.user!._id.toString(),
              fName: userExist.user!.fName,
              lName: userExist.user!.lName,
            },
            process.env.JWT_KEY!,
            {
              expiresIn: "1h",
            },
          );

          res.json({
            ...userExist.user!,
            token,
            password: null,
          });
        } else {
          res.status(403).send(`password is incorrect`);
        }
      }
    } catch (err) {
      console.error(`Failed at userSignIn. error: ${err}`);
      res.status(500).send(err);
      throw err;
    }
  }

  static async userSignup(
    req: Request,
    res: Response,
    // next: NextFunction,
  ) {
    try {
      const { adminPassword, username, password, fName, lName } = req.body.data;

      // ----------------------------------------------------------
      // password validation
      if (adminPassword !== process.env.APP_PASSWORD) {
        return res
          .status(403)
          .send("this user doesn't have permission for this action");
      }
      // password validation
      // ----------------------------------------------------------

      // checking for availability of user
      const userExist = await usersDAO.doesUserExist(username);

      if (!userExist.exists) {
        await usersDAO.createUser(username, password, fName, lName);
        return res
          .status(200)
          .send(`User with username of ${username} created`);
      }

      return res
        .status(500)
        .send(`user with username of ${username} already exists`);
    } catch (error) {
      console.error(`Failed at userSignUp. error: ${error}`);
      res.status(500).send(error);
      throw error;
    }
  }
}
