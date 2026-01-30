
import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../../shared/toast/toast.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);

  form!: FormGroup;
  isLoading = signal(false);

  constructor() {
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatchValidator });
  }

  public isFieldInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  public getFieldError(field: string): string {
    const control = this.form.get(field);
    if (!control?.errors) return '';

    if (control.errors['required']) return 'Este campo es obligatorio';
    if (control.errors['email']) return 'Correo electrónico inválido';
    if (control.errors['minlength']) return 'La contraseña debe tener al menos 8 caracteres';
    if (control.errors['passwordStrength']) return control.errors['passwordStrength'];
    if (field === 'confirmPassword' && this.form.errors?.['passwordsMismatch']) return 'Las contraseñas no coinciden';

    return 'Por favor verifica este campo';
  }

  private passwordStrengthValidator(control: any) {
    const value = control.value || '';
    if (!value) return null;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    if (!hasUpperCase || !hasLowerCase) {
      return { passwordStrength: 'Debe contener mayúsculas y minúsculas' };
    }
    if (!hasNumber) {
      return { passwordStrength: 'Debe contener al menos un número' };
    }
    if (!hasSpecialChar) {
      return { passwordStrength: 'Debe contener al menos un carácter especial (!@#$%^&*...)' };
    }
    return null;
  }

  private passwordsMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordsMismatch: true };
  }

  public onSubmit(): void {
    if (this.form.invalid) return;
    this.isLoading.set(true);
    const { first_name, last_name, email, password } = this.form.value;
    this.http.post<any>(`${environment.API_URL_CLAIM}/api/public/signup`, {
      first_name,
      last_name,
      email,
      password
    }).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.toast.showSuccess(res?.message || 'Registro exitoso. Verifica tu correo electrónico.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading.set(false);
        const msg = err?.error?.message || 'No se pudo completar el registro';
        this.toast.showError(msg);
      }
    });
  }
}
