import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap, of } from 'rxjs';
import { IAlumnos, ICursos, IInscripciones } from '../../models';
import { UsersService } from '../../servicios/usuarios.service';
import { InscrpcionesService } from '../../servicios/inscripciones.service';
import { CursosService } from '../../servicios/cursos.service';

@Component({
  selector: 'app-alumno-detalle',
  templateUrl: './alumno-detalle.component.html',
})
export class AlumnoDetalleComponent implements OnInit, OnDestroy {
  alumno: IAlumnos | undefined;
  cursos: ICursos[] = [];
  loading = false;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private alumnoService: UsersService,
    private inscripcionesService: InscrpcionesService,
    private cursosService: CursosService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    const alumnoId = this.activatedRoute.snapshot.params['id'];
    if (alumnoId) {
      const alumnoSubscription = this.alumnoService.getUsuarioById(alumnoId).subscribe({
        next: (alumno) => {
          this.alumno = alumno;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al obtener alumno:', err);
          this.loading = false;
        }
      });

      this.subscriptions.add(alumnoSubscription);
    }

    const cursosSubscription = this.inscripcionesService.obtenerCursosXAlumnoBy(alumnoId).pipe(
      switchMap((inscripciones) => {
        const cursoIds = inscripciones.map(inscripcion => inscripcion.courseId);
        return cursoIds.length > 0 ? this.cursosService.obtenerCursosPorIds(cursoIds) : of([]);
      })
    ).subscribe({
      next: (cursos: ICursos[]) => {
        this.cursos = cursos;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      }
    });
    this.subscriptions.add(cursosSubscription);
  }
  eliminarInscripcionById(studentId: string | undefined, courseId: string): void {
    if (studentId) {
      const deleteSubscription = this.inscripcionesService.eliminarInscripcion(studentId, courseId).subscribe({
        next: () => {
          this.cursos = this.cursos.filter(curso => curso.id !== courseId);
        },
        error: (err) => {
          console.error('Error al eliminar inscripción:', err);
        }
      });
      this.subscriptions.add(deleteSubscription);
    } else {
      console.error('El ID del alumno es indefinido');
    }
  }

  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
