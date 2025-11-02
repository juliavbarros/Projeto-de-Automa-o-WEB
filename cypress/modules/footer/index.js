class Footer {
    verificarHomePageVisivel() {
        cy.get('body').should('be.visible');
    }

    scrollParaFooter() {
        cy.scrollTo('bottom');
    }

    verificarTextoSubscription() {
        cy.contains('SUBSCRIPTION').should('be.visible');
    }

    inscreverEmailFooter(email) {
        cy.get('#susbscribe_email').type(email);
        cy.get('#subscribe').click();
    }

    verificarMensagemSucesso() {
        cy.contains('You have been successfully subscribed!').should('be.visible');
    }
}

export default new Footer();