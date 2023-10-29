import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController, AlertController, AnimationController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CorreoPage implements OnInit {

  @ViewChild('body', { read: ElementRef }) body!: ElementRef;

  public usuario: Usuario | undefined;
  public error: boolean = false;
  public correo: string = 'd.gomez@duocuc.cl';

  constructor(private dataBaseService: DataBaseService
            , private authService: AuthService
            , private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
  }

  public async ingresarPaginaValidarRespuestaSecreta(): Promise<void> {
    const usu = await this.dataBaseService.leerUsuario(this.correo);
    if (usu) {
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: usu
        }
      };
      this.router.navigate(['pregunta'], navigationExtras);
    }else {
      this.router.navigate(['incorrecto']);
    }
  }

  // Botón de volver
  public volver(): void {
    this.router.navigate(['/']);
  }

}
