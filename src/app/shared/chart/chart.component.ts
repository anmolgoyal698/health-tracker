import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent {
  @Input() barChartLabels!: string[];
  @Input() barChartType!: any;
  @Input() barChartData!: any;

  public barChartOptions = {
    responsive: true,
    scales: {
      x: {},
      y: {
        beginAtZero: true,
        max: 45, // Adjust the max value to fit your data
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
      },
    },
  };

  // public barChartLabels = ['Running', 'Cycling'];
  public barChartLegend = true;
  // public barChartData = [{ data: [30, 40], label: 'Minutes' }];
}
