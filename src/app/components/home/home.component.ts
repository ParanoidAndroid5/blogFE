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




  onSearch(searchTerm: string) {
    if (searchTerm) {
      this.blogService.searchByName(searchTerm).subscribe(
        (data: Blog[]) => {
          this.blogs = data; 
          console.log('Search results:', data); 
        },
        error => {
          console.error('Arama hatası:', error);
          this.blogs = []; 
        }
      );
    } else {
      this.fetchBlogs(); 
    }
  }
}

