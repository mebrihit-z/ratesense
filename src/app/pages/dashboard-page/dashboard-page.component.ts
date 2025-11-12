import { Component } from '@angular/core';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { LeftSideBarComponent } from '../../components/left-side-bar/left-side-bar.component';
import { RightSideBarComponent } from '../../components/right-side-bar/right-side-bar.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';

@Component({
  selector: 'app-dashboard-page',
  imports: [NavigationComponent, LeftSideBarComponent, RightSideBarComponent, DashboardComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {

}

