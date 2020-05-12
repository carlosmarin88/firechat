

export interface Mensaje {

    nombre: string;
    mensaje: string;
    // el signo de pregunta lo marca como opcional
    fecha?: number;
    uid?: string;
}
