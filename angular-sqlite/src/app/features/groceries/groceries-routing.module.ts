import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { GroceriesComponent } from "./groceries.component";

export const routes: Routes = [
  {
    path: "",
    component: GroceriesComponent
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)]
})
export class GroceriesRoutingModule {}
