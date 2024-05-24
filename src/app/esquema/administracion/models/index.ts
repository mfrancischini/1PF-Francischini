export interface IAlumnos {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
}

export interface ICursos {
    id: string;
    nombre_curso: string;
    profesor: string;
    fecha_cursada: string;
    horario: string;
}
export interface IInscripciones {
    id: string;
    studentId: string;
    courseId: string;
    profesor: string;
    fecha_cursada?: string;
    horario?: string;
}




export interface IUsuario {
    id: string;
    nombre: string;
    password: string;
    role: string;
}


export interface IDatosLogin {
    username: string | null;
    password: string | null;
}

export interface ICreateAlumnosPayload {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
}


export interface ICreateAdminPayload {
    id: string;
    usuario: string;
    password: string;
    role: string;
}



export interface ICreateCursosPayload {

    nombre_curso: string;
    profesor: string;
    fecha_cursada: string;
    horario: string;
}

export interface ICreateInscripcionesPayload {

    studentId: string;
    courseId: string;
    profesor: string;
    fecha_cursada?: string;
    horario?: string;

}

