import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, finalize } from 'rxjs';
import { IAlumnos, ICursos, IInscripciones } from '../../models';
import { CursosService } from '../../servicios/cursos.service';
import { InscrpcionesService } from '../../servicios/inscripciones.service';
import { UsersService } from '../../servicios/usuarios.service';

@Component({
  selector: 'app-cursos-detalle',
  templateUrl: './cursos-detalle.component.html',
})
export class CursoDetalleComponent implements OnInit, OnDestroy {
  curso: ICursos | undefined;
  alumnos: IAlumnos[] | undefined;
  inscripciones: IInscripciones[] | undefined;

  loading = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cursoService: CursosService,
    private alumnoService: UsersService,
    private inscripcionesService: InscrpcionesService
  ) {}

  ngOnInit(): void {

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
  getAlumnosNombresPorCurso(id_curso: string): { id: string, nombre: string }[] {
    if (!this.alumnos || !this.inscripciones) {
      return [{ id: 'Desconocido', nombre: 'Desconocido' }];
    }
  
    const inscripcionesEnCurso = this.inscripciones.filter(inscripcion => inscripcion.id_curso === id_curso);
  
    const alumnosEnCurso = this.alumnos.filter(alumno => 
      inscripcionesEnCurso.some(inscripcion => inscripcion.id_alumno === alumno.id)
    );
  
    return alumnosEnCurso.map(alumno => ({ id: alumno.id, nombre: alumno.nombre }));
  }
  
  eliminarInscripcionById(id_alumno: string, id_curso: string): void {
    const inscripcion = this.inscripciones?.find(inscripcion => inscripcion.id_alumno === id_alumno && inscripcion.id_curso === id_curso);
    if (!inscripcion) {
      console.error('Inscripción no encontrada');
      return;
    }
  
    this.inscripcionesService.eliminarInscripcionByID(inscripcion.id).subscribe(() => {
      // Eliminar la inscripción de la lista
      this.inscripciones = this.inscripciones?.filter(insc => insc.id !== inscripcion.id);
    }, error => {
      console.error('Error al eliminar la inscripción:', error);
    });
  }
  
  

  

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
