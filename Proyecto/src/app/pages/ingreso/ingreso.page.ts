import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { DataBaseService } from 'src/app/services/data-base.service';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/model/Usuario';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class IngresoPage implements OnInit {

  correo = 'd.gomez@duocuc.cl';
  password = '1234';

  error: boolean = false;
  public usuario: Usuario;
  constructor(private router: Router, private toastController: ToastController, private authService: AuthService, private dataBaseService: DataBaseService) {
    this.usuario = new Usuario(); //Dice que pide 0, pero en la base de datos, y  en el modelo, son 8 del usuairo. Si se añaden los 8 datos, sale error.

  }

  ngOnInit() {
  }

  ingresar() {
    this.dataBaseService.leerUsuarios();
    this.authService.login(this.correo, this.password);
  }

  public ingresarcorreorecuperacion(): void {
    this.router.navigate(['/correo']);
  }

}
