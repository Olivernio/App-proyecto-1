import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {

  public usuario: Usuario | undefined;
  public respuesta: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      // Verificar si extras y state existen antes de acceder a sus propiedades
      const state = this.router.getCurrentNavigation()?.extras.state;
      if (state) {
        // Verificar si usuario existe antes de acceder a sus propiedades
        if (state['usuario']) {
          this.usuario = state['usuario'];
        } else {
          this.router.navigate(['/login']);
        }
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {
  }

  

  public PaginaValidarRespuestaSecreta(): void {
    // Verificar si usuario existe antes de acceder a sus propiedades
    if (this.usuario && this.usuario.respuestaSecreta === this.respuesta) {
      alert('Tu respuesta es correcta, Su contraseña es: ' + this.usuario.password);
    } else {
      alert('Tu respuesta es incorrecta ');
    }
  }
}
