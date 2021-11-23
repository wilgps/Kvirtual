import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import { ValidateError } from "tsoa";
import logger from "../configs/logger";


export const JsonErrorHandler = async (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ValidateError) {
    // const stError = JSON.stringify({msg:err?.message,stack: err?.stack,Fields:err?.Fields});
    // logger.log("error", stError);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
     logger.log("error", { msg: err?.message, stack: err?.stack });
    return res.status(500).json({
      message: err.message,
    });
  }
  next();
};
