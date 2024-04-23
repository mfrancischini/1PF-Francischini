export interface IUsuario {
    id: number;
    nombre: string;
    apellido: string;
    curso: string;
    email: string;
}


export interface IClases {
    id_clase: number;
    id_curso: number;
    nombre_clase: string;
    profesor: string;
    fecha_cursada: string;
    horario: string;
}

export interface ICursos {
    id_curso: number;
    nombre_curso: string;
    profesor: string;
    fecha_cursada: string;
    horario: string;
}