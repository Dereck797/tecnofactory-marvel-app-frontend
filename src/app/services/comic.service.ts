import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComicService {
  private apiUrl = environment.apiUrl+'/comics';

  constructor(private http: HttpClient) { }

  getComics(limit: number, offset: number): Observable<any> {
    const cacheKey = `comics-${limit}-${offset}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    const cachedResponse = localStorage.getItem(cacheKey);
    if (cachedResponse) {
      return of(JSON.parse(cachedResponse));
    }

    return this.http.get(`${this.apiUrl}?limit=${limit}&offset=${offset}`, { headers }).pipe(
      tap(response => localStorage.setItem(cacheKey, JSON.stringify(response)))
    );
  }

  getComicById(id: string): Observable<any> {
    const cacheKey = `comic-${id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    const cachedResponse = localStorage.getItem(cacheKey);
    if (cachedResponse) {
      return of(JSON.parse(cachedResponse));
    }

    return this.http.get(`${this.apiUrl}/${id}`, { headers }).pipe(
      tap(response => localStorage.setItem(cacheKey, JSON.stringify(response)))
    );
  }

  addFavoriteComic(comic: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });
    return this.http.post('https://tecnofactory-marvel-app-backend-production.up.railway.app/api/favorites', comic, { headers });
  }

  removeFavoriteComic(comicId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.delete('https://tecnofactory-marvel-app-backend-production.up.railway.app/api/favorites', {
      headers,
      body: { comicId }
    });
  }

  getFavoriteComics(): Observable<any> {
    const cacheKey = `favorite-comics`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get('https://tecnofactory-marvel-app-backend-production.up.railway.app/api/favorites', { headers }).pipe(
      tap(response => {
        if (response && Array.isArray(response) && response.length > 0) {
          localStorage.setItem(cacheKey, JSON.stringify(response));
        }
      })
    );
  }
}
