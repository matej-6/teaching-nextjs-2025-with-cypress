describe("Album Catalog - Basic Checks", () => {
  it("opens the homepage", () => {
    cy.visit("/");

    // make this test pass by adding the correct attribute data-cy into your page
    cy.get('[data-cy="title"]').should("be.visible");
    cy.get('[data-cy="title"]').should("contain.text", "Spotify");
  });

  it("displays the site title in the header", () => {
    // Arrange
    cy.visit("/");
    cy.get('[data-cy="headerTitle"]').as("headerTitle");

    // Assert
    cy.get("@headerTitle").should("be.visible");
    cy.get("@headerTitle").should("contain.text", "Spotify");
  });

  it("shows at least one album card", () => {
    // Arrange
    cy.visit("/");
    cy.get('[data-cy="albumCardGrid"]').as("albumCardGrid");

    // Assert
    cy.get("@albumCardGrid").should("be.visible");
    cy.get("@albumCardGrid").should("have.length.at.least", 1);
  });

  it("album card has a title and price", () => {
    // Arrange
    cy.visit("/");
    cy.get('[data-cy="albumCard"]')
      .first()
      .within(() => {
        // Assert
        cy.get('[data-cy="albumTitle"]').should("be.visible");
        cy.get('[data-cy="albumPrice"]').should("be.visible");
      });
  });

  it("has a visible search input on the top", () => {
    // Arrange
    cy.visit("/");
    cy.get('[data-cy="navbar"]').within(() => {
      // Assert
      cy.get('[data-cy="searchInput"]').should("be.visible");
    });
  });

  // add at least 3 more tests here

  it("has a visible navbar", () => {
    // Arrange
    cy.visit("/");
    cy.get('[data-cy="navbar"]').as("navbar");

    // Assert
    cy.get("@navbar").should("be.visible");
  });

  it("has a not visible footer when scroll on top", () => {
    // Arrange
    cy.visit("/");
    cy.get('[data-cy="footer"]').as("footer");

    // Act
    cy.scrollTo("top");

    // Assert
    cy.get("@footer").should("be.visible");
  });

  it("has a visible search button on the top", () => {
    // Arrange
    cy.visit("/");
    cy.get('[data-cy="navbar"]').within(() => {
      // Assert
      cy.get('[data-cy="searchButton"]').should("be.visible");
    });
  });
});
