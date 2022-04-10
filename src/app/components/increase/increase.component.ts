import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-increase',
    templateUrl: './increase.component.html'
})

export class IncreaseComponent {
    @Input() progressValue: number = 50;
    @Output() outputProgressValue: EventEmitter<number> = new EventEmitter();

    updateValue( value: number){
        this.progressValue = this.progressValue <= 0 && value == -5 ? 0 : this.progressValue >= 100 && value == 5 ? 100 : this.progressValue + value;
        console.log(this.progressValue)
        this.outputProgressValue.emit(this.progressValue);
    }
}