import { Usuario } from './model/usuario';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IonicModule } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';



describe('Probar el comienzo de la aplicación', () => {
  
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('Se debería crear la aplicación', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Probar que el título sea correcto', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Asistencia Duoc');
  });

});

describe('Probar la clase de usuario', () => {

  const usuario = new Usuario('atorres@duocuc.cl', '1234', 'Ana Torres Leiva', 'Mascota', 'gato');

  it('probar que la contraseña no sea vacia', () => {
    usuario.password = '';
    expect(usuario.validarPassword()).toContain('ingresar la contraseña');
  });

  it('probar que la contraseña sea numérica', () =>{
    usuario.password = 'abcd';
    expect(usuario.validarPassword()).toContain('debe ser numérica');
  });

  it('probar que la contraseña no supere los 4 dígitos', () =>{
    usuario.password = '12345678';
    expect(usuario.validarPassword()).toContain('debe ser numérica de 4 dígitos');
  });

  it('probar que la contraseña sea numérica y de 4 dígitos', () =>{
    usuario.password = '1234';
    expect(usuario.validarPassword()).toContain('');
  });
});