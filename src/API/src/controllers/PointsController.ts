import { Route, Controller, Tags, Get, Post } from "tsoa";
@Route("MathGame")
@Tags("MathGame")
export class PointsController extends Controller {
  @Get()
  public async Get(): Promise<void> {
    this.setStatus(200);
  }
}
