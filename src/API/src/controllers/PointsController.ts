import express from "express";
import { Route, Controller, Tags, Get, Post, Body, Request,Query } from "tsoa";
import { TokenHelper } from "../helpers/TokenHelper";
import { IPointRequest, IPointResponse } from "../models/dtos/point";
import PointService from "../services/PointService";
@Route("/Points")
@Tags("Points")
export class PointsController extends Controller {
  @Get()
  public async Get(@Query() game: string): Promise<IPointResponse[]> {
    const result = await new PointService().ListRank(game);
    return result;
  }

  @Post()
  public async Post(
    @Request() req: express.Request,
    @Body() body: IPointRequest
  ): Promise<IPointResponse> {
    const point = await new PointService().AddOrUpdate({
      ...body,
      UserId: new TokenHelper(process.env.SECRET).GetPayload(
        req.headers.authorization,
        "Id"
      ),
    });
    return {
      Id: point.Id,
      UserId: point.UserId,
      Points: point.Points,
      GameName: point.GameName,
    };
  }
}
