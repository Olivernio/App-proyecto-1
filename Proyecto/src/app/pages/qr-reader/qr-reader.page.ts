import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Asistencia } from "src/app/model/asistencia";
import jsQR, { QRCode } from "jsqr";

@Component({
  selector: "app-qr-reader",
  templateUrl: "./qr-reader.page.html",
  styleUrls: ["./qr-reader.page.scss"],
})
export class QrReaderPage implements OnInit {
  @ViewChild("video")
  private video!: ElementRef;

  @ViewChild("canvas")
  private canvas!: ElementRef;

  @ViewChild('fileinput',{static:false})

  public asistencia: Asistencia = new Asistencia();
  public escaneando = false;
  public datosQR: String = "";
  
  public constructor() {
   
  }
  
  ngOnInit() {}
  public async comenzarEscaneoQR() {
    const mediaProvider: MediaProvider =
      await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
    this.video.nativeElement.srcObject = mediaProvider;
    this.video.nativeElement.setAttribute("playsinline", "true");
    this.video.nativeElement.play();
    this.escaneando = true;
    requestAnimationFrame(this.verificarVideo.bind(this));
  }
  async verificarVideo() {
    if (
      this.video.nativeElement.readyState ===
      this.video.nativeElement.HAVE_ENOUGH_DATA
    ) {
      if (this.obtenerDatosQR() || !this.escaneando) return;
      requestAnimationFrame(this.verificarVideo.bind(this));
    } else {
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }

  public obtenerDatosQR(): boolean {
    const w: number = this.video.nativeElement.videoWidth;
    const h: number = this.video.nativeElement.videoHeight;
    this.canvas.nativeElement.width = w;
    this.canvas.nativeElement.height = h;
    const context: CanvasRenderingContext2D =
      this.canvas.nativeElement.getContext("2d");
    context.drawImage(this.video.nativeElement, 0, 0, w, h);
    const img: ImageData = context.getImageData(0, 0, w, h);
    let qrCode: QRCode | null = jsQR(img.data, w, h, {
      inversionAttempts: "dontInvert",
    });
    if (qrCode) {
      if (qrCode.data !== "") {
        this.escaneando = false;
        this.obtenerDatosQRAAAA(qrCode.data);
        return true;
      }
    }
    return false;
  }

  public obtenerDatosQRAAAA(datosQR: string): void {
    this.datosQR = datosQR;
    const obtenerDatosQR = JSON.parse(datosQR);
  }
  public detenerEscaneoQR(): void {
    this.escaneando = false;
  }
}
