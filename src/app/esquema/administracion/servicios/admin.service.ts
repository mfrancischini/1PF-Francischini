import { Injectable } from '@angular/core';
import { ICreateAdminPayload, IUsuario } from '../models';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  obtenerAdmin(): Observable<IUsuario[]> {
   return this.http.get<IUsuario[]>(environment.baseAPIURL + '/admin');

  }

  createAdmin(payload: ICreateAdminPayload): Observable<IUsuario> {
    return this.http.post<IUsuario>(environment.baseAPIURL + '/admin', payload)
  
  }

  updateAdmin(id: string, payload: ICreateAdminPayload): Observable<IUsuario> {
    return this.http.put<IUsuario>(`${environment.baseAPIURL}/admin/${id}`, payload);
  }

  deleteAdmin(id: string): Observable<IUsuario> {
    return this.http.delete<IUsuario>(`${environment.baseAPIURL}/admin/${id}`)
  }

  
}