import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';
import { UserService } from 'src/app/services/user.service'; 
import { Blog } from 'src/app/models/blog';
import { User} from 'src/app/models/user'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username: string = '';
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
    this.username = this.authService.getCurrentusername(); 
    //this.loadUserBlogs();
    this.initializeUserForm(); 
  }

  initializeUserForm() {
    this.userForm = this.fb.group({
      username: [this.username], 
      password: ['', [ Validators.minLength(6)]],
      
    });
  }


  updateUser(): void {
    if (this.userForm.valid) {
      const updatedUser: User = {
        id: this.currentUserId,
        username: this.userForm.value.username || undefined, 
        password: this.userForm.value.password ? this.userForm.value.password : undefined,
      };
  

      this.userService.updateUser(this.currentUserId, updatedUser).subscribe(
        () => {
          if (updatedUser.username) {
            this.username = updatedUser.username;
            localStorage.setItem('username', this.username);
          }
          alert('Kullanıcı bilgileri başarıyla güncellendi!');
          this.userForm.reset(); 
        },
        (error) => {
          console.error('Kullanıcı güncellenirken hata oluştu:', error);
          alert('Kullanıcı güncelleme sırasında bir hata oluştu.');
        }
      );
    }
  }

  
  
}
