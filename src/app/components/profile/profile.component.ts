import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';
import { UserService } from 'src/app/services/user.service'; // Kullanıcı servisi ekleyin
import { Blog } from 'src/app/models/blog';
import { User} from 'src/app/models/user'; // Kullanıcı modelini ekleyin
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userName: string = '';
  userBlogs: Blog[] = [];
  userForm!: FormGroup; // Kullanıcı formu
  currentUserId!: number;

  constructor(
    private authService: AuthService,
    private blogService: BlogService,
    private userService: UserService, 
    private fb: FormBuilder 
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.authService.getCurrentUserId(); 
    this.userName = this.authService.getCurrentuserName(); 
    //this.loadUserBlogs();
    this.initializeUserForm(); 
  }

  initializeUserForm() {
    this.userForm = this.fb.group({
      userName: [this.userName, Validators.required], 
      // Diğer kullanıcı alanlarını buraya ekleyin
    });
  }

  // loadUserBlogs(): void {
  //   this.blogService.getBlogsByUserId(this.currentUserId).subscribe(
  //     (Blogs: Blog[]) => {
  //       this.userBlogs = Blogs; // Kullanıcıya ait Blogları yükle
  //     },
  //     (error) => {
  //       console.error('Bloglar yüklenirken hata oluştu:', error);
  //     }
  //   );
  // }

  updateUser(): void {
    if (this.userForm.valid) {
      const updatedUser: User = {
        ...this.userForm.value,
        id: this.currentUserId 
      };

      this.userService.updateUser(this.currentUserId, updatedUser).subscribe(
        () => {
          alert('Kullanıcı bilgileri başarıyla güncellendi!');
          this.userName = updatedUser.userName; 
        },
        (error) => {
          console.error('Kullanıcı güncellenirken hata oluştu:', error);
          alert('Kullanıcı güncelleme sırasında bir hata oluştu.');
        }
      );
    }
  }

  deleteUser(): void {
    const adminUserId = this.authService.getCurrentUserId(); 

    this.userService.deleteUser(this.currentUserId, adminUserId).subscribe(
      () => {
        alert('Kullanıcı başarıyla silindi.');
        
      },
      (error) => {
        console.error('Kullanıcı silinirken hata oluştu:', error);
        alert('Kullanıcı silme işlemi sırasında bir hata oluştu.');
      }
    );
  }
}
