import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
})
export class CorreoPage implements OnInit {

  public correo: string = '';

  constructor(private router: Router,private alertController: AlertController, private toastController: ToastController) { }

  ngOnInit() {
  }

  public volver(): void {
    this.router.navigate(['/']);
  }

  public ingresarPaginaValidarRespuestaSecreta(): void {
    const usuario = new Usuario('', '', '', '', '');
    const usuarioEncontrado = usuario.buscarUsuarioValidoCorreo(this.correo);
    if (this.correo == '' || this.correo == ' ') {
      this.mostrarMensajeTostada('Por favor escriba algun correo valido');
    } else if (!usuarioEncontrado) {
      this.mostrarMensajeIncorrecto('El correo ingresado no se encuentra registrado en el sistema');
    }
    else {
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: usuarioEncontrado
        }
      };
      this.router.navigate(['/pregunta'], navigationExtras);
    }
  }

  async mostrarMensajeTostada(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duracion ? duracion : 2000,
      icon: "alert"
    });
    toast.present();
  }

  public async mostrarMensajeIncorrecto(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Respuesta Incorrecta',
      message: `Escriba algun correo valido o registrado en el sistema!!`,
      buttons: ['OK'],
    });
    await alert.present();
  }

}
