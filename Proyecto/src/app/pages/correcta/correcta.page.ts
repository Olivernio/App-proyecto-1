import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { AlertController, ToastController} from '@ionic/angular';
@Component({
  selector: 'app-correcta',
  templateUrl: './correcta.page.html',
  styleUrls: ['./correcta.page.scss'],
})

export class CorrectaPage implements OnInit {
  public usuario: Usuario | undefined;

  constructor(private activatedRoute: ActivatedRoute, private router: Router)
  {
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
      if (!this.usuario) {
        this.router.navigate(['/']);
      }
    });
  }
  ngOnInit() { }

}