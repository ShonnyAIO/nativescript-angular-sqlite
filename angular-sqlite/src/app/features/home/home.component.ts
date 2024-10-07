import { Component } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { SnackBar } from '@nativescript-community/ui-material-snackbar';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { LoginService } from '../../core/services/login.service';
import 'nativescript-localstorage';

@Component({
  moduleId: module.id,
  selector: "ns-home",
  templateUrl: "home.component.html"
})
export class HomeComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private routerExtensions: RouterExtensions) {
    this.loginForm = this.fb.group({
      email : ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmitForm(){
    console.log('FORM: ', this.loginForm.value);
    if(this.loginForm.valid){
      this.postLogin();
    }else{
      console.error('Lo sentimos, falta formulario por llenar');
      const snackbar = new SnackBar();
      snackbar.action({
        message : 'Lo sentimos, falta formulario por llenar',
        actionText : 'X',
        hideDelay: 3000,
        textColor: 'white',
        actionTextColor: 'white',
        backgroundColor: 'red',
      });
    }
  }

  postLogin(){

    this.loginService.login(this.loginForm.value).then((response: any) => {
      this.handleResponseLogin(response);
    }, (error: any) => {
      console.error('ERROR: ', error);
    });
  }

  handleResponseLogin(response: any){

    localStorage.setItem("user_id", this.loginForm.value.email);
    console.log('RESPUESTA: ', response);

    const snackbar = new SnackBar();
    snackbar.action({
      message : 'Sesion iniciada',
      actionText : 'X',
      hideDelay: 3000,
      textColor: 'white',
      actionTextColor: 'white',
      backgroundColor: 'green',
    });

    this.routerExtensions.navigate(["groceries"]);
  }

  handleError(error: any){
    console.error('ERROR POST LOGIN: ', error);

    const snackbar = new SnackBar();
    snackbar.action({
      message : error.msg,
      actionText : 'X',
      hideDelay: 3000,
      textColor: 'white',
      actionTextColor: 'white',
      backgroundColor: 'red',
    });

  }

  goToRegister(){
    this.routerExtensions.navigate(["register"]);
  }

}
