import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { APIClientService, Publicacion } from 'src/app/services/apiclient.service';
import { AuthService } from 'src/app/services/auth.service';
import { showAlertDUOC, showAlertError } from 'src/app/tools/message-routines';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
  providers: [HttpClient, HttpClientModule],
  standalone: true,
})
export class ForoComponent implements OnInit  {

  @ViewChild("topOfPage") topOfPage!: ElementRef;

  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Nueva Publicación',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Título'
        },
        {
          name: 'contenido',
          type: 'textarea',
          placeholder: 'Contenido',
          attributes: {
            multiline: true,
            rows: 5
          }
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Publicar',
          handler: (data) => {
            this.publicacion.titulo = data.titulo;
            this.publicacion.contenido = data.contenido;
            this.guardarPublicacion();
          }
        }
      ]
    });

    await alert.present();
  }


  usuario = new Usuario();
  publicacion: Publicacion = {
    id: '',
    correo: '',
    nombre: '',
    apellido: '',
    titulo: '',
    contenido: ''
  };
  publicaciones: any;

  constructor(private authService: AuthService, private api: APIClientService, private alertController: AlertController) {
    this.api.listaPublicaciones.subscribe((publicaciones) => {
      publicaciones.reverse(); // Ordenar de más nueva a mán antigua
      this.publicaciones = publicaciones;
    });
  }

  async ngOnInit() {
    const usu = await this.authService.leerUsuarioAutenticado();
    this.usuario = usu!;
    this.limpiarPublicacion();


    this.authService.usuarioAutenticado.subscribe((usuario) => {
      if (usuario !== null) {
        this.usuario = usuario!;
      }
    })

  }

  setPublicacion(id: string, correo: string, nombre: string, apellido: string, titulo: string, contenido: string) {
    this.publicacion.id = id;
    this.publicacion.correo = correo;
    this.publicacion.nombre = nombre;
    this.publicacion.apellido = apellido;
    this.publicacion.titulo = titulo;
    this.publicacion.contenido = contenido;
  }

  limpiarPublicacion() {
    this.setPublicacion('', '', '', '', '', '');
    this.api.cargarPublicaciones();
  }

  esAutor(pub: Publicacion): boolean {
    return this.usuario.correo === pub.correo;
  }

  guardarPublicacion() {
    if (this.publicacion.titulo.trim() === '') {
      showAlertDUOC('Antes de hacer una publicación debe llenar el título.');
      return;
    }
    if (this.publicacion.contenido.trim() === '') {
      showAlertDUOC('Antes de hacer una publicación debe llenar el contenido.');
      return;
    }
    if (this.publicacion.id === '') {
      this.crearPublicacion();
    }
    // else {
    //   this.actualizarPublicacion();
    // }
  }

  crearPublicacion() {
    this.publicacion.id = '';
    this.publicacion.correo = this.usuario.correo;
    this.publicacion.nombre = this.usuario.nombre;
    this.publicacion.apellido = this.usuario.apellido;
    this.api.crearPublicacion(this.publicacion).subscribe({
      next: (publicacion) => this.limpiarPublicacion(),
      error: (error) => showAlertError('No fue posible crear la publicación.', error)
    });
    this.setOpenCreada(true);
  }

  public toastButtons = [
    {
      text: 'Descartar',
      role: 'cancel',
    },
  ];

  isToastOpenCreada = false;
  setOpenCreada(isOpenCreada: boolean) {
    this.isToastOpenCreada = isOpenCreada;
  }

  isToastOpenEliminada = false;
  setOpenEliminada(isOpenEliminada: boolean) {
    this.isToastOpenEliminada = isOpenEliminada;
  }

  isToastOpenEditada = false;
  setOpenEditada(isToastOpenEditada: boolean) {
    this.isToastOpenEditada = isToastOpenEditada;
  }

  /**
   * Función para eliminar la publicación con opciones: [Cancelar] y [OK] -> Eliminar publicación.
   * @param pub 
   */
  public async eliminarPublicacion(pub: any) {

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
          handler: () => {
            if (pub.correo !== this.usuario.correo) {
              showAlertDUOC('Sólo puede eliminar las publicaciones a su nombre')
              return;
            }
            this.api.eliminarPublicacion(pub.id).subscribe({
              next: (publicacion) => this.limpiarPublicacion(),
              error: (error) => showAlertError('No fue posible eliminar la publicación.', error)
            });
            this.setOpenEliminada(true);
          },
        },
      ],
    });

    await alert.present();
  }

  /**
   * Función botón [EDITAR] |- [OK] -> Eliminar publicación, guardar publicación inmediatamente.
   * @param pub Obtiene los datos de la publicación seleccionada
   */
  public async editarPublicacion(pub: any) {
    const alert = await this.alertController.create({
      header: 'Editar publicación #' + pub.id,
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Título',
          value: pub.titulo
        },
        {
          name: 'contenido',
          type: 'textarea',
          placeholder: 'Contenido',
          attributes: {
            multiline: true,
            rows: 5
          },
          value: pub.contenido
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Publicar',
          handler: (data) => {
            const comentarioActualizado = {
              id: pub.id,
              correo: pub.correo,
              nombre: pub.nombre,
              apellido: pub.apellido,
              titulo: data.titulo,
              contenido: data.contenido
            };
            this.actualizarPublicacion(comentarioActualizado);
          }
        }
      ]
    });

    await alert.present();
  }

  actualizarPublicacion(pub: any) {
    this.api.actualizarPublicacion(pub).subscribe({
      next: (publicacion) => this.limpiarPublicacion(),
      error: (error) => showAlertError('No fue posible actualizar la publicación.', error)
    });
    this.setOpenEditada(true);
  }

}
