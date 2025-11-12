import { Component } from '@angular/core';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { LeftSideBarComponent } from '../../components/left-side-bar/left-side-bar.component';
import { RightSideBarComponent } from '../../components/right-side-bar/right-side-bar.component';
import { ResearchDashboardComponent } from '../../components/research-dashboard/research-dashboard.component';

@Component({
  selector: 'app-research-dashboard-page',
  imports: [NavigationComponent, LeftSideBarComponent, RightSideBarComponent, ResearchDashboardComponent],
  templateUrl: './research-dashboard-page.component.html',
  styleUrl: './research-dashboard-page.component.scss'
})
export class ResearchDashboardPageComponent {

}

