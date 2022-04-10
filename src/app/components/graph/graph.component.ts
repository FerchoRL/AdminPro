import { Component } from "@angular/core";
import { ChartData, ChartType } from 'chart.js';


@Component({
    selector: 'app-graph-component',
    templateUrl: './graph.component.html'
})

export class GraphComponent {
    public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    public doughnutChartData: ChartData<'doughnut'> = {
        labels: this.doughnutChartLabels,
        datasets: [
            {
                data: [350, 450, 100],
                backgroundColor: ['#6857E6', '#009FEE', '#F02059']
            },
        ]
    };
    public doughnutChartType: ChartType = 'doughnut';
}