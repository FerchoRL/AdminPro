import { Component, Input, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { ChartData, ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from "ng2-charts";


@Component({
    selector: 'app-doughnut-graph',
    templateUrl: './doughnut-graph.component.html'
})

export class DoughnutGraphComponent{
    @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
    @Input() title: string = 'General';
    @Input('labels') doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    // @Input('data') doughnutChartData: ChartData<'doughnut'> = {
    //     labels: this.doughnutChartLabels,
    //     datasets: [
    //         {
    //             data: [350, 450, 100],
    //             backgroundColor: ['#6857E6', '#009FEE', '#F02059']
    //         },
    //     ]
    // };
    @Input('datasets') chartData: ChartDataset[] = [
        {data: [350, 450, 100], backgroundColor: ['#6857E6', '#009FEE', '#F02059']}
    ]
    
    
}