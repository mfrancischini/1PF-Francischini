export interface IUsuario {
    id: number;
    nombre: string;
    apellido: string;
    curso: string;
    email: string;
}

export interface ICursos {
    id: number;
    nombre: string;
    fecha_inicio: string;
    fecha_fin: string;
    duracion: string;
    profesor: string;
}