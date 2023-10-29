import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { PreguntaPage } from '../pregunta/pregunta.page';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
@Component({
  selector: 'app-incorrecto',
  templateUrl: './incorrecto.page.html',
  styleUrls: ['./incorrecto.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class IncorrectoPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public volver(): void {
    this.router.navigate(['/']);
  }
}
