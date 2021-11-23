export interface AuthRequestDto {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  token: string;
  expires: number;
  scope: string;
}
