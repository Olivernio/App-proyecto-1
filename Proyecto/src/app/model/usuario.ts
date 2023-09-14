export class Usuario{
  public correo: string;
  public password: string;
  public nombre: string;
  public apellido: string;
  public preguntaSecreta: string;
  public respuestaSecreta: string;

  constructor(correo: string, password: string, nombre: string, apellido: string, preguntaSecreta: string, respuestaSecreta: string) {
    this.correo = correo;
    this.password = password;
    this.nombre = nombre;
    this.apellido = apellido;
    this.preguntaSecreta = preguntaSecreta;
    this.respuestaSecreta = respuestaSecreta;
  }

  public getCorreo(): string {
    return this.correo;
  }

  public getPassword(): string {
    return this.password;
  }

  public setUsuario(correo: string, password: string): void {
    this.correo = correo;
    this.password = password;
  }



  public listaUsuariosValidos(): Usuario[] {
    const lista = [];
    lista.push(new Usuario('d.gomez@duocuc.cl', '1234', 'Diego', 'Gomez', '¿Cual es tu VideoJuego Favorito?', 'albion'));
    lista.push(new Usuario('jgonzales@duocuc.cl', '1235', 'Juan', 'Gonzales', '¿Cuál es tu animal favorito?', 'gato'));
    lista.push(new Usuario('pgrillo@duocuc.cl', '1236', 'Pepe', 'Grillo',  '¿Cuál es tu animal favorito?', 'panqueques'));
    lista.push(new Usuario('rdoblas@duocuc.cl', '1235', 'Ruben', 'Doblas',  '¿Cuál es tu animal favorito?', 'moto' ));
    return lista;
  }

  public buscarUsuarioValido(correo: string, password: string): Usuario | undefined {
    const nived: Usuario | undefined = this.listaUsuariosValidos().find(
      usu => usu.correo === correo && usu.password === password);
    return nived;
  }
  

  public buscarUsuarioValidoCorreo(correo: string): Usuario | undefined {
    const nived: Usuario | undefined = this.listaUsuariosValidos().find(
      usu => usu.correo === correo);
    return nived;
  }


  public validarCorreo(): string {
    const patronCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (patronCorreo.test(this.correo)) {
      return '';
    } else {
      return 'El correo ingresado no tiene un formato válido.';
    }
  }

  public validarPassword(): string {
    if (this.password.trim() === '') {
      return 'Para entrar al sistema debe ingresar una contraseña.';
    }
    for(let i = 0; i < this.password.length; i++) {
      if ('0123456789'.indexOf(this.password.charAt(i)) === -1) {
        return 'La contraseña debe ser numérica.';
      }
    }
    if (this.password.length !== 4) {
      return 'La contraseña debe ser numérica de 4 dígitos.';
    }
    return '';
  }

  public validarCredenciales(): string {
    const usu: Usuario | undefined = this.buscarUsuarioValido(this.correo, this.password);
    return usu? '' : 'El usuario no fue encontrado en el sistema.';
  }

  public validarUsuario(): string {
    return this.validarCorreo() || this.validarPassword() || this.validarCredenciales();
  }

  

}