import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface KPI {
  title: string;
  value: number;
  change: number;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-dashboard-kpis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-kpis.component.html',
  styleUrl: '../dashboard.component.css',
})
export class DashboardKpisComponent {
  kpis: KPI[] = [
    { title: 'RUCs registrados', value: 155, change: 24.8, icon: 'analytics', color: '#3b82f6' },
    { title: 'Libros creados', value: 159, change: 25.5, icon: 'menu_book', color: '#10b981' },
    { title: 'Total de reclamos', value: 87, change: 8.6, icon: 'report_problem', color: '#f59e0b' },
    { title: 'Reclamos resueltos', value: 84, change: 100, icon: 'check_circle', color: '#06b6d4' }
  ];
}
