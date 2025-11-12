import { Routes } from '@angular/router';
import { ReportPageComponent } from './pages/report-page/report-page.component';
import { ResearchDashboardPageComponent } from './pages/research-dashboard-page/research-dashboard-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardPageComponent },
  { path: 'research-dashboard', component: ResearchDashboardPageComponent },
  { path: 'report', component: ReportPageComponent }
];
