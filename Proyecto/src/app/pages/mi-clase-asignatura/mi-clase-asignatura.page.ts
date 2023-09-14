import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Navigation, NavigationExtras, Router } from '@angular/router';
import jsQR, { QRCode } from 'jsqr';

@Component({
  selector: 'app-mi-clase-asignatura',
  templateUrl: './mi-clase-asignatura.page.html',
  styleUrls: ['./mi-clase-asignatura.page.scss'],
})
export class MiClaseAsignaturaPage implements OnInit {

  public json: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
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

  ngOnInit() {
  }

  public bloqueInicio: number = 0;
  public bloqueTermino: number = 0;
  public dia: string = "";
  public horaFin: string = "";
  public horaInicio: string = "";
  public idAsignatura: string = "";
  public nombreAsignatura: string = "";
  public nombreProfesor: string = "";
  public seccion: string = "";
  public sede: string = "";


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


}
