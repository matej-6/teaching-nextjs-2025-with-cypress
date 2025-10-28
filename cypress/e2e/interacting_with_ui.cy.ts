describe("Album Catalog - Interactions", () => {
  it("looks for songs when searching via search bar", () => {
    // Arrange
    cy.visit("/");
    cy.get('[data-cy="searchInput"]').as("searchInput");
    cy.get('[data-cy="searchButton"]').as("searchButton");
    const inputText = "Hello";

    // Act
    cy.get("@searchInput").type(inputText);
    cy.get("@searchButton").click();

    // Assert
    cy.location("search").should("equal", "?q=" + inputText);
  });

  it("navigates to the first album detail", () => {
    // Arrange
    cy.visit("/");
    const id = 1;
    cy.get('[data-cy="albumCard"]')
      .first()
      .within(() => {
        cy.get('[data-cy="detailButton"]').as("detailButton");
      });

    // Act
    cy.get("@detailButton").click();

    // Assert
    cy.location("pathname").should("equal", `/album/${id}`);
  });

  it("navigates to home page after clicking on Spotify logo", () => {
    // Arrange
    cy.visit("/");
    cy.get('[data-cy="headerTitle"]').as("headerTitle");

    // Act
    cy.get("@headerTitle").click();

    // Assert
    cy.location("pathname").should("equal", "/");
  });

  // add at least 3 more tests here

  it("has an usable search input", () => {
    // Arrange
    cy.visit("/");
    cy.get('[data-cy="searchInput"]').as("searchInput");
    const typedText = "Hello";

    // Act
    cy.get("@searchInput").type(typedText);

    // Assert
    cy.get("@searchInput").should("be.visible");
    cy.get("@searchInput").should("not.be.disabled");
    cy.get("@searchInput").should("have.value", typedText);
  });

  it("should be possible to scroll down", () => {
    // Arrange
    cy.visit("/");
    cy.get('[data-cy="title"]').as("title");

    // Act
    cy.scrollTo("bottom");

    // Assert
    cy.get("@title").should("not.be.visible");
  });

  it("should be possible to search with empty query", () => {
    // Arrange
    cy.visit("/");
    cy.get('[data-cy="searchButton"]').as("searchButton");

    // Act
    cy.get("@searchButton").click();

    // Assert
    cy.location("pathname").should("equal", "/search");
  });

  it("should display 'No Search query' after searching with an empty query", () => {
    // Arrange
    cy.visit("/");
    cy.get('[data-cy="searchButton"]').as("searchButton");

    // Act
    cy.get("@searchButton").click();

    // Assert
    cy.get('[data-cy="no-search-query"]').should(
      "have.text",
      "No Search query"
    );
  });
});
