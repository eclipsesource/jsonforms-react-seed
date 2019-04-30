/// <reference types="Cypress" />

context('Form', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('should change input values', () => {
    const nameText = 'John Deer';
    cy.get('[id="#/properties/name-input"]').clear().type(nameText);

    const descText = 'This is a desc test';
    cy.get('[id="#/properties/description-input"]').clear().type(descText);

    cy.get('[id="#/properties/done-input"]').uncheck();

    cy.get('[id="#/properties/recurrence"] > div').click();
    cy.get('[data-value="Monthly"]').click();

    const recurrenceIntervalText = 10;
    cy.get('[id="#/properties/recurrence_interval-input"]').clear().type(recurrenceIntervalText);

    cy.get('[id="#/properties/due_date-input"]').clear().type('35');

    cy.get('[id="#/properties/rating"] span:last').click();

    cy.get('[id="boundData"]').invoke('text').then((content => {
      const data = JSON.parse(content);

      expect(data.name).to.equal(nameText);
      cy.get('[id="#/properties/name"] p').should('be.empty')

      cy.get('[id="#/properties/recurrence_interval"]').should('exist')

      expect(data.description).to.equal(descText);
      expect(data.done).to.equal(false);
      expect(data.recurrence).to.equal('Monthly');
      expect(data.recurrence_interval).to.equal(recurrenceIntervalText);
      expect(data.due_date).to.equal('2001-03-15');
      expect(data.rating).to.equal(5);
    }));
  });

  it('should show errors', () => {
    cy.get('[id="#/properties/name-input"]').clear();

    cy.get('[id="#/properties/name"] p').should('not.be.empty');

    cy.get('[id="#/properties/due_date-input"]').clear().type('351');

    cy.get('[id="#/properties/due_date"] p').should('not.be.empty');

    cy.get('[id="#/properties/recurrence"] > div').click();
    cy.get('[data-value="Never"]').click();

    cy.get('[id="#/properties/recurrence_interval"]').should('not.exist')

    cy.get('[id="boundData"]').invoke('text').then((content => {
      const data = JSON.parse(content);

      expect(data.due_date).to.equal('Invalid date');
    }));
  });
})
