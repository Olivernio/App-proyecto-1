import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { AlertController, ToastController} from '@ionic/angular';
@Component({
  selector: 'app-correcta',
  templateUrl: './correcta.page.html',
  styleUrls: ['./correcta.page.scss'],
})

export class CorrectaPage implements OnInit {
  public usuario: Usuario | undefined;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,)
  {
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log("Contructor");
      const navigation: Navigation | null = this.router.getCurrentNavigation();
      if (navigation) {
        console.log("Se declara STATE");
        const state: any | undefined = navigation.extras.state;
        if (state) {
        console.log("IF del STATE");
          if (state['usuario']) {
            this.usuario = state['usuario'];
            console.log("Coso usuario : " + this.usuario);
          }
        }
      }
    });
  }
  ngOnInit() { }

  // public PaginaValidarRespuestaSecreta(): void {
  //   if (this.usuario && this.usuario.respuestaSecreta === this.respuesta) {
  //     this.router.navigate(['/correcta']); 
  //   } else if (this.usuario && this.respuesta === '' || this.usuario && this.respuesta === ' ') {
  //     this.mostrarMensajeTostada('Escriba la respuesta');
  //   } else {
  //     this.router.navigate(['/incorrecta']); 
  //     ;
  //   }
  // }
//   async mostrarMensajeTostada(mensaje: string, duracion?: number) {
//     const toast = await this.toastController.create({
//       message: mensaje,
//       duration: duracion ? duracion : 2000,
//       icon: "alert"
//     });
//     toast.present();
// }
}