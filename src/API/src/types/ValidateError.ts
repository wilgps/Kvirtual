export class ValidateError extends Error {
  public Fields: string[] = [];
  constructor(message: string) {
    super(message); // (1)
    this.name = "ValidationError"; // (2)
  }
}
