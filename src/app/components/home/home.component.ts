import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { Blog } from 'src/app/models/blog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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


  tags = ['Angular', 'JavaScript', 'Web Development', 'CSS', 'HTML', 'TypeScript','Java'];

  onSearch(query: string): void {
    console.log('Searching for:', query);
}
}
