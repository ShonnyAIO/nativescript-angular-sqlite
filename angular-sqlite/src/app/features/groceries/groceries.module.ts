import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptAnimationsModule } from "@nativescript/angular";
import { ReactiveFormsModule } from "@angular/forms";
import { GroceriesComponent } from "./groceries.component";
import { GroceriesRoutingModule } from "./groceries-routing.module";

@NgModule({
  imports: [NativeScriptCommonModule, GroceriesRoutingModule, NativeScriptFormsModule, NativeScriptAnimationsModule, ReactiveFormsModule],
  declarations: [GroceriesComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class GroceriesModule {}