import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Navigation, NavigationExtras, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {
  public usuario: Usuario | undefined;
  public respuesta: string = '';
  public intento: number = 3;

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
          }
        }
      }
      if (!this.usuario) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit() {
    this.intento = 3;
  }

  public volver(): void {
    this.router.navigate(['/']);
  }

  public PaginaValidarRespuestaSecreta(): void {
    if (this.usuario && this.usuario.respuestaSecreta === this.respuesta) {

      const navigationExtras: NavigationExtras = {
        queryParams: {}, // Puedes agregar parámetros de consulta si es necesario
        state: { usuario: this.usuario } // Puedes pasar datos adicionales al estado si es necesario
      };
      // Realiza la redirección
      this.router.navigate(["correcta"], navigationExtras);

    } else if (this.usuario && this.respuesta === '' || this.usuario && this.respuesta === ' ') {
      this.mostrarMensajeTostada('Escriba la respuesta');
    } else {
      if (this.intento < 1) {
        this.intento = 3;
        this.router.navigate(['/incorrecta']);
        const navigationExtras: NavigationExtras = {
          queryParams: {}, // Puedes agregar parámetros de consulta si es necesario
          state: { usuario: this.usuario } // Puedes pasar datos adicionales al estado si es necesario
        };
        // Realiza la redirección
        this.router.navigate(["incorrecta"], navigationExtras);
      } else {
        this.mostrarMensajeTostada('¡Te quedan ' + this.intento + ' intentos restantes!')
        this.intento -= 1;
      }
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

}
