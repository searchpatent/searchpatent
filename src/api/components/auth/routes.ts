import express, { NextFunction, Request, Response } from "express";
import { auth } from "../../middleware/auth";
import joi from "joi";
const router = express.Router();

// passport username password login
import passport from "passport";
import { createUser } from "./controller";
router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "local",
    (err: any, user: Express.User, info: { message: any }) => {
      if (err) {
        return res.status(401).json({
          error: err,
        });
      }
      if (!user) {
        return res.status(401).json({
          error: info.message,
        });
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.status(401).json({
            error: err,
          });
        }
        return res.status(200).json({
          message: "Login successful!",
        });
      });
    }
  )(req, res, next);
});

router.post("/logout", (req: Request, res: Response, next: NextFunction) => {
  req.logout();
  res.status(200).json({
    message: "Logout successful!",
  });
});

const registerSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
  email: joi.string().email().required(),
});

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = registerSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        error: error.message.split(". "),
      });
    }
    try {
      await createUser(value.username, value.password, value.email);
      return res.status(200).json({
        message: "Registration successful!",
        httpStatus: 200,
      });
    } catch (error: any) {
      if (error.code === "P2002") {
        return res.status(400).json({
          error: "Username or email already taken!",
        });
      }
    }
  }
);

export default router;
function removeTrailingslash(url: string) {
  return url.replace(/\/$/, "");
}
