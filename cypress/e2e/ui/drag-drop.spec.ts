import DragDropPage from '../../support/pages/DragDropPage';

describe('Drag and Drop', () => {
  let dragDropPage: DragDropPage;

  beforeEach(() => {
    dragDropPage = new DragDropPage();
    dragDropPage.visit();
  })

  it('should drag column A to column B', () => {
    cy.log('Verifying initial state of columns');
    dragDropPage.verifyInitialState();

    cy.log('Dragging column A to column B');
    dragDropPage.dragAtoB();

    cy.log('Verifying state after dragging A to B');
    dragDropPage.verifyAfterDragAtoB();
  })

  it('should drag column B to column A', () => {
    cy.log('Verifying initial state of columns');
    dragDropPage.verifyInitialState();

    cy.log('Dragging column B to column A');
    dragDropPage.dragBtoA();

    cy.log('Verifying state after dragging B to A');
    dragDropPage.verifyAfterDragBtoA();
  })

  it('should handle multiple drag operations', () => {
    cy.log('Dragging column A to column B');
    dragDropPage.dragAtoB();
    dragDropPage.verifyAfterDragAtoB();

    cy.log('Dragging column B back to column A');
    dragDropPage.dragAtoB(); 
    dragDropPage.verifyBackToInitial();
  })
})