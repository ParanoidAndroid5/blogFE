import { Component, OnInit } from '@angular/core';
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
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blogs: Blog[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.fetchBlogs();
  }

  fetchBlogs(): void {
    this.blogService.getBlogs().subscribe(
      (data: Blog[]) => {
        this.blogs = data;
      },
      (error) => {
        console.error('Blogları çekerken hata oluştu:', error);
      }
    );
  }
}
