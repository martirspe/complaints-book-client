import { Component, OnInit, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LayoutStateService } from '../../core/layout/layout-state.service';
import { DashboardContentComponent } from './components/dashboard-content.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly layoutState = inject(LayoutStateService);

  readonly userName = signal<string>('');
  readonly userEmail = signal<string>('');
  readonly userInitials = signal<string>('');
  readonly dashboardContentComponent = DashboardContentComponent;

  readonly greeting = computed(() => {
    const hour = new Date().getHours();
    const name = this.userName() || 'Usuario';
    let timeOfDay = 'Buenos días';

    if (hour >= 12 && hour < 18) {
      timeOfDay = 'Buenas tardes';
    } else if (hour >= 18 || hour < 6) {
      timeOfDay = 'Buenas noches';
    }

    return `${timeOfDay}, ${name}`;
  });


  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      const firstName = user.first_name || '';
      const lastName = user.last_name || '';
      const fullName = `${firstName} ${lastName}`.trim() || 'Usuario';
      const email = user.email || '';

      this.userName.set(fullName);
      this.userEmail.set(email);

      // Generar iniciales
      const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
      this.userInitials.set(initials || 'U');
    }
  }


  toggleSidebar(): void {
    this.layoutState.toggleSidebar();
  }
}
