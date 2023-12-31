import jwt from "jsonwebtoken";
import {header} from "express-validator";

export default (req, res, next) => {
  const jwtToken = (req.headers.authorization || '').replace(/Bearer\s?/, "");

  if (jwtToken) {
    try {
      const decodedData = jwt.verify(jwtToken, "secretKeyForUser");

      req.userId = decodedData._id;
      next();

    } catch (error) {
      return res.status(403).json({
        message: "No access"
      });
    }
  } else {
    return res.status(403).json({
      message: "No access"
    });
  }
}