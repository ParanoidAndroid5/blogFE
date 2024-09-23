import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Blog} from 'src/app/models/blog';
import { BlogService } from 'src/app/services/blog.service';  


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
  blogPostForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private BlogService: BlogService,
    private router: Router
  ) {
    this.blogPostForm = this.fb.group({
      username: ['', Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });
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
