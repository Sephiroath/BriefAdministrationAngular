import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Project } from "../../Models/Job/Project";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class ProjectService {
  private projectUrl = environment.ApiUrl + "/project";
  constructor(private http: HttpClient) { }
  getProjects (): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectUrl)
      .pipe(
        tap(heroes => this.log(`fetched heroes`)),
        catchError(this.handleError('getHeroes', []))
      )
  }

  getProjectNo404<Data>(id: number): Observable<Project> {
    const url = `${this.projectUrl}/?id=${id}`;
    return this.http.get<Project[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Project>(`getHero id=${id}`))
      );
  }

  /** PUT: update the hero on the server */
  updateHero (project: Project): Observable<any> {
    return this.http.put(this.projectUrl, project, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${project.ProjectId}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: add a new hero to the server */
  addProject (project: Project): Observable<Project> {
    return this.http.post<Project>(this.projectUrl, project, httpOptions).pipe(
      tap((project: Project) => this.log(`added hero w/ id=${project.ProjectId}`)),
      catchError(this.handleError<Project>('addHero'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log(message: string) {
  }
}
