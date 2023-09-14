import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {

  public usuario: Usuario | undefined;
  public respuesta: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,private router: Router,private alertController: AlertController) {
    this.activatedRoute.queryParams.subscribe(params => {
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

  

  ngOnInit() {
  }

  

  public PaginaValidarRespuestaSecreta(): void {
    // Verificar si usuario existe antes de acceder a sus propiedades
    if (this.usuario && this.usuario.respuestaSecreta === this.respuesta) {
      this.mostrarMensaje('Tu respuesta es correcta, Su contraseña es: ' + this.usuario.password);
    } else {
      this.mostrarMensaje('Tu respuesta es incorrecta,  ');
    }
  }


   public async mostrarMensaje(mensaje: string) {
    const alert = await this.alertController.create({
      message: mensaje,
      header:'Error!!!',
      subHeader: 'Verifica tu respuesta',
      buttons: ['OK']
    });
    await alert.present();
  }

  
}





