import { AuthService } from 'src/app/services/auth.service';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, AnimationController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { DataBaseService } from 'src/app/services/data-base.service';
import { showAlertDUOC, showToast } from 'src/app/tools/message-routines';

@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.component.html',
  styleUrls: ['./misdatos.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
  standalone: true,
})
export class MisdatosComponent implements OnInit {

  @ViewChild('welcome', { read: ElementRef }) itemWelcome!: ElementRef;
  @ViewChild('welcomeNombre', { read: ElementRef }) itemWelcomeNombre!: ElementRef;

  ngAfterViewInit(): void {

    if (this.itemWelcome) {
      const animation = this.animationController
        .create()
        .addElement(this.itemWelcome.nativeElement)
        .iterations(1)
        .duration(1000)
        .fromTo('transform', 'translate(-100%)', 'translate(0)')
        .fromTo('opacity', .6, 1);

      animation.play();
    }
    if (this.itemWelcomeNombre) {
      const animation = this.animationController
        .create()
        .addElement(this.itemWelcome.nativeElement)
        .iterations(1)
        .duration(1000)
        .fromTo('opacity', .6, 1);

      animation.play();
    }
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: '¿Estás seguro?',
      message: '¿Quieres actualizar tus datos?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Aceptar',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.actualizarPerfil(); // Llama a tu función de actualización de perfil aquí
          },
        },
      ],
    });

    await alert.present();
  }

  usuario = new Usuario();
  // nombre: string = '';
  // apellido: string = '';
  // preguntaSecreta: string = '';
  // respuestaSecreta: string = '';
  // password: string = '';
  repeticionPassword = '';

  constructor(private authService: AuthService, private bd: DataBaseService, private alertController: AlertController, private animationController: AnimationController) { }

  async ngOnInit() {
    this.authService.usuarioAutenticado.subscribe((usuario) => {
      if (usuario !== null) {
        console.log(usuario);
        this.usuario = usuario;
        this.repeticionPassword = usuario.password;
      }
    })
  }

  actualizarPerfil() {

    this.bd.guardarUsuario(this.usuario);
    this.authService.setUsuarioAutenticado(this.usuario);
    showToast('Sus datos fueron actualizados');

  }

  async msjErrorActualizarPerfil(): Promise<void> {

    if (this.usuario.nombre.trim() === '' || this.usuario.nombre.trim() === ' ') {
      showAlertDUOC("¡Escriba su nombre!");
      return;
    } else if (this.usuario.nombre.length < 3) {
      showAlertDUOC("¡El nombre es muy corto!")
      return;
    } else if (this.usuario.nombre.length > 30) {
      showAlertDUOC("¡El nombre es muy largo!")
      return;
    }

    if (this.usuario.apellido.trim() === '' || this.usuario.apellido.trim() === ' ') {
      showAlertDUOC("¡Escriba su apellido!");
      return;
    } else if (this.usuario.apellido.length < 3) {
      showAlertDUOC("¡El apellido es muy corto!")
      return;
    } else if (this.usuario.apellido.length > 30) {
      showAlertDUOC("¡El apellido es muy largo!")
      return;
    }

    if (this.usuario.preguntaSecreta.trim() === '' || this.usuario.preguntaSecreta.trim() === ' ') {
      showAlertDUOC("¡Escriba su pregunta secreta!")
      return;
    } else if (this.usuario.preguntaSecreta.length < 4) {
      showAlertDUOC("¡La pregunta secreta es muy corto!")
      return;
    } else if (this.usuario.preguntaSecreta.length > 30) {
      showAlertDUOC("¡La pregunta secreta es muy largo!")
      return;
    }

    if (this.usuario.respuestaSecreta.trim() === '' || this.usuario.respuestaSecreta.trim() === ' ') {
      showAlertDUOC("¡Escriba su respuesta secreta!")
      return;
    }

    if (this.usuario.password.trim() === '' || this.usuario.password.trim() === ' ') {
      showAlertDUOC("¡Escriba su contraseña!");
      return;
    } else if (this.usuario.password.length < 4) {
      showAlertDUOC("¡La contraseña es muy corta!");
      return;
    } else if (this.usuario.password.length > 40) {
      showAlertDUOC("¡La contraseña es muy larga!");
      return;
    }

    if (this.repeticionPassword.trim() === '' || this.repeticionPassword.trim() === ' ') {
      showAlertDUOC("¡Repita la contraseña!");
      return;
    } else if (this.usuario.password !== this.repeticionPassword) {
      showAlertDUOC(`¡Las contraseñas no son iguales!`);
      return;
    }


    if (this.usuario.nombre && this.usuario.apellido && this.usuario.preguntaSecreta && 
      this.usuario.respuestaSecreta && this.usuario.password == this.repeticionPassword) {
    this.presentAlertConfirm();
  } else {
    showAlertDUOC('Por favor complete todos los campos.');
  }
  }

}
