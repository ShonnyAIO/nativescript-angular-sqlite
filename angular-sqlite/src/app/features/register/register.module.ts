import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptAnimationsModule } from "@nativescript/angular";
import { ReactiveFormsModule } from "@angular/forms";
import { RegisterRoutingModule } from "./register-routing.module";
import { RegisterComponent } from "./register.component";

@NgModule({
  imports: [NativeScriptCommonModule, RegisterRoutingModule, NativeScriptFormsModule, NativeScriptAnimationsModule, ReactiveFormsModule],
  declarations: [RegisterComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class RegisterModule {}
