import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { AuthGuard } from "../app/guards/auth-guard.service";
import { NoAuthGuard } from "../app/guards/no-auth-guard.service";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () => import("./features/home/home.module").then(m => m.HomeModule),
    canActivate: [NoAuthGuard]
  },
  {
    path: "register",
    loadChildren: () => import("./features/register/register.module").then(m => m.RegisterModule),
    canActivate: [NoAuthGuard]
  },
  {
    path : "groceries",
    loadChildren: () => import("./features/groceries/groceries.module").then(m => m.GroceriesModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
