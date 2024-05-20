import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, finalize } from 'rxjs';
import { IAlumnos, ICursos, IInscripciones, IUsuario } from '../../models';
import { CursosService } from '../../servicios/cursos.service';
import { InscrpcionesService } from '../../servicios/inscripciones.service';
import { UsersService } from '../../servicios/usuarios.service';
import { LoginService } from '../../login/login-service';

@Component({
  selector: 'app-cursos-detalle',
  templateUrl: './cursos-detalle.component.html',
})
export class CursoDetalleComponent implements OnInit, OnDestroy {
  curso: ICursos | undefined;
  alumnos: IAlumnos[] | undefined;
  inscripciones: IInscripciones[] | undefined;
  _user$: Observable<IUsuario | null>;
  userSuscription?: Subscription;
  authUserSinPipe: IUsuario | null = null;

  loading = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cursoService: CursosService,
    private alumnoService: UsersService,
    private inscripcionesService: InscrpcionesService,
    private loguin : LoginService
  ) {


    this._user$ = this.loguin.authUser$;

  }

  ngOnInit(): void {

    this.userSuscription = this.loguin.authUser$.subscribe({
      next: (user) => {
        this.authUserSinPipe = user;
      },
    });

    const alumnosSubscription = this.alumnoService.getUsuarios().subscribe(data => {
      this.alumnos = data;
    });
    this.subscriptions.push(alumnosSubscription);



    const inscripcionesSubscription = this.inscripcionesService.obtenerClases().subscribe(data => {
      this.inscripciones = data;
    });
    this.subscriptions.push(inscripcionesSubscription);


    this.loading = true;
    const cursoId = this.activatedRoute.snapshot.params['id'];
    if (cursoId) {
    const cursoSubscription = this.cursoService
      .obtenerCursoById(cursoId)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (curso) => {
          this.curso = curso;
        },
        error: (err) => {
          console.error('Error al obtener curso:', err);
        }
      });


    this.subscriptions.push(cursoSubscription);
  }
  }
  getAlumnosNombresPorCurso(id_curso: string): { id: string, nombre: string , apellido: string}[] {
    if (!this.alumnos || !this.inscripciones) {
      return [{ id: 'Desconocido', nombre: 'Desconocido', apellido: 'Desconocido'}];
    }
  
    const inscripcionesEnCurso = this.inscripciones.filter(inscripcion => inscripcion.courseId === id_curso);
  
    const alumnosEnCurso = this.alumnos.filter(alumno => 
      inscripcionesEnCurso.some(inscripcion => inscripcion.studentId === alumno.id)
    );
  
    return alumnosEnCurso.map(alumno => ({ id: alumno.id, nombre: alumno.nombre , apellido: alumno.apellido}));
  }
  
  eliminarInscripcionById(id_alumno: string, id_curso: string): void {
    const inscripcion = this.inscripciones?.find(inscripcion => inscripcion.studentId === id_alumno && inscripcion.courseId === id_curso);
    if (!inscripcion) {
      console.error('Inscripción no encontrada');
      return;
    }
  
    this.inscripcionesService.eliminarInscripcionByID(inscripcion.id).subscribe(() => {
      this.inscripciones = this.inscripciones?.filter(insc => insc.id !== inscripcion.id);
    }, error => {
      console.error('Error al eliminar la inscripción:', error);
    });
  }
  
  

  

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.userSuscription?.unsubscribe();
  }
}
