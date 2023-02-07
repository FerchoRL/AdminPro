import { Component } from "@angular/core";

@Component({
    selector: 'app-progress',
    templateUrl: './progress.component.html',
    styleUrls: [
        './progress.component.css'
    ]
})

export class ProgressComponent {
    futbolProgress: number = 25;
    testingProgress: number = 55;

    getProgressPercentage1() {
        return `${this.futbolProgress}%`
    }

    getProgressPercentage2() {
        return `${this.testingProgress}%`
    }
}