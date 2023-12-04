import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { showToast } from 'src/app/tools/message-routines';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class CorreoPage implements OnInit {

  // Variables
  correo = '';

  constructor(private router: Router, private alertController: AlertController, private authService: AuthService) { }

  ngOnInit() {
  }

  /**
   * Valida el correo al Services y si el correo es válido, le redirecciona a la página /correo.
   */
  async recuperarContrasena() {
    const correoValido = await this.authService.verificacionCorreo(this.correo);
    if (correoValido && this.correo.trim() !== 'admin') {
      this.router.navigate(['/pregunta']);
    }
    else if (this.correo == '' || this.correo == ' ' || this.correo.trim() === 'admin') {
      showToast('Escriba su correo institucional (DuocUC)');
    }
    else {
      this.correo = '';
      this.router.navigate(['/incorrecto']);
    }
  }

  /**
   * Redirección a la página de /ingreso.
   */
  volver() {
    this.router.navigate(['/ingreso']);
  }


}

