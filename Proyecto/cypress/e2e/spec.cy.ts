describe('Verificar mi aplicación', () => {

    it('Verificar login con credenciales incorrectas', () => {
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
            cy.intercept('/inicio').as('route').then(() => {
                cy.wait(1000);
                cy.get('ion-title').should('contain.text', 'Sistema de Asistencia DuocUC');
                cy.wait(1000);
                cy.get('#saludoNombre').should('contain.text', 'Ana Torres');
                cy.wait(2000);
                cy.contains('Cerrar sesión').click();
                cy.wait(1000);
                cy.contains('OK').click();
            });
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
                cy.wait(1500);
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
            });
        });
    });

    /*
    it('Verificar validaciones del componente Mis Datos', () => {
        cy.viewport(412, 915);
        cy.visit('http://localhost:8100/').then(() => {
            cy.intercept('/inicio').as('route').then(() => {
                cy.wait(2000);
                cy.get('[value="misdatos"]').click();
                cy.wait(1000);

                cy.get('#input-nombre').invoke('val', '');
                cy.wait(1000);
                cy.get('#input-nombre').type(' ');
                cy.get('#input-nombre').should('have.value', ' ');
                cy.wait(1000);
                cy.get('#btnActualizarDatos').click();
                cy.wait(1000);
                cy.contains('Aceptar').click();

                cy.wait(2000);

                cy.get('#input-nombre').invoke('val', '');
                cy.wait(1000);
                cy.get('#input-nombre').type('Ol');
                cy.get('#input-nombre').should('have.value', 'Ol');
                cy.wait(1000);
                cy.get('#btnActualizarDatos').click();
                cy.wait(1000);
                cy.contains('Aceptar').click();

                cy.wait(2000);

                cy.get('#input-nombre').invoke('val', '');
                cy.wait(1000);
                cy.get('#input-nombre').type('Oliver');
                cy.get('#input-nombre').should('have.value', 'Oliver');


                cy.wait(1000);
                cy.get('#input-apellido').invoke('val', '');
                cy.wait(1000);
                cy.get('#input-preguntaSecreta').invoke('val', '');
                cy.wait(1000);
                cy.get('#input-respuestaSecreta').invoke('val', '');
                cy.wait(1000);
                cy.get('#input-password').invoke('val', '');
                cy.wait(1000);
                cy.get('#input-repetirPassword').invoke('val', '');
                cy.wait(1000);
                cy.get('#btnActualizarDatos').click();
                cy.wait(1000);
                cy.contains('Aceptar').click();

            });
        });
    });
    */

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
                cy.get('#input-preguntaSecreta').type('Capital de Chile');
                cy.get('#input-preguntaSecreta').should('have.value', 'Capital de Chile');

                cy.wait(2000);

                cy.get('#input-respuestaSecreta').invoke('val', '');
                cy.wait(1000);
                cy.get('#input-respuestaSecreta').type('Santiago de Chile');
                cy.get('#input-respuestaSecreta').should('have.value', 'Santiago de Chile');

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
            });
        });
    });
});