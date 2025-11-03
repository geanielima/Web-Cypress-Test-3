class UploadFilePage {
  // Selectors
  private fileUploadInput = '#file-upload';
  private fileSubmitButton = '#file-submit';

  // Methods
  visit() {
    cy.visit('/upload');
  }

  getFileUploadInput() {
    return cy.get(this.fileUploadInput);
  }

  getFileSubmitButton() {
    return cy.get(this.fileSubmitButton);
  }

  selectFile(fileName: string) {
    this.getFileUploadInput().selectFile(fileName);
  }

  selectFileWithDragDrop(fileName: string) {
    this.getFileUploadInput().selectFile(fileName, { action: 'drag-drop' });
  }

  submitUpload() {
    this.getFileSubmitButton().click();
  }

  uploadFile(fileName: string) {
    this.selectFile(fileName);
    this.submitUpload();
  }

  uploadFileWithDragDrop(fileName: string) {
    this.selectFileWithDragDrop(fileName);
    this.submitUpload();
  }

  verifyPageLoaded() {
    cy.contains('File Uploader').should('be.visible');
    this.getFileUploadInput().should('be.visible');
    this.getFileSubmitButton().should('be.visible').and('contain', 'Upload');
  }

  verifyFileInputType() {
    this.getFileUploadInput().should('have.attr', 'type', 'file');
  }

  verifyFileSelected(expectedCount: number = 1) {
    this.getFileUploadInput().then($input => {
      const input = $input[0] as HTMLInputElement;
      const files = input.files;
      expect(files?.length).to.equal(expectedCount);
    });
  }

  verifyUploadSuccess(fileName: string) {
    cy.contains('File Uploaded!').should('exist');
    cy.contains(fileName).should('exist');
  }

  verifyOnUploadPage() {
    cy.url().should('include', '/upload');
  }
}

export default UploadFilePage;