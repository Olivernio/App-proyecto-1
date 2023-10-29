import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { showToast } from 'src/app/tools/message-routines';
import { Usuario } from '../model/usuario';
import { Storage } from '@ionic/storage-angular';
import { DataBaseService } from './data-base.service';




@Injectable()

export class AuthService {

  keyUsuario = 'USUARIO_AUTENTICADO';
  usuarioAutenticado = new BehaviorSubject<Usuario | null>(null);
  private passSubject = new BehaviorSubject<string>('');
  private nombreSubject = new BehaviorSubject<string>('');
  password = this.passSubject.asObservable();
  nombre = this.nombreSubject.asObservable();

  constructor(private router: Router, private bd: DataBaseService, private storage: Storage) { }

  inicializarAutenticacion() {
    this.storage.create();
  }

  async isAuthenticated(): Promise<boolean> {
    return await this.leerUsuarioAutenticado().then(usuario => {
      return usuario !== null;
    });
  }

  async login(correo: string, password: string) {
    await this.storage.get(this.keyUsuario).then(async (usuarioAutenticado) => {
      if (usuarioAutenticado) {
        this.bd.actualizarSesionActiva(correo, 'S');
        this.storage.set(this.keyUsuario, usuarioAutenticado);
        this.usuarioAutenticado.next(usuarioAutenticado);
        this.router.navigate(['inicio']);
      } else {
        await this.bd.validarUsuario(correo, password).then(async (usuario: Usuario | undefined) => {
          if (usuario) {
            showToast(`¡Bienvenido(a) ${usuario.nombre} ${usuario.apellido}!`);
            this.bd.actualizarSesionActiva(correo, 'S');
            this.storage.set(this.keyUsuario, usuario);
            this.usuarioAutenticado.next(usuario);
            this.router.navigate(['inicio']);
          } else {
            showToast(`El correo o la password son incorrectos`);
            this.router.navigate(['ingreso']);
          }
        });
      }
    });
  }

  async logout() {
    this.leerUsuarioAutenticado().then((usuario) => {
      if (usuario) {
        showToast(`¡Hasta pronto ${usuario.nombre} ${usuario.apellido}!`);
        this.bd.actualizarSesionActiva(usuario.correo, 'N');
        this.storage.remove(this.keyUsuario);
        this.usuarioAutenticado.next(null);
        this.router.navigate(['ingreso']);
      } else {
        this.router.navigate(['ingreso']);
      }
    })
  }

  async leerUsuarioAutenticado(): Promise<Usuario | undefined> {
    const usuario = await this.storage.get(this.keyUsuario).then(usuario => usuario as Usuario);
    this.usuarioAutenticado.next(usuario);
    return usuario;
  }

  setUsuarioAutenticado(usuario: Usuario) {
    this.storage.set(this.keyUsuario, usuario);
    this.usuarioAutenticado.next(usuario);
  }


  async verificacionCorreo(correo: string) {
    try {
      // Verificar si el correo es válido
      const usuario: Usuario | undefined = await this.isValidEmail(correo);
      if (!usuario) {
        showToast('La dirección de correo electrónico no es válida');
        return false; // Retorna false si el correo no es válido
      } else {
        this.usuarioAutenticado.next(usuario);
        return true; // Retorna true si el correo es válido
      }
    } catch (error) {
      console.error('Error al verificar el correo:', error);
      showToast('Ocurrió un error al verificar el correo');
      return false; // Retorna false en caso de error
    }
  }
  // Función de verificación de correo electrónico
  private async isValidEmail(correo: string): Promise<Usuario | undefined> {
    const usuario: Usuario | undefined = await this.bd.validarCorreo(correo);
    return usuario;
  }

  // funcion donde envia a contraseña a la page correcto
  transmitirPasswordAndNombre(password: string, nombre: string) {
    this.passSubject.next(password);
    this.nombreSubject.next(nombre);
  }

}