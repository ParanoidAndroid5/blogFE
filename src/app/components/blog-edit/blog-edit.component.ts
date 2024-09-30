import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from 'src/app/models/blog';
import { BlogService } from 'src/app/services/blog.service';  
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent implements OnInit {
  blogPostForm: FormGroup;
  blogId!: number;  // Blog ID'sini tutmak için
  blog!: Blog;      // Mevcut blog verisini tutmak için
  username: string = '';  // Mevcut kullanıcı adı

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private route: ActivatedRoute,  // Blog ID'sini almak için
    private router: Router,
    private authService: AuthService
  ) {
    // Form'u oluşturuyoruz
    this.blogPostForm = this.fb.group({
      username: [{ value: '', disabled: true }, Validators.required],  // Kullanıcı adı değiştirilmemeli
      name: ['', Validators.required],  // Başlık alanı zorunlu
      content: ['', Validators.required],  // İçerik alanı zorunlu
      imgUrl: ['']  // Görsel URL'si boş olabilir
    });
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';  // Kullanıcı adını al
    this.blogPostForm.get('username')?.setValue(this.username);  // Formda göster

    // URL'deki blog ID'yi alıyoruz
    const blogIdParam = this.route.snapshot.paramMap.get('id');
    if (blogIdParam) {
      this.blogId = +blogIdParam;  // String'i number'a çeviriyoruz
      this.loadBlogDetails(this.blogId);  // Blog detaylarını yükle
    }
  }

  // Blog detaylarını yükleme fonksiyonu
  loadBlogDetails(blogId: number): void {
    this.blogService.getBlogById(blogId).subscribe(
      (data: Blog) => {
        this.blog = data;  // Gelen blog'u kaydediyoruz

        // Formu gelen blog bilgileriyle dolduruyoruz
        this.blogPostForm.patchValue({
          name: this.blog.name,
          content: this.blog.content,
          imgUrl: this.blog.imgUrl
        });
      },
      (error) => {
        console.error('Blog detayları yüklenemedi:', error);
        alert('Blog yüklenirken hata oluştu.');
      }
    );
  }

  // Düzenleme işlemi
  onEdit(): void {
    if (this.blogPostForm.valid) {
      // Form verilerini alıyoruz
      const updatedBlog: Blog = {
        ...this.blog,  // Mevcut blog verilerini kopyala (ID'yi koruyoruz)
        name: this.blogPostForm.get('name')?.value,
        content: this.blogPostForm.get('content')?.value,
        imgUrl: this.blogPostForm.get('imgUrl')?.value || this.blog.imgUrl  // Eğer görsel URL'si girilmediyse eski görseli kullan
      };

      // Blog'u güncelliyoruz
      this.blogService.updateBlogPost(this.blogId, updatedBlog).subscribe(
        (response) => {
          console.log('Post başarıyla güncellendi:', response);
          this.router.navigate(['/home']);  // Güncelleme sonrası anasayfaya yönlendir
        },
        (error) => {
          console.error('Post güncellenirken hata oluştu:', error);
          alert('Post güncellenirken bir hata oluştu.');
        }
      );
    } else {
      alert('Formda eksik bilgiler var, lütfen kontrol edin.');
    }
  }
}
