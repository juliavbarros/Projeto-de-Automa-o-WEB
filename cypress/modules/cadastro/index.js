import { faker } from "@faker-js/faker";
class Cadastro {
  preencherFormularioDeCadastroCompleto() {
    cy.get("#id_gender1").check();

    cy.get("input#password").type("123456", { log: false });

    cy.get("select[data-qa=days]").select("20");
    cy.get("select[data-qa=months]").select("September");
    cy.get("select[data-qa=years]").select("1990");

    cy.get("input[type=checkbox]#newsletter").check();
    cy.get("input[type=checkbox]#optin").check();

    cy.get('[data-qa="first_name"]').type("Pituca");
    cy.get('[data-qa="last_name"]').type("Valente");
    cy.get("input#company").type("PGATS");
    cy.get("input#address1").type("Avenida Seleniun, n 2004");
    cy.get("select#country").select("Canada");
    cy.get("input#state").type("California");
    cy.get("input#city").type("Los Angeles");
    cy.get('[data-qa="zipcode"]').type("1500-000");
    cy.get('[data-qa="mobile_number"]').type("111 222 333");
    cy.get("[data-qa=days]").select("20");
    cy.get("[data-qa=months]").select("September");
    cy.get("[data-qa=years]").select("1990");
    cy.get('[data-qa="create-account"]').click();
  }
}

export default new Cadastro();
