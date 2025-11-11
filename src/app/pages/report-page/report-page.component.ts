import { Component } from '@angular/core';
import { LeftSideBarComponent } from '../../components/left-side-bar/left-side-bar.component';
import { RightSideBarComponent } from '../../components/right-side-bar/right-side-bar.component';
import { ReportComponent } from '../../components/report/report.component';

@Component({
  selector: 'app-report-page',
  imports: [LeftSideBarComponent, RightSideBarComponent, ReportComponent],
  templateUrl: './report-page.component.html',
  styleUrl: './report-page.component.scss'
})
export class ReportPageComponent {

}
