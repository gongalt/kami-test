import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post, Album, Photo, User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getPosts(
    page: number = 1,
    limit: number = 10,
    searchTerm: string = '',
    sortField: string = '',
    sortDirection: string = ''
  ): Observable<Post[]> {
    let params = new HttpParams()
      .set('_page', page.toString())
      .set('_limit', limit.toString());

    if (searchTerm) {
      params = params.set('q', searchTerm);
    }

    if (sortField && sortDirection) {
      params = params.set('_sort', sortField).set('_order', sortDirection);
    }

    return this.http.get<Post[]>(`${this.baseUrl}/posts`, { params });
  }

  getPost(id: string | null): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/posts/${id}`);
  }

  getAlbums(
  page: number = 1,
  limit: number = 10,
  searchTerm: string = '',
  sortField: string = '',
  sortDirection: string = ''
): Observable<Album[]> {
  let params = new HttpParams()
    .set('_page', page.toString())
    .set('_limit', limit.toString());

  if (searchTerm) {
    params = params.set('q', searchTerm);
  }

  if (sortField && sortDirection) {
    params = params.set('_sort', sortField).set('_order', sortDirection);
  }

  return this.http.get<Album[]>(`${this.baseUrl}/albums`, { params });
}

  getAlbum(id: string | null): Observable<Album> {
    return this.http.get<Album>(`${this.baseUrl}/albums/${id}`);
  }

  getPhotos(page: number = 1, limit: number = 10): Observable<Photo[]> {
    const params = new HttpParams()
      .set('_page', page.toString())
      .set('_limit', limit.toString());

    return this.http.get<Photo[]>(`${this.baseUrl}/photos`, { params });
  }

  getPhoto(id: number): Observable<Photo> {
    return this.http.get<Photo>(`${this.baseUrl}/photos/${id}`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }

}
