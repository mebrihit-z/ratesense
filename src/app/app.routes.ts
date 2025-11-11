import { Routes } from '@angular/router';
import { ReportPageComponent } from './pages/report-page/report-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/report', pathMatch: 'full' },
  { path: 'report', component: ReportPageComponent }
];
