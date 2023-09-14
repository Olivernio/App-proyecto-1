import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { AlertController, ToastController} from '@ionic/angular';


@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {
  public usuario: Usuario | undefined;
  public respuesta: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      const navigation: Navigation | null = this.router.getCurrentNavigation();
      if (navigation) {
        const state: any | undefined = navigation.extras.state;
        if (state) {
          if (state['usuario']) {
            this.usuario = state['usuario'];
          } else {
            this.router.navigate(['/login']);
          }
        } else {
          this.router.navigate(['/login']);
        }
      }
    });
  }

  ngOnInit() { }

  public PaginaValidarRespuestaSecreta(): void {
    // Verificar si usuario existe antes de acceder a sus propiedades
    if (this.usuario && this.usuario.respuestaSecreta === this.respuesta) {
      // Si la respuesta es correcta, le mostrará la contraseña del usuario
      this.mostrarMensajeCorrecto('Tu contraseña es: ' + this.usuario.password);
    } else if (this.usuario && this.respuesta === '' || this.usuario && this.respuesta === ' ') {
      // Si la respuesta está vacía, se lo indicará al usuario
      this.mostrarMensajeTostada('Escriba la respuesta');
    } else {
      // Si la respuesta es incorrecta
      this.mostrarMensajeIncorrecto(
        'Tu respuesta es incorrecta, Verifica tu respuesta'
      );
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
      message: `<img src="assets/image/correcto.png" />`,
      header: 'Responde la pregunta',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
