class Produtos {
    navegarParaProdutos() {
        cy.contains('Products').click();
    }

    validarPaginaTodosProdutos() {
        cy.url().should('include', '/products');
        cy.contains('All Products').should('be.visible');
    }

    validarListaProdutosVisivel() {
        cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0);
    }

    visualizarPrimeiroProduto() {
        cy.get('.features_items .product-image-wrapper').first().contains('View Product').click();
    }

    validarDetalhesProduto() {
        cy.url().should('include', '/product_details/');
        cy.get('.product-information h2').should('be.visible'); // nome
        cy.get('.product-information p').eq(0).should('contain.text', 'Category');
        cy.get('.product-information span span').should('be.visible'); // preço
        cy.get('.product-information p').eq(1).should('contain.text', 'Availability');
        cy.get('.product-information p').eq(2).should('contain.text', 'Condition');
        cy.get('.product-information p').eq(3).should('contain.text', 'Brand');
    }

    preencherFormularioDeCadastro(nome, email) {
        cy.get('[data-qa="signup-name"]').type(nome);
        cy.get('[data-qa="signup-email"]').type(email);
        cy.contains('button','Signup').click();
    }

    preencherFormularioDeCadastroComFixture(userData) {
        cy.get('[data-qa="signup-name"]').type(userData.name);
        cy.get('[data-qa="signup-email"]').type(userData.email);
        cy.contains('button','Signup').click();
    }

    validarContaCriada() {
        cy.url().should('includes','account_created');
        cy.contains('b','Account Created!');
    }

    preencherFormularioDeCadastroExistente(nome, email) {
        cy.get('[data-qa="signup-name"]').type(nome);
        cy.get('[data-qa="signup-email"]').type(email);
        cy.contains('button','Signup').click();
    }

    validarEmailExistente() {
        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!');
    }

    pesquisarProduto(nomeProduto) {
        cy.get('#search_product').type(nomeProduto);
        cy.get('#submit_search').click();
    }

    validarProdutosPesquisados() {
        cy.contains('Searched Products').should('be.visible');
        cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0);
    }

    scrollParaRodape() {
        cy.scrollTo('bottom');
    }

    verificarTextoSubscription() {
        cy.contains('SUBSCRIPTION', { matchCase: false }).should('be.visible');
    }

    inscreverEmailNoRodape(email) {
        cy.get('#susbscribe_email').clear().type(email);
        cy.get('#subscribe').click();
    }

    verificarMensagemSucessoSubscricao() {
        cy.get('.alert-success').should('be.visible').and('contain', 'You have been successfully subscribed!');
    }
}

export default new Produtos();