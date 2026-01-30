import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ChartData {
  label: string;
  tooltipLabel: string;
  resolved: number;
  pending: number;
}

interface PriorityData {
  label: string;
  percentage: number;
  count: number;
  color: string;
}

@Component({
  selector: 'app-dashboard-charts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-charts.component.html',
  styleUrl: '../dashboard.component.css',
})
export class DashboardChartsComponent {
  private readonly donutRadius = 38;
  private readonly donutCircumference = 2 * Math.PI * this.donutRadius;

  chartData: ChartData[] = [
    { label: '1-7 dic', tooltipLabel: '01 - 07 Dic, 2025', resolved: 2, pending: 0 },
    { label: '8-14 dic', tooltipLabel: '08 - 14 Dic, 2025', resolved: 3, pending: 0 },
    { label: '15-21 dic', tooltipLabel: '15 - 21 Dic, 2025', resolved: 6, pending: 0 },
    { label: '29-4 ene', tooltipLabel: '29 Dic, 2025 - 04 Ene, 2026', resolved: 1, pending: 0 },
    { label: '12-18 ene', tooltipLabel: '12 - 18 Ene, 2026', resolved: 5, pending: 1 },
    { label: '26-1 feb', tooltipLabel: '26 Ene - 01 Feb, 2026', resolved: 4, pending: 2 }
  ];

  priorityData: PriorityData[] = [
    { label: 'Prioridad Crítica', percentage: 25, count: 1, color: '#ef4444' },
    { label: 'Prioridad Alta', percentage: 25, count: 1, color: '#f59e0b' },
    { label: 'Prioridad Normal', percentage: 50, count: 2, color: '#3b82f6' }
  ];

  getMaxChartValue(): number {
    return Math.max(...this.chartData.flatMap(d => [d.resolved, d.pending])) || 20;
  }

  getBarHeight(value: number): string {
    const max = this.getMaxChartValue();
    return ((value / max) * 100).toFixed(2);
  }

  getTotalPendingClaims(): number {
    let total = 0;
    for (const priority of this.priorityData) {
      total += priority.count;
    }
    return total;
  }

  getYAxisTicks(): number[] {
    const max = this.getMaxChartValue();
    const step = Math.max(1, Math.ceil(max / 3));
    const roundedMax = Math.ceil(max / step) * step;
    return [roundedMax, roundedMax - step, roundedMax - step * 2, 0];
  }

  getDonutSegments(): Array<{ color: string; dasharray: string; dashoffset: string }> {
    let offset = 0;
    return this.priorityData.map((priority) => {
      const length = (priority.percentage / 100) * this.donutCircumference;
      const dasharray = `${length} ${this.donutCircumference - length}`;
      const dashoffset = `${-offset}`;
      offset += length;
      return {
        color: priority.color,
        dasharray,
        dashoffset,
      };
    });
  }
}
