import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Navigation, NavigationExtras, Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.component.html',
  styleUrls: ['./miclase.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MiclaseComponent  implements OnInit {

  public json: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      const navigation: Navigation | null = this.router.getCurrentNavigation();
      if (navigation) {
        const state: any | undefined = navigation.extras.state;
        if (state) {
          if (state['json']) {
            this.json = state['json'];
            this.mostrarDatosQROrdenados(this.json);
          }
        }
      }
    });
  }

  ngOnInit() {}

  public bloqueInicio: number = 0;
  public bloqueTermino: number = 0;
  public dia: string = "Sin datos";
  public horaFin: string = "Sin datos";
  public horaInicio: string = "Sin datos";
  public idAsignatura: string = "Sin datos";
  public nombreAsignatura: string = "Sin datos";
  public nombreProfesor: string = "Sin datos";
  public seccion: string = "Sin datos";
  public sede: string = "Sin datos";
  public handlerMessage = "Sin datos";
  public roleMessage = "Sin datos";

  public mostrarDatosQROrdenados(objetoDatosQR: any): void {
    this.bloqueInicio = objetoDatosQR.bloqueInicio;
    this.bloqueTermino = objetoDatosQR.bloqueTermino;
    this.dia = objetoDatosQR.dia;
    this.horaFin = objetoDatosQR.horaFin;
    this.horaInicio = objetoDatosQR.horaInicio;
    this.idAsignatura = objetoDatosQR.idAsignatura;
    this.nombreAsignatura = objetoDatosQR.nombreAsignatura;
    this.nombreProfesor = objetoDatosQR.nombreProfesor;
    this.seccion = objetoDatosQR.seccion;
    this.sede = objetoDatosQR.sede;
  }
  
  ngAfterViewInit(): void {}

  // Botón de volver
  public volver(): void {
    this.router.navigate(['/']);
  }

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
            this.router.navigate(['/']);
          },
        },
      ],
    });

    await alert.present();
    
  }

}
