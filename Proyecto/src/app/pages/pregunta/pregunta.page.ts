
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, NavigationExtras,RouterModule } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/model/usuario';
import { Storage } from '@ionic/storage-angular';
import { Subject } from 'rxjs';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterModule]
})
export class PreguntaPage implements OnInit {

  password = new Subject<string>();
  usuario = new Usuario();
  nombre = '';
  preguntaSecreta = '';
  respuesta = '';
  correo = '';

  constructor(private router: Router,private storage: Storage, private alertController: AlertController, private authService: AuthService) { }

  ngOnInit() {
    // Suscríbete al BehaviorSubject para obtener el usuario cuando esté disponible
    this.authService.usuarioAutenticado.subscribe((usuario) => {
      if (usuario) {
        this.usuario = usuario;
        this.nombre = usuario.nombre;
        this.preguntaSecreta = usuario.preguntaSecreta;
        this.correo = usuario.correo;
        
      }
    });
  }

  recuperarContrasena(){
    if (this.respuesta==this.usuario.respuestaSecreta){
      this.router.navigate(['/correcto']);
      this.authService.transmitirPasswordAndNombre(this.usuario.password, this.usuario.nombre);
    }else{
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
