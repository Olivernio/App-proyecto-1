import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Navigation, NavigationExtras, Router } from '@angular/router';
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

  public volver(): void {
    this.router.navigate(['/']);
  }

  public PaginaValidarRespuestaSecreta(): void {
    if (this.usuario && this.usuario.respuestaSecreta === this.respuesta) {
      this.router.navigate(['/correcta']); 
      const nagigationExtras: NavigationExtras = {
        state: {
          usuario: this.usuario
        }
      };
      
    } else if (this.usuario && this.respuesta === '' || this.usuario && this.respuesta === ' ') {
      this.mostrarMensajeTostada('Escriba la respuesta');
    } else {
      this.router.navigate(['/incorrecta']); 
      ;
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
