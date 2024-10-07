import { Injectable } from "@angular/core";
var Sqlite = require("nativescript-sqlite");

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    public getDBConnection(){
        return new Sqlite('groceries');
    }

    public closedDBConnection(){
        new Sqlite('groceries').then((db) => {
            db.close();
        })
    }
}