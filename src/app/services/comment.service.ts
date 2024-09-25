import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseUrl = 'http://localhost:8080/api/comments';  

  constructor(private http: HttpClient) { }

  
  getCommentsByPostId(postId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${postId}`);
  }

  
  createComment(comment: Comment): Observable<any> {
    const params = new HttpParams()
      .set('postId', comment.postId.toString())
      .set('postedBy', comment.postedBy);

    return this.http.post(this.baseUrl + '/create', comment.content, { params });
  }

  deleteComment(commentId: number, adminUserId: number): Observable<void> {
    const params = new HttpParams().set('adminUserId', adminUserId.toString());
    return this.http.delete<void>(`${this.baseUrl}/${commentId}`, { params });
  }
}