import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Claim {
  id: string;
  code: string;
  client: string;
  document: string;
  book: string;
  date: string;
  daysAgo: string;
  status: 'Pendiente' | 'Resuelto';
}

@Component({
  selector: 'app-dashboard-claims-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-claims-table.component.html',
  styleUrl: '../dashboard.component.css',
})
export class DashboardClaimsTableComponent {
  recentClaims: Claim[] = [
    {
      id: '1',
      code: '2511I07944',
      client: 'KARLA PAOLA LOPEZ RENGIFO',
      document: 'DNI: 70049755',
      book: 'TRANSPORTES G M INTERNACIONAL S.A.C.',
      date: '09/11/2025',
      daysAgo: 'hace alrededor de 20 horas',
      status: 'Pendiente'
    },
    {
      id: '2',
      code: '2511G6NPP',
      client: 'ELDER ANGEL RODRIGUEZ YARANGA',
      document: 'DNI: 74349675',
      book: 'BRAIN TECH PERU S.A.C.',
      date: '06/11/2025',
      daysAgo: 'hace 4 días',
      status: 'Resuelto'
    },
    {
      id: '3',
      code: '2511Q4AU83',
      client: 'ANDRE MARTIN MATURRANO SALAZAR',
      document: 'DNI: 72472560',
      book: 'JOHNSON S.A.C.',
      date: '03/11/2025',
      daysAgo: 'hace 7 días',
      status: 'Pendiente'
    }
  ];
}
