export interface UserInterface {
  tipo_documento: string,
  num_documento: number,
  nombres: string,
  apellidos: string,
  email: string,
  celular: number,
  direccion: string,
  menor_edad: boolean,
  apoderado?: string,
  id_tipo_usuario: number,
}
