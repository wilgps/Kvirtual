import { IVerbs } from "../Verbs";

export interface VerbResponse extends IVerbs {}
export interface VerbRequest {
  Id?: number;
  Verb: string;
}
