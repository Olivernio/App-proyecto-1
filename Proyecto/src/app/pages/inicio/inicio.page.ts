import { Component, ElementRef, NgModule, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { AnimationController, AlertController, IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { QrComponent } from 'src/app/components/qr/qr.component';
import { MiclaseComponent } from 'src/app/components/miclase/miclase.component';
import { ForoComponent } from 'src/app/components/foro/foro.component';
import { MisdatosComponent } from 'src/app/components/misdatos/misdatos.component';
import { AuthService } from 'src/app/services/auth.service';

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

  // --------------------------------------------- VARIABLES ---------------------------------------------

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  componente_activa = 'qr';
  
  // ChatGPT
  // public pestaña: string = 'qr';
  // public cambiarDataDesdeComponente(pestaña: string) {
  //   this.componente_activa = 'pestaña';
  // }

  constructor(private authService: AuthService
            , private animationController: AnimationController
            , private alertController: AlertController
            , private router: Router) { }

  ngOnInit() {
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

  cambiarComponente(event: any) {
    this.componente_activa = event.detail.value;
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
