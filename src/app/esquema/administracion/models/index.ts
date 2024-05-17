export interface IAlumnos {
    id: string;
    nombre: string;
    apellido: string;
    curso: string;
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
    id_alumno: string;
    id_curso: string;
    profesor: string;
    fecha_cursada: string;
    horario: string;
}



export interface IUsuario {
    id: string;
    nombre: string;
    email: string;
    role: string;
}


export interface IDatosLogin {
    username: string | null;
    password: string | null;
  }

  export interface ICreateAlumnosPayload{
    id: string;
    nombre: string;
    apellido: string;
    curso: string;
    email: string;
  }