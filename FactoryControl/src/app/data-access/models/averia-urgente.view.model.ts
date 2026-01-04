import { AveriaUrgente } from './averia-urgente.model';

export interface AveriaUrgenteView extends AveriaUrgente {

  // Máquina
  maquina_nombre?: string;
  maquina_ubicacion?: string;

  // Técnico asignado
  tecnico_nombre?: string;
  tecnico_apellidos?: string;

  // Denunciante
  denunciante_nombre?: string;
  denunciante_apellidos?: string;
}
