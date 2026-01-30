import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutStateService {
  readonly sidebarExpanded = signal<boolean>(true);

  toggleSidebar(): void {
    this.sidebarExpanded.set(!this.sidebarExpanded());
  }

  expandSidebar(): void {
    this.sidebarExpanded.set(true);
  }

  collapseSidebar(): void {
    this.sidebarExpanded.set(false);
  }
}
