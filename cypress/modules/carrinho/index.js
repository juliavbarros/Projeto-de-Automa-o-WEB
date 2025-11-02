class Carrinho {
    adicionarPrimeiroProdutoAoCarrinho() {
        cy.get('.features_items .product-image-wrapper').first().contains('Add to cart').click();
        cy.contains('Continue Shopping').click();
    }

    navegarParaCarrinho() {
        cy.get('a[href="/view_cart"]').click();
    }

    verificarPaginaCarrinho() {
        cy.url().should('include', '/view_cart');
        cy.contains('Shopping Cart').should('be.visible');
    }

    clicarProceedToCheckout() {
        cy.contains('Proceed To Checkout').click();
    }

    verificarDetalhesEnderecoERevisaoPedido() {
        cy.contains('Address Details').should('be.visible');
        cy.contains('Review Your Order').should('be.visible');
    }

    inserirComentarioEFinalizarPedido(comentario) {
        cy.get('textarea[name="message"]').type(comentario);
        cy.contains('Place Order').click();
    }

    preencherPagamento(nome, numero, cvc, expiracao) {
        cy.get('[data-qa="name-on-card"]').type(nome);
        cy.get('[data-qa="card-number"]').type(numero);
        cy.get('[data-qa="cvc"]').type(cvc);
        cy.get('[data-qa="expiry-month"]').type(expiracao.mes);
        cy.get('[data-qa="expiry-year"]').type(expiracao.ano);
    }

    confirmarPagamento() {
        cy.contains('Pay and Confirm Order').click();
    }

    verificarMensagemSucessoPedido() {
        cy.contains('Your order has been placed successfully!').should('be.visible');
    }
}

export default new Carrinho();