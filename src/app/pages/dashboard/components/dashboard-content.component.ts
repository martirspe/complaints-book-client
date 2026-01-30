import { Component } from '@angular/core';
import { DashboardKpisComponent } from './dashboard-kpis.component';
import { DashboardChartsComponent } from './dashboard-charts.component';
import { DashboardClaimsTableComponent } from './dashboard-claims-table.component';

@Component({
  selector: 'app-dashboard-content',
  standalone: true,
  imports: [DashboardKpisComponent, DashboardChartsComponent, DashboardClaimsTableComponent],
  templateUrl: './dashboard-content.component.html',
  styleUrl: './dashboard-content.component.css',
})
export class DashboardContentComponent {}
