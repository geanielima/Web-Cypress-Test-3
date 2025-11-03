class DragDropPage {
  // Selectors
  private columnA = '#column-a';
  private columnB = '#column-b';
  private columnAHeader = '#column-a header';
  private columnBHeader = '#column-b header';

  // Methods
  visit() {
    cy.visit('https://the-internet.herokuapp.com/drag_and_drop');
  }

  getColumnA() {
    return cy.get(this.columnA);
  }

  getColumnB() {
    return cy.get(this.columnB);
  }

  getColumnAHeader() {
    return cy.get(this.columnAHeader);
  }

  getColumnBHeader() {
    return cy.get(this.columnBHeader);
  }

  dragAtoB() {
    cy.dragDrop(this.columnA, this.columnB);
  }

  dragBtoA() {
    cy.dragDrop(this.columnB, this.columnA);
  }

  verifyInitialState() {
    this.getColumnAHeader().should('contain', 'A');
    this.getColumnBHeader().should('contain', 'B');
  }

  verifyAfterDragAtoB() {
    this.getColumnAHeader().should('contain', 'B');
    this.getColumnBHeader().should('contain', 'A');
  }

  verifyAfterDragBtoA() {
    this.getColumnAHeader().should('contain', 'B');
    this.getColumnBHeader().should('contain', 'A');
  }

  verifyBackToInitial() {
    this.getColumnAHeader().should('contain', 'A');
    this.getColumnBHeader().should('contain', 'B');
  }
}

export default DragDropPage;