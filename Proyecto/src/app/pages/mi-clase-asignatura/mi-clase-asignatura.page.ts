import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Navigation, NavigationExtras, Router } from '@angular/router';
import jsQR, { QRCode } from 'jsqr';
import { AlertController, LoadingController, AnimationController } from '@ionic/angular';


@Component({
  selector: 'app-mi-clase-asignatura',
  templateUrl: './mi-clase-asignatura.page.html',
  styleUrls: ['./mi-clase-asignatura.page.scss'], })
export class MiClaseAsignaturaPage implements OnInit, AfterViewInit {


  public json: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private animationController: AnimationController
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
  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;

  ngOnInit() {
  }

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
