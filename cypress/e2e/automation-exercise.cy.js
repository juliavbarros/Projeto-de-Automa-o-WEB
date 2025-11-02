// <reference types='cypress' />
import userData from '../fixtures/example.json'
import {
    getRandomNumber,
    getRandomEmail
} from '../support/helpers'

import {faker} from '@faker-js/faker'



describe('Automation Exercise', () => {
    beforeEach(() => {
        cy.viewport('iphone-xr')
        cy.visit('https://automationexercise.com')
        cy.get('a[href="/login"]').click()
    });

    it('Exemplos de logs', ()=> {
        cy.log(`STEP 1 :: PGATS AUTOMAÇAO WEB CY LOG`)
        cy.log(`STEP 1 :: PGATS AUTOMAÇAO WEB CY LOG`)

        cy.log(`Nome do usuário: ${userData.name}`)
        cy.log(`Email do usuario: ${userData.Data.email}`)



        console.log(`PGATS AUTOMAÇAO WEB CONSOLE LOG`)
    })

    it('Cadastrar um usuário', () => {

        const timestamp = new Date().getTime()
        
        cy.get('[data-qa="signup-name"]').type('QA Tester')
        cy.get('[data-qa="signup-email"]').type(`qa-tester--${timestamp}@gmail.com`)
        cy.contains('button','Signup').click()


        //radio ou checkboxes -> check

        cy.get('#id_gender1').check()
        //cy.get('input[type=radio]').check('Mrs')
        
        cy.get('input#password').type('12345', { log: false})

        // para comboboxes ou selects -> select
        cy.get('[data-qa=days]').select('20')
        cy.get('[data-qa=months]').select('September')
        cy.get('[data-qa=years]').select('1990')

        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()

        cy.get('[data-qa="first_name"]').type('Pituca')
        cy.get('[data-qa="last_name"]').type('Valente')
        cy.get('input#company').type('PGATS')
        cy.get('input#address1').type('Avenida Seleniun, n 2004')
        cy.get('select#country').select('Canada')
        cy.get('input#state').type('California')
        cy.get('input#city').type('Los Angeles')
        cy.get('[data-qa="zipcode"]').type('1500-000')
        cy.get('[data-qa="mobile_number"]').type('111 222 333')
        cy.get('[data-qa="create-account"]').click()

        //assert
        cy.url().should('includes','account_created')
        cy.contains('b','Account Created!')

        //consulta ao banco da API


    // qa-tester--1760630292580@gmail.com

});

    it('Login de usuario com e-mail e senha corretos', () => {

        cy.get('[data-qa="login-email"]').type('qa-tester--1761215221559@gmail.com')
        cy.get('[data-qa="login-password"]').type('12345')
        cy.get('[data-qa="login-button"]').click()

        cy.get('i.fa-user').parent().should('contain', 'QA Tester')
        cy.get('a[href="/logout"]').should('be.visible')

        cy.get(':nth-child(10) > a')
        .should('be.visible')
        .and('have.text', `Logged in as QA Tester`)

        cy.contains('b', 'QA Tester')
        //cy.contains(`Logged in as ${testUser.name}`)
        
    });

    it('Login de usuário com e-mail e senha incorretos', () => {

        cy.get('[data-qa="login-email"]').type('qa-tester--1761215221559@gmail.com')
        cy.get('[data-qa="login-password"]').type('54321')

        cy.get('[data-qa="login-button"]').click()
        

        cy.get('.login-form > form > p').should('contain','Your email or password is incorrect!')
    });

    it('Logout de usuario', () => {

        cy.get('[data-qa="login-email"]').type('qa-tester--1761215221559@gmail.com')
        cy.get('[data-qa="login-password"]').type('12345')

        cy.get('[data-qa="login-button"]').click()

        cy.get('i.fa-user').parent().should('contain', 'QA Tester')
        cy.get('a[href="/logout"]').should('be.visible').click()

        cy.url().should('contain', 'login')


    });

    it('Cadastrar Usuario com e-mail existente no sistema', () => {
        
        cy.get('[data-qa="signup-name"]').type(`QA Tester`)
        cy.get('[data-qa="signup-email"]').type('qa-tester--1761215221559@gmail.com') 
        cy.contains('button','Signup').click()
        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')
    });

    it.only('Enviar um Formulário de Contacto com upload de arquivo',()=> {
        cy.get(`a[href*=contact]`).click()

        cy.get('[data-qa="name"]').type(userData.name)
        cy.get('[data-qa="email"]').type(userData.email)
        cy.get('[data-qa="subject"]').type(userData.subject)
        cy.get('[data-qa="message"]').type(userData.message)

        cy.fixture('example.json').as('arquivo')
        cy.get('input[type=file]').selectFile('@arquivo')

        cy.get('[data-qa="submit-button"]').click()

        cy.get('.status').should('be.visible')
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')

    });

   
});