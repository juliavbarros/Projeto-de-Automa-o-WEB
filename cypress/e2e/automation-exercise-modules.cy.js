// <reference types='cypress' />
import userData from '../fixtures/example.json'
import {
    getRandomNumber,
    getRandomEmail
} from '../support/helpers'

import {faker} from '@faker-js/faker'
//import { navegarParaLogin } from '../modules/menu'
import menu from '../modules/menu'
//import { preencherFormularioDePreCadastro} from '../modules/login'
import login from '../modules/login'
import cadastro from '../modules/cadastro'
import produtos from '../modules/produtos'
import contacto from '../modules/contacto'
import carrinho from '../modules/carrinho'



describe('Automation Exercise', () => {
    beforeEach(() => {
        cy.viewport('iphone-xr')
        cy.visit('https://automationexercise.com')
        menu.navegarParaLogin()
    });

    it('Cadastrar um usuário', () => {

        login.preencherFormularioDePreCadastro()
        cadastro.preencherFormularioDeCadastroCompleto()

        //assert
        cy.url().should('includes','account_created')
        cy.contains('b','Account Created!')

    });

    it('Login de usuario com e-mail e senha corretos', () => {

        login.preencherFormularioDeLogin(userData.user, userData.password)

        cy.get('i.fa-user').parent().should('contain', userData.name)
        cy.get('a[href="/logout"]').should('be.visible')

        cy.get(':nth-child(10) > a')
        .should('be.visible')
        .and('contain.text','Logged in as')
        .and('contain.text', userData.name)
        
        
    });

    it('Login de usuário com e-mail e senha incorretos', () => {
        
        login.preencherFormularioDeLogin(userData.user, '54321')

        cy.get('.login-form > form > p').should('contain','Your email or password is incorrect!')
    });

    it('Logout de usuario', () => {
       
        login.preencherFormularioDeLogin(userData.user, userData.password)
        menu.efetuarLogout()

        cy.url().should('contain', 'login')
        cy.contains('Login to your account')


    });

    it('Cadastrar Usuario com e-mail existente no sistema', () => {
        produtos.preencherFormularioDeCadastroExistente(userData.name, userData.user);
        produtos.validarEmailExistente();
    });

    it('Enviar um Formulário de Contacto com upload de arquivo',()=> {
        contacto.navegarParaContato();
        contacto.preencherFormularioContato(userData);
        contacto.anexarArquivo('example.json');
        contacto.enviarFormulario();
        contacto.validarSucessoEnvio();
    });

    it('Verificar produtos e pagina de detalhes do produto', ()=> {
        produtos.navegarParaProdutos();
        produtos.validarPaginaTodosProdutos();
        produtos.validarListaProdutosVisivel();
        produtos.visualizarPrimeiroProduto();
        produtos.validarDetalhesProduto();
    });

    it('Pesquisar produto', () => {
        produtos.navegarParaProdutos();
        produtos.validarPaginaTodosProdutos();
        produtos.pesquisarProduto('Dress'); 
        produtos.validarProdutosPesquisados();
    });

    it('Verificar subscrição na home page', () => {
    
    cy.get('body').should('be.visible');
    produtos.scrollParaRodape();
    produtos.verificarTextoSubscription();
    const email = faker.internet.email();
    produtos.inscreverEmailNoRodape(email);
    produtos.verificarMensagemSucessoSubscricao();
    });

    it.only('Registrar antes de finalizar uma compra', () => {

        const nome = faker.person.firstName();
        const email = faker.internet.email();
        produtos.preencherFormularioDeCadastro(nome, email);
        cadastro.preencherFormularioDeCadastroCompleto({ firstName: nome });

        produtos.validarContaCriada();
        cy.contains('Continue').click();

        cy.get('i.fa-user').parent().should('contain', nome);

        produtos.navegarParaProdutos();
        carrinho.adicionarPrimeiroProdutoAoCarrinho();


        carrinho.navegarParaCarrinho();

        carrinho.verificarPaginaCarrinho();

        carrinho.clicarProceedToCheckout();

        carrinho.verificarDetalhesEnderecoERevisaoPedido();

        carrinho.inserirComentarioEFinalizarPedido('Pedido feito!');

        const nomeCartao = nome + ' ' + faker.person.lastName();
        const numeroCartao = faker.finance.creditCardNumber();
        const cvc = faker.finance.creditCardCVV();
        const expiracao = { mes: '12', ano: '2028' };
        carrinho.preencherPagamento(nomeCartao, numeroCartao, cvc, expiracao);

        carrinho.confirmarPagamento();

        carrinho.verificarMensagemSucessoPedido();

        cy.contains('Delete Account').click();

        cy.contains('ACCOUNT DELETED!').should('be.visible');
        cy.contains('Continue').click();
    });

});