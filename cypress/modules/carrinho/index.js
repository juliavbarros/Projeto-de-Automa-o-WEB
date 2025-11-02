class Carrinho {
  // Adiciona o primeiro produto ao carrinho e continua comprando
  adicionarPrimeiroProdutoAoCarrinho() {
    cy.get(".features_items .product-image-wrapper").first().contains("Add to cart").click();
    cy.contains("Continue Shopping").click();
  }

  // Navega até a página do carrinho (usa o menu do topo)
  navegarParaCarrinho() {
    cy.get('.shop-menu a[href="/view_cart"]').click();
  }

  // Clica no botão Proceed To Checkout
  clicarProceedToCheckout() {
    cy.contains("Proceed To Checkout").click();
  }

  // Escreve um comentário e avança para "Place Order"
  inserirComentarioEFinalizarPedido(comentario) {
    cy.get('textarea[name="message"]').clear().type(comentario);
    cy.contains("Place Order").click();
  }

  // Preenche os campos do pagamento
  preencherPagamento(nome, numero, cvc, expiracao) {
    cy.get('[data-qa="name-on-card"]').clear().type(nome);
    cy.get('[data-qa="card-number"]').clear().type(numero);
    cy.get('[data-qa="cvc"]').clear().type(cvc);
    cy.get('[data-qa="expiry-month"]').clear().type(expiracao.mes);
    cy.get('[data-qa="expiry-year"]').clear().type(expiracao.ano);
  }

  // Confirma o pagamento do pedido
  confirmarPagamento() {
    cy.contains("Pay and Confirm Order").click();
  }
}

export default new Carrinho();
