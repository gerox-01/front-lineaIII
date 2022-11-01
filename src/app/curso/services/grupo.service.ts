import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GrupoService {
  private AppUrl = environment.AppUrl;
  private ApiUrl = '/api/Grupo'
  // constructor(private firestore: AngularFirestore) {}
  constructor(private http: HttpClient) { }

  getListGrupos(): Observable<any> {
    const Urls = `${this.AppUrl}${this.ApiUrl}`
    return this.http.get<any>(Urls).pipe(
      tap(row => this.log('fetched ModuleDTO')),
      catchError((error) => this.handleError('getModuleDTOList', error))
    );
  }

  deleteGrupo(id: number): Observable<any> {
    const sUrl = `${this.AppUrl}${this.ApiUrl}/${id}`;

    return this.http.delete(sUrl).pipe(
      tap(_ => this.log(`filter SimGrupo id=${id}`)),
      catchError((error) => this.handleError("deleteSimGrupo", error))
    );
  }

  saveGrupo(grupo: any): Observable<any> {
    return this.http.post(this.AppUrl + this.ApiUrl, grupo);
  }

  updateGrupo(id: number, grupo: any): Observable<any> {
    const sUrl = `${this.AppUrl}${this.ApiUrl}/${id}`;
    return this.http.put(sUrl, grupo);
  }
  private handleError(operation = "operation", result?: any) {

    // TODO: send the error to remote logging infrastructure
    console.error(result.message); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${result.message}`);

    // Let the app keep running by returning an empty result.
    return of(result);
  }
  /** Log a TipoSuscripcionService message with the MessageService */
  private log(message: string) {
    // this.messageService.add(`TipoSuscripcionService: ${message}`);
    console.log(`TipoSuscripcionService: ${message}`);
  }
}
