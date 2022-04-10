import { ThisReceiver } from "@angular/compiler";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: 'app-increase',
    templateUrl: './increase.component.html'
})

export class IncreaseComponent implements OnInit {
    ngOnInit(){
        this.btnClass = `btn ${ this.btnClass }`
    }
    @Input() progressValue: number = 50;
    @Input() btnClass: string = "btn-primary";
    @Output() outputProgressValue: EventEmitter<number> = new EventEmitter();

    updateValue( value: number){
        this.progressValue = this.progressValue <= 0 && value == -5 ? 0 : this.progressValue >= 100 && value == 5 ? 100 : this.progressValue + value;
        console.log(this.progressValue)
        this.outputProgressValue.emit(this.progressValue);
    }
}