import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PreguntaPage implements OnInit {

  public usuario: Usuario | undefined;
  public respuesta: string = '';

  constructor(private activatedRoute: ActivatedRoute
            , private router: Router
            , private alertController: AlertController
            , private toastController: ToastController) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation) {
      const state = navigation.extras.state;
      if (state && state['usuario']) {
        this.usuario = state['usuario'];
      }
    }
  }

  ngOnInit() {}

  public PaginaValidarRespuestaSecreta(): void {
    if (this.usuario && this.usuario.respuestaSecreta === this.respuesta) {

      const navigationExtras: NavigationExtras = {
        state: { usuario: this.usuario }
      };
      // Realiza la redirección
      this.router.navigate(["correcto"], navigationExtras);

    } else if (this.usuario && this.respuesta === '' || this.usuario && this.respuesta === ' ') {
      this.mostrarMensajeTostada('Escriba la respuesta');
    } else {
        const navigationExtras: NavigationExtras = {
          state: { usuario: this.usuario }
        };
        // Realiza la redirección
        this.router.navigate(["incorrecto"], navigationExtras);
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

  public volver(): void {
    this.router.navigate(['/']);
  }

}
