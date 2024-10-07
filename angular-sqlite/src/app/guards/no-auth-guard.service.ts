import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { BackendService } from "../core/services/backend.service";

@Injectable({
    providedIn: "root",
  })
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    if (BackendService.isLoggedIn()) {
      this.router.navigate(["/groceries"]);
      return false;
    } else {
      return true;
    }
  }
}
