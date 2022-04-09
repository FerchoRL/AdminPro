import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LogginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
    {path: 'login', component: LogginComponent },
    {path: 'register', component: RegisterComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [ RouterModule ]
})

export class AuthRoutingModule {}