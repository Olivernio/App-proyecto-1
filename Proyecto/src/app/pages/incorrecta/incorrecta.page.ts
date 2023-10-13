import { Component, OnInit } from '@angular/core';
import { PreguntaPage } from '../pregunta/pregunta.page';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-incorrecta',
  templateUrl: './incorrecta.page.html',
  styleUrls: ['./incorrecta.page.scss'],
})
export class IncorrectaPage implements OnInit {
  public usuario: Usuario | undefined;
  public respuesta: string = '';

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController) {
      this.activatedRoute.queryParams.subscribe((params) => {
        const navigation: Navigation | null = this.router.getCurrentNavigation();
        if (navigation) {
          const state: any | undefined = navigation.extras.state;
          if (state) {
            if (state['usuario']) {
              this.usuario = state['usuario'];
            }
          }
        }
      });
    }

  ngOnInit() {
  }

  public volver(): void {
    this.router.navigate(['/']);
  }

}
