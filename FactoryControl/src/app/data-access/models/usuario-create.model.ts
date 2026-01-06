import { RolUsuario } from './usuario.model';

export interface UsuarioCreate {
  numero_empresa: string;
  nombre: string;
  apellidos: string;
  correo: string;

  /** Contraseña para crear el usuario (backend hashea) */
  contrasena: string;

  rol: RolUsuario;

  estado_disponible?: boolean;
  imagen?: string | null;
}
