class Produtos {
  // Abre a página de produtos pelo link do menu
  navegarParaProdutos() {
    cy.contains("a", "Products").click();
  }

  // Clica para visualizar detalhes do primeiro produto listado
  visualizarPrimeiroProduto() {
    cy.get(".features_items .product-image-wrapper").first().contains("View Product").click();
  }

  // Fluxo de pré-cadastro (nome + email) para criar conta
  preencherFormularioDeCadastro(nome, email) {
    cy.get('[data-qa="signup-name"]').clear().type(nome);
    cy.get('[data-qa="signup-email"]').clear().type(email);
    cy.contains("button", "Signup").click();
  }

  // Mesmo fluxo, mas recebendo um objeto de fixture (name, email)
  preencherFormularioDeCadastroComFixture(userData) {
    cy.get('[data-qa="signup-name"]').clear().type(userData.name);
    cy.get('[data-qa="signup-email"]').clear().type(userData.email);
    cy.contains("button", "Signup").click();
  }

  // Tenta cadastrar um e-mail já existente (ação apenas)
  preencherFormularioDeCadastroExistente(nome, email) {
    cy.get('[data-qa="signup-name"]').clear().type(nome);
    cy.get('[data-qa="signup-email"]').clear().type(email);
    cy.contains("button", "Signup").click();
  }

  // Pesquisa por um produto pelo texto
  pesquisarProduto(nomeProduto) {
    cy.get("#search_product").clear().type(nomeProduto);
    cy.get("#submit_search").click();
  }

  // Rola até o rodapé (Subscription)
  scrollParaRodape() {
    cy.scrollTo("bottom");
  }

  // Preenche o e-mail e envia a inscrição do rodapé
  inscreverEmailNoRodape(email) {
    cy.get("#susbscribe_email").clear().type(email);
    cy.get("#subscribe").click();
  }
}

export default new Produtos();
