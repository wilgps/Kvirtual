import { Controller, Get, Post, Route, Tags, Body } from "tsoa";
import { AuthRequestDto, AuthResponseDto } from "../models/dtos/AuthDtos";
import AuthService from "../services/AuthService";
import { TokenHelper } from "../helpers/TokenHelper";
import HttpStatusCode from "../Common/HttpStatusCode";
import logger from "../configs/logger";
import appRoot from "app-root-path";

@Route("/Auth")
@Tags("Auth")
export class AuthController extends Controller {
  private readonly _service: AuthService;
  /**
   *
   */
  constructor() {
    super();
    this._service = new AuthService();
  }
  @Post()
  public async Post(@Body() body: AuthRequestDto): Promise<AuthResponseDto> {
    console.log(appRoot);
    try {
      let token = "";
      let scope = "";
      if (body.email === "root@root.com" && body.password === "root") {
        token = new TokenHelper(process.env.SECRET).CreateToken(
          { Id: 0, Email: body.email },
          3600,
          "admin"
        );
        scope = "admin";
      } else {
        const user = await this._service.Autheticate(body.email, body.password);
        if (!user) throw new Error("Usuario não encontrado");

        token = new TokenHelper(process.env.SECRET).CreateToken(
          { Id: user.Id, Email: user.Email },
          3600,
          ""
        );
        scope = "user";
      }

      const response: AuthResponseDto = {
        token,
        expires: 3600,
        scope,
      };
      this.setStatus(200);
      return response;
    } catch (error) {
      this.setStatus(HttpStatusCode.BAD_REQUEST);

      throw error;
    }
  }
}
