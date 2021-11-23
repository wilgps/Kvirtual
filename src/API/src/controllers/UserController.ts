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
  public async Get(@Request() request: express.Request): Promise<IUser> {
    const kiko = request.headers.authorization;
    return null;
  }
}

interface UserInput {
  Id: number;
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
