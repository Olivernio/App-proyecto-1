import { AuthService } from 'src/app/services/auth.service';
import { Component, ElementRef, NgModule, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnimationController, AlertController, IonicModule } from '@ionic/angular';
import { QrComponent } from 'src/app/components/qr/qr.component';
import { MiclaseComponent } from 'src/app/components/miclase/miclase.component';
import { ForoComponent } from 'src/app/components/foro/foro.component';
import { MisdatosComponent } from 'src/app/components/misdatos/misdatos.component';
import { DataBaseService } from 'src/app/services/data-base.service';
import { APIClientService } from 'src/app/services/apiclient.service';
import { Usuario } from 'src/app/model/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    QrComponent,
    MiclaseComponent,
    ForoComponent,
    MisdatosComponent
  ]
})
export class InicioPage implements OnInit {

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;

  usuario = new Usuario();
  componente_actual = 'qr';

  constructor(private authService: AuthService
            , private bd: DataBaseService
            , private api: APIClientService
            , private animationController: AnimationController
            , private alertController: AlertController
            , private router: Router) { }

  ngOnInit() {
    this.componente_actual = 'qr';
    this.bd.datosQR.next('');
    this.authService.usuarioAutenticado.subscribe((usuario) => {
      if (usuario !== null) {
        this.usuario = usuario!;
      }
    })
  }

  ngAfterViewInit(): void {

    if (this.itemTitulo) {
      const animation = this.animationController
        .create()
        .addElement(this.itemTitulo.nativeElement)
        .iterations(Infinity)
        .duration(7000)
        .fromTo('transform', 'translate(-100%)', 'translate(110%)')
        .fromTo('opacity', 1, 0.6);

      animation.play();
    }
  }

  cambiarComponente(nombreComponente: string) {
    this.componente_actual = nombreComponente;
    if (this.componente_actual === 'foro') this.api.cargarPublicaciones();
    if (this.componente_actual === 'misdatos') this.authService.leerUsuarioAutenticado();
  }

  /**
   * ALERTA CONDICIONAL. [OK] -> CERRAR SESIÓN
   */
  async preguntaCerrarSesion() {
    const alert = await this.alertController.create({
      header: '¿Quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.cerrarSesion();
          },
        },
      ],
    });

    await alert.present();

  }

  cerrarSesion() {
    this.authService.logout();
  }

}
