import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { showToast } from 'src/app/tools/message-routines';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('500ms ease-out', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class IngresoPage implements OnInit {
  
  // Variables
  correo = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  ingresar() {
    showToast('CLIC BOTÓN INGRESAR')
    this.authService.login(this.correo, this.password);
  }

  ingresarCorreoRecuperacion(): void {
    this.router.navigate(['/correo']);
  }

  ingresarCrearCuenta(){
    this.router.navigate(['/registrarme']);
  }
}
