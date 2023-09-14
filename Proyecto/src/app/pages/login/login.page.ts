import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public usuario: Usuario;
  constructor(private router: Router, private toastController: ToastController) {
    this.usuario = new Usuario('', '', '', '', '');
    this.usuario.correo = '';
    this.usuario.password = '';
  }

  public ngOnInit(): void {
  }

  public ingresar(): void {

    if (!this.validarUsuario(this.usuario)) {
      return;
    }

    this.mostrarMensaje('¡Bienvenido!');

    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario
      }
    };
    this.router.navigate(['/qr-reader'], navigationExtras);
  }

  public ingresarcorreorecuperacion(): void {
    this.router.navigate(['/correo']);
  }

  public ingresarqr(): void {
    this.router.navigate(['/qr-reader']);
  }


  public validarUsuario(usuario: Usuario): boolean {

    const usu = this.usuario.buscarUsuarioValido(
      this.usuario.correo, this.usuario.password);

    if (usu) {
      this.usuario = usu;
      return true;
    }
    else {
      this.mostrarMensaje('Las credenciales no son correctas!');
      return false;
    }
  }


  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duracion ? duracion : 2000
    });
    toast.present();
  }

}