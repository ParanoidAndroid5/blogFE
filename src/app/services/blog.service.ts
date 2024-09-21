import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Blog {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  author: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private apiUrl = 'http://localhost:8080/api/posts'; 

  constructor(private http: HttpClient) { }

    getBlogs(): Observable<any> {
        return this.http.get(`${this.apiUrl}`);
    }

    getBlogById(id: number): Observable<Blog> {
        return this.http.get<Blog>(`${this.apiUrl}/${id}`);

        
      }
}
