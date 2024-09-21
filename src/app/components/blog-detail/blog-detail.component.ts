import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';

interface Blog {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  author: string;
  date: string;
}

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  blog: Blog | undefined;

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
}
