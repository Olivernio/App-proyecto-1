import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { APIClientService, Publicacion } from 'src/app/services/apiclient.service';
import { AuthService } from 'src/app/services/auth.service';
import { showAlertDUOC, showAlertError, showAlertYesNoDUOC } from 'src/app/tools/message-routines';
import { AlertController } from '@ionic/angular';
import { DataBaseService } from 'src/app/services/data-base.service';
import { MessageEnum } from 'src/app/tools/message-enum';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
  providers: [HttpClient, HttpClientModule],
  standalone: true,
})
export class AdminComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuario: Usuario | null = null;
  constructor(
    private authService: AuthService
    , private bd: DataBaseService
    , private api: APIClientService
    , private alertController: AlertController) { }


  async ngOnInit() {

    this.authService.usuarioAutenticado.subscribe((usuario) => {
      if (usuario !== null) {
        this.usuario = usuario;
      }
    });

    this.bd.traerListaUsuarios()
      .then((usuarios) => {
        this.usuarios = usuarios;
      });
  }

  tarjetaSeleccionada: number | null = null;
  usuariosEliminados: Set<number> = new Set<number>();

  async eliminarUsuario(usuario: Usuario, i: number) {

    const alert = await this.alertController.create({
      header: '¿Quieres eliminar la Publicacion?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: async () => {
            await this.bd.eliminarUsuarioUsandoCorreo(usuario.correo);
            this.usuariosEliminados.add(i); // Agrega el índice al conjunto de usuarios eliminados
            this.tarjetaSeleccionada = i;
            this.setOpenEliminada(true);
          },
        },
      ],
    });
    await alert.present();
  }

  public toastButtons = [
    {
      text: 'Descartar',
      role: 'cancel',
    },
  ];

  isToastOpenEliminada = false;
  setOpenEliminada(isOpenEliminada: boolean) {
    this.isToastOpenEliminada = isOpenEliminada;
  }

}
