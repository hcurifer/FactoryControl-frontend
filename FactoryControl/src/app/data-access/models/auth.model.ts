export interface LoginRequest {
  numero_empresa: string;
  password: string;
}

export interface LoginUser {
  id_usuario: number;
  nombre: string;
  apellidos: string;
  rol: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: 'bearer';
  user: LoginUser;
}
