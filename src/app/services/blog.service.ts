import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../models/blog';



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
    
  likePost(postId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${postId}/like`, {});
  }
  
  createBlogPost(blog: Blog): Observable<any> {
    return this.http.post(`${this.apiUrl}`, blog);
  }
  searchByName(name: string): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.apiUrl}/search/${name}`);
  }
   
  deleteBlogPost(postId: number, adminUserId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${postId}?adminUserId=${adminUserId}`);
  }
  updateBlogPost  (postId: number, updatedPost: Blog): Observable<Blog> {
    return this.http.put<Blog>(`${this.apiUrl}/${postId}`, updatedPost);
  }
}
