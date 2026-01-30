import { Component, HostListener, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { LayoutStateService } from '../../../core/layout/layout-state.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly layoutState = inject(LayoutStateService);

  readonly sidebarExpanded = this.layoutState.sidebarExpanded;
  readonly userMenuOpen = signal<boolean>(false);

  readonly userName = signal<string>('');
  readonly userEmail = signal<string>('');
  readonly userInitials = signal<string>('');

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      const firstName = user.first_name || '';
      const lastName = user.last_name || '';
      const fullName = `${firstName} ${lastName}`.trim() || 'Usuario';
      const email = user.email || '';

      this.userName.set(fullName);
      this.userEmail.set(email);

      const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
      this.userInitials.set(initials || 'U');
    }
  }

  toggleUserMenu(): void {
    if (!this.sidebarExpanded()) {
      return;
    }
    this.userMenuOpen.set(!this.userMenuOpen());
  }

  closeUserMenu(): void {
    this.userMenuOpen.set(false);
  }

  logout(): void {
    this.authService.logout();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-section')) {
      this.closeUserMenu();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeUserMenu();
  }
}
