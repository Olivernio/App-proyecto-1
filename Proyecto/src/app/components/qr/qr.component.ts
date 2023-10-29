import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { AlertController, LoadingController, AnimationController, IonicModule } from '@ionic/angular';
import { ActivatedRoute, Navigation, NavigationExtras, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import jsQR, { QRCode } from 'jsqr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]

})
export class QrComponent implements AfterViewInit {

  // --------------------------------------------- VARIABLES ---------------------------------------------

  // @Output() pestaña: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;

  @ViewChild('video', { static: false })
  private video!: ElementRef;

  @ViewChild('canvas', { static: false })
  private canvas!: ElementRef;

  public escaneando = false;
  public datosQR = '';
  public loading!: HTMLIonLoadingElement;

  public usuario: Usuario | undefined;

  public bloqueInicio: number = 0;
  public bloqueTermino: number = 0;
  public dia: string = 'Sin datos';
  public horaFin: string = 'Sin datos';
  public horaInicio: string = 'Sin datos';
  public idAsignatura: string = 'Sin datos';
  public nombreAsignatura: string = 'Sin datos';
  public nombreProfesor: string = 'Sin datos';
  public seccion: string = 'Sin datos';
  public sede: string = 'Sin datos';

  public constructor(
    private loadingController: LoadingController,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private animationController: AnimationController) {
    this.activatedRoute.queryParams.subscribe((params) => {
      const navigation: Navigation | null = this.router.getCurrentNavigation();
      if (navigation) {
        const state: any | undefined = navigation.extras.state;
        if (state) {
          if (state['usuario']) {
            this.usuario = state['usuario'];
          }
        }
      }
      if (!this.usuario) {
        this.router.navigate(['/']);
      }
    });
  }

  ngAfterViewInit(): void {
    this.limpiarDatos();

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

  public limpiarDatos(): void {
    this.escaneando = false;
    this.datosQR = '';
    // Este línea de código captura el ID del input de Subir QR como archivo ------- Queda la patá
    // (document.getElementById('input-file') as HTMLInputElement).value = '';
  }

  // --------------------------------------------- COMIENZO DEL ESCANEO QR - BOTÓN ---------------------------------------------
  public async comenzarEscaneoQR() {
    this.limpiarDatos();
    const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
    this.video.nativeElement.srcObject = mediaProvider;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.loading = await this.loadingController.create({});
    await this.loading.present();
    this.video.nativeElement.play();
    requestAnimationFrame(this.verificarVideo.bind(this));
  }

  public obtenerDatosQR(source?: CanvasImageSource): boolean {
    let w = 0;
    let h = 0;
    if (!source) {
      this.canvas.nativeElement.width = this.video.nativeElement.videoWidth;
      this.canvas.nativeElement.height = this.video.nativeElement.videoHeight;
    }

    w = this.canvas.nativeElement.width;
    h = this.canvas.nativeElement.height;
    //console.log(w + ' ' + h);

    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
    context.drawImage(source ? source : this.video.nativeElement, 0, 0, w, h);
    const img: ImageData = context.getImageData(0, 0, w, h);
    const qrCode: QRCode | null = jsQR(img.data, img.width, img.height, { inversionAttempts: 'dontInvert' });

    if (qrCode !== null) {
      this.escaneando = false;
      this.datosQR = qrCode.data;
      this.mostrarDatosQROrdenados(this.datosQR);
      return true;
    } else {
      // Manejar el caso en que qrCode sea null
      return false;
    }
  }

  async verificarVideo() {
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
      if (this.loading) {
        await this.loading.dismiss();
        this.escaneando = true;
      }
      if (this.obtenerDatosQR()) {
        console.log(1);
      } else {
        if (this.escaneando) {
          console.log(2);
          requestAnimationFrame(this.verificarVideo.bind(this));
        }
      }
    } else {
      console.log(3);
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }

  // --------------------------------------------- CUANDO LEE EL CÓDIGO QR, MANDARÁ LOS DATOS A LA OTRA PÁGINA ---------------------------------------------
  public mostrarDatosQROrdenados(datosQR: string): void {
    const objetoDatosQR = JSON.parse(datosQR);
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

    const navigationExtras: NavigationExtras = {
      state: { json: objetoDatosQR,}
    };
    // Realiza la redirección
    this.router.navigate(["mi-clase-asignatura"], navigationExtras);

    // ChatGPT ----------------
    // Realiza algún proceso para obtener un nuevo valor
    // const pestaña = 'miclase';
    // Emite el nuevo valor al componente padre (la página)
    // this.pestaña.emit(pestaña);

  }

  public detenerEscaneoQR(): void {
    this.escaneando = false;
  }

}

