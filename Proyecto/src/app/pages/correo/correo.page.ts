import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
})
export class CorreoPage implements OnInit {

  public correo: string = '';

  constructor(private router: Router,private alertController: AlertController) { }

  ngOnInit() {
  }

  public ingresarPaginaValidarRespuestaSecreta(): void {
    const usuario = new Usuario('', '', '', '', '');
    const usuarioEncontrado = usuario.buscarUsuarioValidoCorreo(this.correo);
    if (!usuarioEncontrado) {
      this.mostrarMensaje('El correo ingresado no se encuentra registrado en el sistema');
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

  public async mostrarMensaje(mensaje: string) {
    const alert = await this.alertController.create({
      message: mensaje,
      header:'Error!!!',
      subHeader: 'Verifica tu Correo',
      buttons: ['OK']
    });
    alert.present();
  }

  
}
