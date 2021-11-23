import { Route, Controller, Tags, Get, Post, Security, Body } from "tsoa";
import { VerbRequest, VerbResponse } from "../models/dtos/VerbsDtos";
import { VerbService } from "../services/VerbService";

@Route("verb")
@Tags("verb")
export class VerbController extends Controller {
  @Get()
  public async Get(): Promise<VerbResponse[]> {
    const verbs = await new VerbService().ListVerbs();
    const response = verbs.map((x) => {
      return { Id: x.Id, Verb: x.Verb };
    });
    return response;
  }

  @Post()
  public async Post(@Body() body: VerbRequest[]): Promise<void> {
    await new VerbService().AddOrUpdate(body);
  }
}
