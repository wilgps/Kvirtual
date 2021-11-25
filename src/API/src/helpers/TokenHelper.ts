import jwt from "jsonwebtoken";
export class TokenHelper {
  private _key: string;
  constructor(secureKey: string) {
    this._key = secureKey;
  }
  public CreateToken(
    body: object,
    expires: string | number = 300,
    scope: string
  ): string {
    const token = jwt.sign({ ...body, scope }, this._key, {
      expiresIn: 300, // expires in 5min
    });
    return token;
  }
  public GetPayload(strtoken: string, key: string): any {
    const bearer = strtoken.split(" ");
    const token = bearer[1];

    const decode: any = jwt.decode(token);
    return decode[key];
  }
}
