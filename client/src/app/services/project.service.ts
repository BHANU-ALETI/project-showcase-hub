// client/src/app/services/project.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  // The base URL for all our backend API calls
  private apiUrl = 'https://project-hub-api.onrender.com/api';
  constructor(private http: HttpClient) {}

  // GET public, approved projects
  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/projects`);
  }

  // POST a new project for submission
  addProject(projectData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/projects`, projectData);
  }

  // GET admin, pending projects
  getPendingProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/pending`);
  }

  // PUT approve a project
  approveProject(projectId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/approve/${projectId}`, {});
  }

  // DELETE reject a project
  rejectProject(projectId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/reject/${projectId}`);
  }
}
