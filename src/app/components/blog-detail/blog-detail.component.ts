import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  blog: Blog | undefined;
  blogId!: number;

  @Input() id!: number;
  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    const blogId = this.route.snapshot.paramMap.get('id');
    if (blogId) {
      this.blogService.getBlogById(+blogId).subscribe(
        (data: Blog) => {
          this.blog = data;
        },
        (error) => {
          console.error('Blog detayı yüklenemedi:', error);
        }
      );
    }
  }
  likePost() {
    console.log('Post ID:', this.blog?.id);
   
    this.blogId = this.blog?.id || 0;
    this.blogService.likePost(this.blogId).subscribe(
      response => {
        console.log(response);
        alert(response.message || response[0]); // Başarılı yanıt mesajı
      },
      error => {
        console.error('Error liking post:', error);
        alert('Post beğenme işlemi sırasında bir hata oluştu.');
      }
    );
}
}