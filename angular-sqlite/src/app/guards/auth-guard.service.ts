import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { BackendService } from "../core/services/backend.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
    
  constructor(private router: Router) {}

  canActivate() {
    if (BackendService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
