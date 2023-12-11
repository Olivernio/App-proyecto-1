import { AuthService } from 'src/app/services/auth.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { DataBaseService } from 'src/app/services/data-base.service';
import { showAlertDUOC, showToast } from 'src/app/tools/message-routines';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-registrarme',
  templateUrl: './registrarme.page.html',
  styleUrls: ['./registrarme.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegistrarmePage implements OnInit {

  usuario = new Usuario();
  repeticionPassword = '';

  constructor(
    private authService: AuthService
    , private bd: DataBaseService
    , private router: Router) { }

  async ngOnInit() {
    this.authService.usuarioAutenticado.subscribe((usuario) => {
      if (usuario !== null) {
        this.usuario = usuario!;
        this.repeticionPassword = usuario!.password;
      }
    })
  }

  async msjErrorRegistrar(): Promise<void> {

    if (this.usuario.nombre.trim() === '' || this.usuario.nombre.trim() === ' ') {
      showAlertDUOC("¡Escriba su nombre!");
      return;
    } else if (this.usuario.nombre.length < 3) {
      showAlertDUOC("¡El nombre es muy corto!")
      return;
    } else if (this.usuario.nombre.length > 60) {
      showAlertDUOC("¡El nombre es muy largo!")
      return;
    }

    if (this.usuario.apellido.trim() === '' || this.usuario.apellido.trim() === ' ') {
      showAlertDUOC("¡Escriba su apellido]!");
      return;
    } else if (this.usuario.apellido.length < 3) {
      showAlertDUOC("¡El apellido es muy corto!")
      return;
    } else if (this.usuario.apellido.length > 60) {
      showAlertDUOC("¡El apellido es muy largo!")
      return;
    }

    const usu = await this.bd.leerUsuario(this.usuario.correo);

    if (this.usuario.correo.trim() === '' || this.usuario.correo.trim() === ' ') {
      showAlertDUOC("¡Escriba su correo!");
      return;
    } else if (!this.usuario.correo.includes("@") && !this.usuario.correo.includes(".")) {
      showAlertDUOC("¡El correo es inválido!")
      return;
    } else if (!this.usuario.correo.endsWith("@duocuc.cl")) {
      showAlertDUOC("El correo tiene que institucional (ejemplo@duocuc.cl)")
      return;
    } else if (usu?.correo.trim() == 'admin@duocuc.cl') {
      showAlertDUOC("Correo administrativo reservado.");
      return;
    } else if (usu?.correo) {
      showAlertDUOC("Este correo está en uso.");
      return;
    }

    if (this.usuario.preguntaSecreta.trim() === '' || this.usuario.preguntaSecreta.trim() === ' ') {
      showAlertDUOC("¡Escriba su pregunta secreta!")
      return;
    } else if (this.usuario.preguntaSecreta.length < 4) {
      showAlertDUOC("¡La pregunta secreta es muy corto!")
      return;
    } else if (this.usuario.preguntaSecreta.length > 30) {
      showAlertDUOC("¡La pregunta secreta es muy largo!")
      return;
    }

    if (this.usuario.respuestaSecreta.trim() === '' || this.usuario.respuestaSecreta.trim() === ' ') {
      showAlertDUOC("¡Escriba su respuesta secreta!")
      return;
    }

    if (this.usuario.password.trim() === '' || this.usuario.password.trim() === ' ') {
      showAlertDUOC("¡Escriba su contraseña!");
      return;
    } else if (this.usuario.password.length < 4) {
      showAlertDUOC("¡La contraseña es muy corta!");
      return;
    } else if (this.usuario.password.length > 40) {
      showAlertDUOC("¡La contraseña es muy larga!");
      return;
    }

    if (this.repeticionPassword.trim() === '' || this.repeticionPassword.trim() === ' ') {
      showAlertDUOC("¡Repita la contraseña!");
      return;
    } else if (this.usuario.password !== this.repeticionPassword) {
      showAlertDUOC(`¡Las contraseñas no son iguales!`);
      return;
    }

    this.bd.guardarUsuario(this.usuario);
    // this.authService.setUsuarioAutenticado(this.usuario);
    showToast('Ha sido registrado correctamente');
    this.router.navigate(['/ingreso']);
  }

  volver() {
    this.router.navigate(['/ingreso']);
  }



}
