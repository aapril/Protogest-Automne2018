import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';

export interface Task {
  id: number,
  name: string,
  desctiption: string,
  taskGroupId: number
}

export interface TaskGroup {
  id: number,
  name: string,
  description: string,
  eventId: number
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  addTaskGroup(taskGroup: TaskGroup) {
    return this.http.post<TaskGroup>(environment.taskApiUrl + "/taskGroup", taskGroup, httpOptions)
      .pipe(
        catchError((error:any) => {
          return throwError(error.statusText);
        })
      )
  }

  getTaskGroup(taskGroupId: number): Observable<TaskGroup> {
    return this.http.get<TaskGroup>(environment.taskApiUrl + `/taskGroup/${taskGroupId}`, httpOptions).pipe(catchError((error:any) => {
      return throwError(error.statusText)
    }))
  }

  updateTaskGroup(taskGroup: TaskGroup): Observable<TaskGroup> {
    return this.http.put<TaskGroup>(environment.taskApiUrl + `/taskGroup/${taskGroup.id}`, taskGroup, httpOptions).pipe(catchError((error:any) => {
      return throwError(error.statusText)
    }))
  }

  deleteTaskGroup(taskGroupId: number) {
    return this.http.delete(environment.taskApiUrl + `/taskGroup/${taskGroupId}`, httpOptions).pipe(catchError((error:any) => {
      return throwError(error.statusText)
    }))
  }

  getTaskGroupsFromEvent(eventId: number): Observable<TaskGroup[]> {
    return this.http.get<TaskGroup[]>(environment.taskApiUrl + "/taskGroup/all", { headers: httpOptions.headers, params: { eventId: eventId.toString() }}).pipe(catchError((error:any) => {
      return throwError(error.statusText);
    }))
  }

  addTask(task: Task) {
    return this.http.post<Task>(environment.taskApiUrl + '/task', task, httpOptions).pipe(catchError((error:any) => {
      return throwError(error.statusText)
    }))
  }

  getTask(taskId: number): Observable<Task> {
    return this.http.get<Task>(environment.taskApiUrl + '/task', { headers: httpOptions.headers, params: { id: taskId.toString() } }).pipe(catchError((error:any) => {
      return throwError(error.statusText)
    }))
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(environment.taskApiUrl + `/task/${task.id}`, task, httpOptions).pipe(catchError((error:any) => {
      return throwError(error.statusText)
    }))
  }

  deleteTask(taskId: number) {
    this.http.delete(`${environment.taskApiUrl}/task/${taskId}`, httpOptions).pipe(catchError((error:any) => {
      return throwError(error.statusText)
    }))
  }

  getTasksFromGroup(taskGroupId: number): Observable<Task[]> {
    return this.http.get<Task[]>(environment.taskApiUrl + '/task/all', { headers: httpOptions.headers, params: { taskGroupId: taskGroupId.toString() } }).pipe(catchError((error:any) => {
      return throwError(error.statusText)
    }))
  }

  
}
