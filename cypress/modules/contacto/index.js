class Contacto {
    navegarParaContato() {
        cy.get(`a[href*=contact]`).click();
    }

    preencherFormularioContato(userData) {
        cy.get('[data-qa="name"]').type(userData.name);
        cy.get('[data-qa="email"]').type(userData.email);
        cy.get('[data-qa="subject"]').type(userData.subject);
        cy.get('[data-qa="message"]').type(userData.message);
    }

    anexarArquivo(arquivo) {
        cy.fixture(arquivo).as('arquivo');
        cy.get('input[type=file]').selectFile('@arquivo');
    }

    enviarFormulario() {
        cy.get('[data-qa="submit-button"]').click();
    }

    validarSucessoEnvio() {
        cy.get('.status').should('be.visible');
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.');
    }
}

export default new Contacto();