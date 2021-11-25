export interface IPointResponse {
  Id?: number;
  UserId: number;
  Points: number;
  GameName: string;
}
export interface IPointRequest {
  Id?: number;
  Points: number;
  GameName: string;
}
