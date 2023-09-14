import { Component, OnInit } from '@angular/core';
import { PreguntaPage } from '../pregunta/pregunta.page';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { AlertController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-incorrecta',
  templateUrl: './incorrecta.page.html',
  styleUrls: ['./incorrecta.page.scss'],
})
export class IncorrectaPage implements OnInit {
  public usuario: Usuario | undefined;
  public respuesta: string = '';

  constructor(    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController) { }

  ngOnInit() {
  }
  public PaginaValidarRespuestaSecreta(): void {
    if (this.usuario && this.usuario.respuestaSecreta === this.respuesta) {
      this.mostrarMensajeCorrecto('Tu contraseña es: ' + this.usuario.password);
      this.router.navigate(['/correcta']); 
    } else if (this.usuario && this.respuesta === '' || this.usuario && this.respuesta === ' ') {
      this.mostrarMensajeTostada('Escriba la respuesta');
    } else {
      this.mostrarMensajeIncorrecto('Tu respuesta es incorrecta, Verifica tu respuesta');
      this.router.navigate(['/incorrecta']); 
      ;
    }
  }

  public async mostrarMensajeCorrecto(mensaje: string) {
    const alert = await this.alertController.create({
      message: mensaje,
      header: 'Respuesta correcta',
      buttons: ['OK'],
    });
    await alert.present();
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
      message: `La Respuesta ingresada no es valida.`,
      buttons: ['OK'],
    });
    await alert.present();
  }

}
