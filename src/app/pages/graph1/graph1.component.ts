import { Component } from "@angular/core";
import { ChartData, ChartType } from 'chart.js';

@Component({
    selector: 'app-graph1',
    templateUrl: './graph1.component.html'
})

export class Graph1Component {
    public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    public doughnutChartData: ChartData<'doughnut'> = {
        labels: this.doughnutChartLabels,
        datasets: [
            { data: [350, 450, 100] },
        ]
    };
    public doughnutChartType: ChartType = 'doughnut';
}