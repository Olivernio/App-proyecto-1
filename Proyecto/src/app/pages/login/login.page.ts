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

  error: boolean = false;
  public usuario: Usuario;
  constructor(private router: Router, private toastController: ToastController) {
    this.usuario = new Usuario('', '', '', '', '', '');
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
    this.router.navigate(['/home'], navigationExtras);
  }

  public ingresarcorreorecuperacion(): void {
    this.router.navigate(['/correo']);
  }

  public validarUsuario(usuario: Usuario): boolean {

    const usu = this.usuario.buscarUsuarioValido(
      this.usuario.correo, this.usuario.password);

    if (usu) {
      this.usuario = usu;
      return true;
    }else if (!this.usuario.correo.endsWith('@duocuc.cl')) {
      this.mostrarMensaje('Por favor, ingrese su correo institucional (DuocUC)');
      return false;
    }else if (this.usuario.correo.endsWith('@duocuc.cl')) {
      // this.efectoError();
      this.mostrarMensaje('Alumno no registrado en el sistema');
      return false;
    }else {
      this.mostrarMensaje('Por favor, ingrese su correo institucional')
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

  efectoError() {
    this.error = true;

    setTimeout(() => {
      this.error = false;
    }, 2000); // 3000 milisegundos = 3 segundos
  }

}