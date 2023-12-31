describe('Verificar mi aplicación', () => {

    it('Verifcar login con credenciales incorriectas', () => {
        cy.viewport(412, 915);
        cy.visit('http://localhost:8100/').then(() => {
            cy.wait(2000);
            cy.get('#input-correo').invoke('val', '');
            cy.get('#input-correo').type('ejemplo@duocuc.cl');
            cy.wait(2000);
            cy.get('#input-password').invoke('val', '');
            cy.get('#input-password').type('1234');
            cy.wait(2000);
            cy.contains('Ingresar').click();
            cy.wait(500);
            cy.get('.botoningresarsesion').should('have.value', '')
            cy.wait(3000);
        });
    });

    it('Verificar login con credenciales correctas', () => {
        cy.viewport(412, 915);
        cy.visit('http://localhost:8100/').then(() => {
            cy.wait(2000);
            cy.get('#input-correo').invoke('val', '');
            cy.get('#input-correo').type('atorres@duocuc.cl');
            cy.wait(2000);
            cy.get('#input-password').invoke('val', '');
            cy.get('#input-password').type('1234');
            cy.wait(2000);
            cy.contains('Ingresar').click();
            cy.wait(4000);
        });
    });

    it('Verificar agregar publicación', () => {
        cy.viewport(412, 915);
        cy.visit('http://localhost:8100/').then(() => {
            cy.intercept('/inicio').as('route').then(() => {
                cy.wait(2000);
                cy.get('[value="foro"]').click();
                cy.wait(2000);
                cy.contains('Hacer una Publicación').click();
                cy.get('input[placeholder="Título"]').invoke('val', '');
                cy.wait(1000);
                cy.get('input[placeholder="Título"]').type('Título con Cypress');
                cy.get('input[placeholder="Título"]').should('have.value', 'Título con Cypress');
                cy.wait(1000);
                cy.get('textarea[placeholder="Contenido"]').invoke('val', '');
                cy.wait(1000);
                cy.get('textarea[placeholder="Contenido"]').type('Contenido del post con Cypress. ¡Pronto será eliminado! Esta sii');
                cy.get('textarea[placeholder="Contenido"]').should('have.value', 'Contenido del post con Cypress. ¡Pronto será eliminado! Esta sii');
                cy.wait(2000);
                cy.contains('Publicar').click();
                cy.wait(4000);
            });
        });
    });

    it('Verificar eliminar publicación', () => {
        cy.viewport(412, 915);
        cy.visit('http://localhost:8100/').then(() => {
            cy.intercept('/inicio').as('route').then(() => {
                cy.wait(2000);
                cy.get('[value="foro"]').click();
                cy.wait(1000);
                cy.get('.fullscreen > :nth-child(4) > .card-op > .ion-color-danger').click();
                cy.wait(2000);
                cy.contains('OK').click();
                cy.wait(4000);
            });
        });
    });

    it('Verificar validaciones del componente Mis Datos', () => {
        cy.viewport(412, 915);
        cy.visit('http://localhost:8100/').then(() => {
            cy.intercept('/inicio').as('route').then(() => {
                cy.wait(2000);
                cy.get('[value="misdatos"]').click();
                cy.wait(1000);

                cy.get('#input-nombre').invoke('val', '');
                cy.get('#input-apellido').invoke('val', '');
                cy.get('#input-preguntaSecreta').invoke('val', '');
                cy.get('#input-respuestaSecreta').invoke('val', '');
                cy.get('#input-password').invoke('val', '');
                cy.get('#input-repetirPassword').invoke('val', '');
                cy.get('#input-repetirPassword').type(' ');

                // Nombre
                cy.get('#input-nombre').invoke('val', '');
                cy.wait(1000);
                cy.get('#input-nombre').type(' ');
                cy.wait(1000);
                cy.get('#btnActualizarDatos').click();
                cy.wait(1000);
                cy.contains('Aceptar').click();

                cy.wait(1000);

                cy.get('#input-nombre').invoke('val', '');
                cy.wait(1000);
                cy.get('#input-nombre').type('A');
                cy.wait(1000);
                cy.get('#btnActualizarDatos').click();
                cy.wait(1000);
                cy.contains('Aceptar').click();

                cy.wait(1000);

                cy.get('#input-nombre').invoke('val', '');
                cy.wait(1000);
                cy.get('#input-nombre').type('Anaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
                cy.wait(1000);
                cy.get('#btnActualizarDatos').click();
                cy.wait(1000);
                cy.contains('Aceptar').click();

                cy.wait(1000);

                cy.get('#input-nombre').invoke('val', '');
                cy.get('#input-nombre').type('Ana');

                cy.wait(1000);

                cy.get('#input-apellido').invoke('val', '');
                cy.wait(1000);
                cy.get('#input-apellido').type(' ');
                cy.wait(1000);
                cy.get('#btnActualizarDatos').click();
                cy.wait(1000);
                cy.contains('Aceptar').click();

                cy.wait(1000);

                cy.get('#input-apellido').invoke('val', '');
                cy.wait(1000);
                cy.get('#input-apellido').type('T');
                cy.wait(1000);
                cy.get('#btnActualizarDatos').click();
                cy.wait(1000);
                cy.contains('Aceptar').click();

                cy.wait(1000);

                cy.get('#input-apellido').invoke('val', '');
                cy.wait(1000);
                cy.get('#input-apellido').type('Toreeeeeeeeeesssssssssssssssssss');
                cy.wait(1000);
                cy.get('#btnActualizarDatos').click();
                cy.wait(1000);
                cy.contains('Aceptar').click();

                cy.wait(1000);

                cy.wait(1000);
                cy.get('#input-apellido').invoke('val', '');
                cy.get('#input-apellido').type('Torres');
                cy.get('#input-preguntaSecreta').invoke('val', '');
                cy.wait(1000);
                cy.get('#input-preguntaSecreta').type(' ');
                cy.wait(1000);
                cy.get('#btnActualizarDatos').click();
                cy.wait(1000);
                cy.contains('Aceptar').click();

                cy.wait(1000);

                cy.get('#input-preguntaSecreta').invoke('val', '');
                cy.wait(1000);
                cy.get('#input-preguntaSecreta').type('C');
                cy.wait(1000);
                cy.get('#btnActualizarDatos').click();
                cy.wait(1000);
                cy.contains('Aceptar').click();

                cy.wait(1000);

                cy.get('#input-preguntaSecreta').invoke('val', '');
                cy.wait(1000);
                cy.get('#input-preguntaSecreta').type('Como se llamaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
                cy.wait(1000);
                cy.get('#btnActualizarDatos').click();
                cy.wait(1000);
                cy.contains('Aceptar').click();

                cy.wait(1000);

                cy.get('#input-preguntaSecreta').invoke('val', '');
                cy.get('#input-preguntaSecreta').type('Como se llama mi mascota');
                cy.wait(1000);
                cy.get('#input-respuestaSecreta').invoke('val', '');
                cy.wait(1000);
                cy.get('#input-respuestaSecreta').type(' ');
                cy.wait(1000);
                cy.get('#btnActualizarDatos').click();
                cy.wait(1000);
                cy.contains('Aceptar').click();

                cy.wait(1000);

                cy.get('#input-respuestaSecreta').invoke('val', '');
                cy.get('#input-respuestaSecreta').type('gato');
                cy.wait(1000);
                cy.get('#input-password').invoke('val', '');
                cy.wait(1000);
                cy.get('#input-password').type(' ');
                cy.wait(1000);
                cy.get('#btnActualizarDatos').click();
                cy.wait(1000);
                cy.contains('Aceptar').click();

                cy.wait(1000);

                cy.get('#input-password').invoke('val', '');
                cy.wait(1000);
                cy.get('#input-password').type('1');
                cy.wait(1000);
                cy.get('#btnActualizarDatos').click();
                cy.wait(1000);
                cy.contains('Aceptar').click();

                cy.wait(1000);

                cy.get('#input-password').invoke('val', '');
                cy.wait(1000);
                cy.get('#input-password').type('1123123123123123123123123123213123123123123123123123123123123123123123123123123123123');
                cy.wait(1000);
                cy.get('#btnActualizarDatos').click();
                cy.wait(1000);
                cy.contains('Aceptar').click();

                cy.wait(1000);

                cy.get('#input-password').invoke('val', '');
                cy.wait(1000);
                cy.get('#input-password').type('1234');
                cy.wait(1000);
                cy.get('#btnActualizarDatos').click();
                cy.wait(1000);
                cy.contains('Aceptar').click();

                cy.wait(1000);

                cy.get('#input-repetirPassword').invoke('val', '');
                cy.wait(1000);
                cy.get('#input-repetirPassword').type('1');
                cy.wait(1000);
                cy.get('#btnActualizarDatos').click();
                cy.wait(1000);
                cy.contains('Aceptar').click();

                cy.wait(1000);

                cy.get('#input-repetirPassword').invoke('val', '');
                cy.wait(1000);
                cy.get('#input-repetirPassword').type('1234123');
                cy.wait(1000);
                cy.get('#btnActualizarDatos').click();
                cy.wait(1000);
                cy.contains('Aceptar').click();

                cy.wait(1000);

                cy.get('#input-repetirPassword').invoke('val', '');
                cy.wait(1000);
                cy.get('#input-repetirPassword').type('1234');
                cy.wait(1000);
                cy.get('#btnActualizarDatos').click();
                cy.wait(1000);
                cy.contains('Aceptar').click();

            });
        });
    });

    it('Verificar actualizar datos', () => {
        cy.viewport(412, 915);

        cy.wait(2000)

        cy.visit('http://localhost:8100/').then(() => {
            cy.intercept('/inicio').as('route').then(() => {
                cy.wait(2000);
                cy.get('[value="misdatos"]').click();
                cy.wait(2000);

                cy.get('#input-nombre').invoke('val', '');
                cy.wait(1000);
                cy.get('#input-nombre').type('Ana del Bosque');
                cy.get('#input-nombre').should('have.value', 'Ana del Bosque');

                cy.wait(2000);

                cy.get('#input-apellido').invoke('val', '');
                cy.wait(1000);
                cy.get('#input-apellido').type('Torres Quilodrán');
                cy.get('#input-apellido').should('have.value', 'Torres Quilodrán');

                cy.wait(2000);

                cy.get('#input-preguntaSecreta').invoke('val', '');
                cy.wait(1000);
                cy.get('#input-preguntaSecreta').type('Nombre mi perro');
                cy.get('#input-preguntaSecreta').should('have.value', 'Nombre mi perro');

                cy.wait(2000);

                cy.get('#input-respuestaSecreta').invoke('val', '');
                cy.wait(1000);
                cy.get('#input-respuestaSecreta').type('Charlotte');
                cy.get('#input-respuestaSecreta').should('have.value', 'Charlotte');

                cy.wait(2000);

                cy.get('#input-password').invoke('val', '');
                cy.wait(1000);
                cy.get('#input-password').type('1234');
                cy.get('#input-password').should('have.value', '1234');

                cy.wait(2000);

                cy.get('#input-repetirPassword').invoke('val', '');
                cy.wait(1000);
                cy.get('#input-repetirPassword').type('1234');
                cy.get('#input-repetirPassword').should('have.value', '1234');

                cy.wait(500);

                cy.contains(' Actualizar mis datos ').click();
                cy.wait(1200);
                cy.contains('Aceptar').click();

                cy.wait(1000);

                cy.get('#saludo').should('contain.text', 'Ana del Bosque Torres Quilodrán');

                cy.wait(1000);

                cy.contains('Cerrar sesión').click();
                cy.wait(1000);
                cy.contains('OK').click();

                cy.wait(2000);

                cy.get('#ion-input-7').invoke('val', '');
                cy.wait(1000);
                cy.get('#ion-input-7').type('atorres@duocuc.cl');

                cy.wait(2000);

                cy.get('#ion-input-8').invoke('val', '');
                cy.wait(1000);
                cy.get('#ion-input-8').type('1234');

                cy.contains('Ingresar').click();
                cy.wait(6000);

            });
        });
    });
});