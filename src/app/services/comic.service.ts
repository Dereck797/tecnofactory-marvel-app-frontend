import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComicService {
  private apiUrl = 'https://tecnofactory-marvel-app-backend-production.up.railway.app/api/comics';

  constructor(private http: HttpClient) { }

  getComics(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(this.apiUrl, { headers });
  }

  getComicById(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${this.apiUrl}/${id}`, { headers });
  }

  addFavoriteComic(comic: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });
    return this.http.post('https://tecnofactory-marvel-app-backend-production.up.railway.app/api/favorites', comic, { headers });
  }

  getFavoriteComics(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get('https://tecnofactory-marvel-app-backend-production.up.railway.app/api/favorites', { headers });
  }
}
