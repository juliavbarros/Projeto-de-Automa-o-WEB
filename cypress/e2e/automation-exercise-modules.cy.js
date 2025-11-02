// <reference types='cypress' />
import userData from "../fixtures/example.json";
import { getRandomNumber, getRandomEmail } from "../support/helpers";

import { faker } from "@faker-js/faker";
import menu from "../modules/menu";
import login from "../modules/login";
import cadastro from "../modules/cadastro";
import produtos from "../modules/produtos";
import contacto from "../modules/contacto";
import carrinho from "../modules/carrinho";

describe("Automation Exercise", () => {
  beforeEach(() => {
    // Arrange
    cy.viewport("iphone-xr");
    cy.visit("https://automationexercise.com");
    menu.navegarParaLogin();
  });

  it("Cadastrar um usuário", () => {
    // Arrange
    // (pré-condição: estar na página de login)

    // Act
    login.preencherFormularioDePreCadastro();
    cadastro.preencherFormularioDeCadastroCompleto();

    // Assert
    cy.url().should("includes", "account_created");
    cy.contains("b", "Account Created!").should("be.visible");
  });

  it("Login de usuario com e-mail e senha corretos", () => {
    // Arrange
    const { user, password, name } = userData;

    // Act
    login.preencherFormularioDeLogin(user, password);

    // Assert
    cy.get("i.fa-user").parent().should("contain", name);
    cy.get('a[href="/logout"]').should("be.visible");
    cy.get(":nth-child(10) > a").should("be.visible").and("contain.text", "Logged in as").and("contain.text", name);
  });

  it("Login de usuário com e-mail e senha incorretos", () => {
    // Arrange
    const { user } = userData;

    // Act
    login.preencherFormularioDeLogin(user, "54321");

    // Assert
    cy.get(".login-form > form > p").should("be.visible").and("contain", "Your email or password is incorrect!");
  });

  it("Logout de usuario", () => {
    // Arrange
    const { user, password } = userData;
    login.preencherFormularioDeLogin(user, password);

    // Act
    menu.efetuarLogout();

    // Assert
    cy.url().should("contain", "login");
    cy.contains("Login to your account").should("be.visible");
  });

  it("Cadastrar Usuario com e-mail existente no sistema", () => {
    // Arrange
    const { name, user } = userData;

    // Act
    produtos.preencherFormularioDeCadastroExistente(name, user);

    // Assert
    cy.get(".signup-form > form > p").should("be.visible").and("contain", "Email Address already exist!");
  });

  it("Enviar um Formulário de Contacto com upload de arquivo", () => {
    // Arrange
    contacto.navegarParaContato();

    // Act
    contacto.preencherFormularioContato(userData);
    contacto.anexarArquivo("example.json");
    contacto.enviarFormulario();

    // Assert
    cy.get(".status")
      .should("be.visible")
      .and("contain.text", "Success! Your details have been submitted successfully.");
  });

  it("Verificar produtos e pagina de detalhes do produto", () => {
    // Arrange
    produtos.navegarParaProdutos();

    // Assert (página todos os produtos)
    cy.url().should("include", "/products");
    cy.contains("All Products").should("be.visible");
    cy.get(".features_items .product-image-wrapper").should("have.length.greaterThan", 0);

    // Act (abrir primeiro produto)
    cy.get(".features_items .product-image-wrapper").first().contains("View Product").click();

    // Assert (detalhes do produto)
    cy.url().should("include", "/product_details/");
    cy.get(".product-information h2").should("be.visible"); // nome
    cy.get(".product-information p").eq(0).should("contain.text", "Category");
    cy.get(".product-information span span").should("be.visible"); // preço
    cy.get(".product-information p").eq(1).should("contain.text", "Availability");
    cy.get(".product-information p").eq(2).should("contain.text", "Condition");
    cy.get(".product-information p").eq(3).should("contain.text", "Brand");
  });

  it("Pesquisar produto", () => {
    // Arrange
    produtos.navegarParaProdutos();
    cy.url().should("include", "/products");
    cy.contains("All Products").should("be.visible");

    // Act
    produtos.pesquisarProduto("Dress");

    // Assert
    cy.contains("Searched Products").should("be.visible");
    cy.get(".features_items .product-image-wrapper").should("have.length.greaterThan", 0);
  });

  it("Verificar subscrição na home page", () => {
    // Arrange
    cy.get("body").should("be.visible");

    // Act
    produtos.scrollParaRodape();

    // Assert (texto de subscription)
    cy.contains("SUBSCRIPTION", { matchCase: false }).should("be.visible");

    // Arrange (gerar e-mail)
    const email = faker.internet.email();

    // Act (inscrever)
    produtos.inscreverEmailNoRodape(email);

    // Assert (sucesso)
    cy.get(".alert-success").should("be.visible").and("contain", "You have been successfully subscribed!");
  });

  it("Registrar antes de finalizar uma compra", () => {
    // Arrange (dados do novo usuário)
    const nome = faker.person.firstName();
    const email = faker.internet.email();

    // Act (realizar pré-cadastro)
    produtos.preencherFormularioDeCadastro(nome, email);

    // Act (preencher cadastro completo)
    cadastro.preencherFormularioDeCadastroCompleto({ firstName: nome });

    // Assert (conta criada)
    cy.url().should("includes", "account_created");
    cy.contains("b", "Account Created!").should("be.visible");

    // Act (continuar)
    cy.contains("Continue").click();

    // Assert (logado)
    cy.get("i.fa-user").parent().should("contain", nome);

    // Act (adicionar produto ao carrinho)
    produtos.navegarParaProdutos();
    cy.url().should("include", "/products");
    cy.contains("All Products").should("be.visible");
    carrinho.adicionarPrimeiroProdutoAoCarrinho();

    // Act (ir para o carrinho)
    carrinho.navegarParaCarrinho();

    // Assert (página do carrinho)
    cy.url().should("include", "/view_cart");
    cy.contains("Shopping Cart").should("be.visible");

    // Act (checkout)
    cy.contains("Proceed To Checkout").click();

    // Assert (detalhes e revisão)
    cy.contains("Address Details").should("be.visible");
    cy.contains("Review Your Order").should("be.visible");

    // Act (comentário + place order)
    carrinho.inserirComentarioEFinalizarPedido("Pedido feito!");

    // Arrange (dados de pagamento)
    const nomeCartao = `${nome} ${faker.person.lastName()}`;
    const numeroCartao = faker.finance.creditCardNumber();
    const cvc = faker.finance.creditCardCVV();
    const expiracao = { mes: "12", ano: "2028" };

    // Act (preencher pagamento + confirmar)
    carrinho.preencherPagamento(nomeCartao, numeroCartao, cvc, expiracao);
    carrinho.confirmarPagamento();

    // Assert (pedido realizado)
    cy.contains("Congratulations! Your order has been confirmed!").should("be.visible");

    // Act (deletar conta)
    cy.contains("Delete Account").click();

    // Assert (conta deletada)
    cy.contains("Account Deleted!").should("be.visible");
    cy.contains("Continue").click();
  });
});
