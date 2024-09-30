import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Blog} from 'src/app/models/blog';
import { BlogService } from 'src/app/services/blog.service';  
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit{
  blogPostForm: FormGroup;
  username: string = '';

  constructor(
    private fb: FormBuilder,
    private BlogService: BlogService,
    private router: Router,
    private authService: AuthService,
  ) {
    this.blogPostForm = this.fb.group({
      username: [this.username],
      name: ['', Validators.required],
      content: ['', Validators.required],
      imgUrl: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || ''; 
    this.blogPostForm.get('username')?.setValue(this.username); 
    
  }

  onSubmit(): void {
    if (this.blogPostForm.valid) {
      const newBlogPost: Blog = this.blogPostForm.value;
      this.BlogService.createBlogPost(newBlogPost).subscribe(
        response => {
          console.log('Post created successfully:', response);
          this.router.navigate(['/home']); 
        },
        error => {
          console.error('Error creating blog post:', error);
        }
      );
    }
  }
}
