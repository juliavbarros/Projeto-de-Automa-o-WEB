class Footer {
  // Rola até o rodapé
  scrollParaFooter() {
    cy.scrollTo("bottom");
  }

  // Digita e envia o e-mail na área de subscription
  inscreverEmailFooter(email) {
    cy.get("#susbscribe_email").clear().type(email);
    cy.get("#subscribe").click();
  }
}

export default new Footer();
