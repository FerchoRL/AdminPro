import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LogginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

@NgModule({
    declarations: [
        LogginComponent,
        RegisterComponent
    ],
    exports: [
        LogginComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule
    ]
})
export class AuthModule {}