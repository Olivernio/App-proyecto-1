import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, NavigationExtras, RouterModule } from '@angular/router';
import { DataBaseService } from 'src/app/services/data-base.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
  standalone: true,

  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})


export class IngresoPage implements OnInit {

  // Variables
  correo = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  ingresar() {
    this.authService.login(this.correo, this.password);
  }

  public ingresarcorreorecuperacion(): void {
    this.router.navigate(['/correo']);
  }
}
