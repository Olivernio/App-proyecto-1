import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core'; // , AfterViewInit
import { Router, NavigationExtras } from '@angular/router';
import { ToastController, AlertController, AnimationController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';


@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
})
export class CorreoPage implements OnInit, AfterViewInit {

  @ViewChild('body', { read: ElementRef }) body!: ElementRef;

  public usuario: Usuario | undefined;
  public error: boolean = false;
  public correo: string = '';

  constructor(private router: Router, private alertController: AlertController, private toastController: ToastController, private animationController: AnimationController) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

    // const animation = this.animationController
    //   .create()
    //   .addElement(this.body.nativeElement)
    //   .iterations(1)
    //   .duration(500)
    //   .fromTo('transform', 'translate(-100%)', 'translate(0)')
    //   .fromTo('opacity', 0.3, 1);

    // animation.play();
  }

  public ingresarPaginaValidarRespuestaSecreta(): void {
    const usuario = new Usuario('', '', '', '', '', '');
    const usuarioEncontrado = usuario.buscarUsuarioValidoCorreo(this.correo);
    if (usuarioEncontrado) {
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: usuarioEncontrado
        }
      };
      this.router.navigate(['/pregunta'], navigationExtras);
      // } else if (this.correo == '' || this.correo == ' ') {
      //   this.mostrarMensajeTostada('Por favor, ingrese su correo institucional');
    }else {
      this.router.navigate(['/incorrecta']);
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

  // Botón de volver
  public volver(): void {
    this.router.navigate(['/']);
  }

  efectoError(): void {
    this.error = true;

    setTimeout(() => {
      this.error = false;
    }, 2000); // 3000 milisegundos = 3 segundos
  }

}
