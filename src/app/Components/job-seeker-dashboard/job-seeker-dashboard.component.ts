import { IUser } from './../../Core/interfaces/iuser';
import { Component,inject,OnInit,ViewChild } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterLink } from '@angular/router';
import {   ApexChart,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexFill,
  ApexStroke,
  ApexDataLabels, 
  NgApexchartsModule} from "ng-apexcharts";
import { log } from 'console';
import { UpperCasePipe } from '@angular/common';
import { NavbarStateService } from '../../Core/Services/navbar-state-service.service';
import { JobsService } from '../../Core/Services/jobs.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
  labels: string[];
  dataLabels: ApexDataLabels;
};


@Component({
  selector: 'app-job-seeker-dashboard',
  imports: [RouterLink, NgApexchartsModule,UpperCasePipe],
  templateUrl: './job-seeker-dashboard.component.html',
  styleUrl: './job-seeker-dashboard.component.css'
})
export class JobSeekerDashboardComponent implements OnInit{
  private readonly navbarService = inject(NavbarStateService)
  private readonly _JobsService = inject(JobsService)
  

user: IUser | null = null;

ngOnInit(): void {
    this.navbarService.setScrolled(true);  
  const storedUser = localStorage.getItem('details');
  if (storedUser) {
    this.user = JSON.parse(storedUser);
    console.log(this.user);
  }
  else{
    console.log("helle")
  }
  this._JobsService.getUserJobs().subscribe({
    next:(res)=>{
      console.log(res);
    },
    error:(err)=>{
      console.log(err);
    }
  })
}


  chartOptions: any = {
    series: [75],
    chart: {
      height: 250,
      type: 'radialBar'
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '60%'
        },
        dataLabels: {
          name: {
            show: true,
            offsetY: -10,
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#000'
          },
          value: {
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#000',
            show: true,
          }
        }
      }
    },
    fill: {
      colors: ['#009688']
    },
    stroke: {
      lineCap: 'round'
    },
    labels: ['Complete']
  };
  
  
}
