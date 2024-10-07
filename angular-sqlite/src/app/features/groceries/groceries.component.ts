import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { View, TextField, ListView } from "@nativescript/core";
import {
  ListViewEventData,
  RadListView,
  SwipeActionsEventData,
} from "nativescript-ui-listview";
import { DatabaseService } from "../../core/services/sqlite.service";
import { LoginService } from "../../core/services/login.service";
import { SnackBar } from '@nativescript-community/ui-material-snackbar';
import 'nativescript-localstorage';

@Component({
  moduleId: module.id,
  selector: "ns-groceries",
  templateUrl: "groceries.component.html",
})
export class GroceriesComponent implements OnInit {
  groceryList: Array<Object> = [];
  db: any;
  grocery = "";
  user_id: string;
  @ViewChild("groceryTextField") groceryTextField: ElementRef;

  constructor(
    private database: DatabaseService,
    private routerExtensions: RouterExtensions,
    private userService: LoginService
  ) {}

  ngOnInit(): void {
    this.user_id = localStorage.getItem("user_id");
    console.log('USER ID: ', this.user_id);
    this.selectItems();
  }

  selectItems() {
    this.groceryList = [];
    this.database.getDBConnection().then((db) => {
      db.all("SELECT id, item_name FROM items WHERE user_id = ?", [
        this.user_id,
      ]).then(
        (rows) => {
            console.log('ROWS: ', rows);
          for (var row in rows) {
            this.groceryList.push({ id: rows[row][0], name: rows[row][1] });
          }
          this.db = db;
        },
        (error) => {
          console.log("SELECT ERROR", error);
        }
      );
    });
  }

  add() {
    if (this.grocery.trim() === "") {
      alert("Enter a grocery item");
      return;
    }

    let textField = <TextField>this.groceryTextField.nativeElement;
    textField.dismissSoftInput();
    this.database.getDBConnection().then((db) => {
      db.execSQL("INSERT INTO items (item_name, user_id) VALUES (?,?)", [
        this.grocery,
        this.user_id,
      ]).then(
        (id) => {
          this.groceryList.unshift({ id: id, name: this.grocery });
          this.grocery = "";
          const snackbar = new SnackBar();
          snackbar.action({
            message : 'Producto registrado',
            actionText : 'X',
            hideDelay: 3000,
            textColor: 'white',
            actionTextColor: 'white',
            backgroundColor: 'green',
          });
        },
        (error) => {
          alert("An error occurred while adding an item to your list.");
          this.grocery = "";
        }
      );
    });
  }

  onSwipeCellStarted(args: ListViewEventData) {
    var swipeLimits = args.data.swipeLimits;
    var swipeView = args.object;
    var rightItem = swipeView.getViewById<View>("delete-view");
    swipeLimits.right = rightItem.getMeasuredWidth();
    swipeLimits.left = 0;
    swipeLimits.threshold = rightItem.getMeasuredWidth() / 2;
  }

  delete(args: ListViewEventData) {
    let grocery = <any>args.object.bindingContext;
    this.database.getDBConnection().then((db) => {
      db.execSQL("DELETE FROM items WHERE id=?", [grocery.id]).then(() => {
        let index = this.groceryList.indexOf(grocery);
        this.groceryList.splice(index, 1);
        console.log(" Item deleted successfully!");
        const snackbar = new SnackBar();
        snackbar.action({
          message : 'Producto eliminado',
          actionText : 'X',
          hideDelay: 3000,
          textColor: 'white',
          actionTextColor: 'white',
          backgroundColor: 'green',
        });
      });
    });
  }

  logout() {
    this.userService.logout();
    this.routerExtensions.navigate(["home"]);
  }
}
