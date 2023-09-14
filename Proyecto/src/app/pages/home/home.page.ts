import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Navigation, NavigationExtras, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import jsQR, { QRCode } from 'jsqr';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {

  @ViewChild('video', { static: false })
  private video!: ElementRef;

  @ViewChild('canvas', { static: false })
  private canvas!: ElementRef;

  @ViewChild('fileinput', { static: false })
  private fileinput!: ElementRef;

  public escaneando = false;
  public datosQR = '';
  public loading!: HTMLIonLoadingElement;

  public usuario: Usuario | undefined;

  public bloqueInicio: number = 0;
  public bloqueTermino: number = 0;
  public dia: string = '';
  public horaFin: string = '';
  public horaInicio: string = '';
  public idAsignatura: string = '';
  public nombreAsignatura: string = '';
  public nombreProfesor: string = '';
  public seccion: string = '';
  public sede: string = '';

  public constructor(
    private loadingController: LoadingController,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
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

  ngAfterViewInit() {
    this.limpiarDatos();
  }

  public limpiarDatos(): void {
    this.escaneando = false;
    this.datosQR = '';
    (document.getElementById('input-file') as HTMLInputElement).value = '';
  }

  public async comenzarEscaneoQR() {
    this.limpiarDatos();
    const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
      video: {facingMode: 'environment'}
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
      state: {json: objetoDatosQR} // Puedes pasar datos adicionales al estado si es necesario
    };
    // Realiza la redirección
    this.router.navigate(["mi-clase-asignatura"], navigationExtras);

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

  public detenerEscaneoQR(): void {
    this.escaneando = false;
  }

  // Botón para cargar desde imagen/archivo (local)
  public cargarImagenDesdeArchivo(): void {
    this.limpiarDatos();
    this.fileinput.nativeElement.click();
  }

  public verificarArchivoConQR(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      const file = files.item(0);
      if (file) {
        const img = new Image();
        img.onload = () => {
          this.obtenerDatosQR(img);
        };
        img.src = URL.createObjectURL(file);
      }
    }
  }

  // Botón de volver
  public volver(): void {
    this.router.navigate(['/']);
  }

}
