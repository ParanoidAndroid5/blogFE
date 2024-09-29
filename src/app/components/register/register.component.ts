import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar'; // MatSnackBar import edildi

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar // MatSnackBar servisi eklendi
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.registerForm.valid) {
      this.userService.register(this.registerForm.value).subscribe(
        (response: any) => {
          console.log('Kayıt başarılı:', response);
          this.snackBar.open('Kayıt başarılı!', 'Kapat', { duration: 3000 }); // Kayıt başarılı mesajı
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Kayıt hatası:', error);
          if (error.status === 400) {
            // Kullanıcı adı zaten mevcut
            this.snackBar.open('Bu kullanıcı adı zaten alınmış. Lütfen başka bir kullanıcı adı seçin.', 'Kapat', { duration: 5000 });
          } else {
            // Diğer hata durumları
            this.snackBar.open('Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.', 'Kapat', { duration: 5000 });
          }
        }
      );
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
