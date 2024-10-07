import { Injectable } from "@angular/core";
import { BackendService } from "./backend.service";
import { DatabaseService } from "./sqlite.service";

@Injectable({
  providedIn: "root",
})
export class LoginService {

  constructor(private database: DatabaseService) {}

  register(user: any) {
    return new Promise<Object>((resolve, reject) => {
      this.database.getDBConnection().then((db) => {
        db.execSQL("INSERT INTO users (user_id,password) VALUES (?,?)", [
          user.email,
          user.password,
        ]).then(
          (id) => {
            resolve({ status: true });
          },
          (err) => {
            reject({ status: false });
          }
        );
      });
    });
  }

  login(user: any) {
    return new Promise<Object>((resolve, reject) => {
      this.database.getDBConnection().then((db) => {
        db.all(
          "SELECT * FROM users where user_id like'" +
            user.email +
            "' and password like '" +
            user.password +
            "'"
        ).then((rows) => {
          if (rows.length > 0) {
            BackendService.token = "dummy_token";
            resolve({ status: true });
          } else {
            reject({ status: false });
          }
        });
      });
    });
  }

  logout() {
    BackendService.token = "";
    this.database.closedDBConnection();
  }
}
