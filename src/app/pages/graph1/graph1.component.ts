import { Component } from "@angular/core";
import { ChartDataset } from "chart.js";


@Component({
    selector: 'app-graph1',
    templateUrl: './graph1.component.html'
})

export class Graph1Component {

    public setColors: string[] = ['#6857E6', '#009FEE', '#F02059'];
    public soccerLabels: string[] = ['Champions League 2022','UEFA Europa League','Liga Mexicana'];
    public soccerData: ChartDataset[] = [
        {data: [550, 250, 100], backgroundColor: this.setColors}
    ]
    public musicLabels: string[] = ['Tomorrowland','EDC','Live sets'];
    public musicData: ChartDataset[] = [
        {data: [333, 222, 444], backgroundColor: this.setColors}
    ]
    
}