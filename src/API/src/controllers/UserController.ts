import UserService from "../services/UserServices";

import {
  Body,
  Controller,
  Get,
  Path,
  Request,
  Post,
  Query,
  Route,
  Response,
  Security,
  SuccessResponse,
  Tags,
} from "tsoa";
import { IUser } from "../models/user";
import express from "express";
import { TokenHelper } from "../helpers/TokenHelper";

@Route("/user")
@Tags("User")
export class UserController extends Controller {
  @Get("/{userId}")
  @Security("bearer")
  public async getUser(
    @Path() userId: number,
    @Query() name?: string
  ): Promise<UserResponse> {
    return {} as UserResponse;
  }

  @SuccessResponse("200", "Created") // Custom success response
  @Post()
  public async Post(@Body() requestBody: UserInput): Promise<void> {
    new UserService().AddUser(requestBody);
  }

  @Get()
  public async Get(@Request() req: express.Request): Promise<IUser> {
    const id = new TokenHelper(process.env.SECRET).GetPayload(
      req.headers.authorization,
      "Id"
    );
    return new UserService().GetUserById(id);
  }
}

interface UserInput {
  Id?: number;
  Name: string;
  Email: string;
  Password: string;
}

interface UserResponse {
  Id: number;
  Name: string;
  Email: string;
  Password: string;
}
