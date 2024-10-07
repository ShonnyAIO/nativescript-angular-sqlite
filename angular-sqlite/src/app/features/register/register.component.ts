import { Component } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { SnackBar } from '@nativescript-community/ui-material-snackbar';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { LoginService } from '../../core/services/login.service';
import 'nativescript-localstorage';

@Component({
    moduleId: module.id,
    selector: "ns-register",
    templateUrl: "register.component.html"
})
export class RegisterComponent {

    registerForm: FormGroup;

    constructor(private fb: FormBuilder, private loginService: LoginService, private routerExtensions: RouterExtensions) {
      this.registerForm = this.fb.group({
        email : ['', Validators.required],
        password: ['', Validators.required]
      });
    }


    onSubmitForm(){
        console.log('FORM: ', this.registerForm.value);
        if(this.registerForm.valid){
          this.postRegister();
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

    postRegister(){
        this.loginService.register(this.registerForm.value).then((response: any) => {
            this.handleResponseRegister(response);
          }, (error: any) => {
            console.error('ERROR: ', error);
          });
    }

    handleResponseRegister(response: any){
        console.log('RESPUESTA: ', response);
    
        const snackbar = new SnackBar();
        snackbar.action({
          message : 'Usuario registrado, exitoso',
          actionText : 'X',
          hideDelay: 3000,
          textColor: 'white',
          actionTextColor: 'white',
          backgroundColor: 'green',
        });
    
        this.routerExtensions.navigate(["home"]);
      }

    handleError(error: any){
        console.error('ERROR POST REGISTER: ', error);
    
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

    goToLogin(){
        this.routerExtensions.navigate(["home"]);
    }

} 