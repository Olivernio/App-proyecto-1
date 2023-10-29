import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
    if (correoValido) {
      this.router.navigate(['/pregunta']);
    }
  }

  /**
   * Redirección a la página de /ingreso.
   */
  volver() {
    this.router.navigate(['/ingreso']);
  }


}

