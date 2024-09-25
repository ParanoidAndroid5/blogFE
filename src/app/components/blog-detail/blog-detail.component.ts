import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog';
import { Comment } from '../../models/comment';
import { CommentService } from 'src/app/services/comment.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  blog: Blog | undefined;
  blogId!: number;
  comments: Comment[] = [];
  isLoadingComments = true;

  newCommentContent: string = '';  
  newCommentPostedBy: string = '';  


  currentUserId!: number;
  isAdminUser = false;  

  @Input() id!: number;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private commentService: CommentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const blogId = this.route.snapshot.paramMap.get('id');

    this.currentUserId = this.authService.getCurrentUserId();
    this.isAdminUser = this.authService.isAdmin();

    
    if (blogId) {
      this.blogId = +blogId;

      this.blogService.getBlogById(this.blogId).subscribe(
        (data: Blog) => {
          this.blog = data;
        },
        (error) => {
          console.error('Blog detayı yüklenemedi:', error);
        }
      );

      this.loadComments(this.blogId);
    }
  }

  
  loadComments(postId: number) {
    this.commentService.getCommentsByPostId(postId).subscribe(
      (data: Comment[]) => {
        this.comments = data;  
        this.isLoadingComments = false;  
      },
      (error) => {
        console.error('Yorumlar yüklenirken hata oluştu:', error);
        this.isLoadingComments = false;
      }
    );
  }

  
  likePost() {
    if (!this.blog) {
      return;
    }

    this.blogService.likePost(this.blogId).subscribe(
      response => {
        console.log(response);
        alert(response.message || response[0]); 
      },
      error => {
        console.error('Error liking post:', error);
        alert('Post beğenme işlemi sırasında bir hata oluştu.');
      }
    );
  }

  
  submitComment() {
    const newComment: Comment = {
      id: 0, 
      postId: this.blogId,  // Mevcut blog ID'sini kullanıyoruz
      postedBy: this.newCommentPostedBy,
      content: this.newCommentContent,
      date: new Date() 
    };
  
    this.commentService.createComment(newComment).subscribe(
      response => {
        console.log('Yorum başarıyla eklendi:', response);
        this.comments.push(newComment);
        this.newCommentContent = '';
        this.newCommentPostedBy = ''; 
      },
      error => {
        console.error('Yorum eklenirken hata oluştu:', error);
        alert('Yorum ekleme sırasında bir hata oluştu.');
      }
    );
  }

  deleteComment(commentId: number) {
    const adminUserId = this.currentUserId;
    if (this.isAdminUser) {
      this.commentService.deleteComment(commentId, adminUserId).subscribe(
        () => {
          console.log('Yorum başarıyla silindi');
          this.comments = this.comments.filter(comment => comment.id !== commentId);
        },
        (error) => {
          console.error('Yorum silinirken hata oluştu:', error);
          alert('Yorum silme işlemi sırasında bir hata oluştu.');
        }
      );
    }
  }
}
