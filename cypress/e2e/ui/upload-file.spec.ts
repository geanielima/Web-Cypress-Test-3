import UploadFilePage from '../../support/pages/UploadFilePage';

describe('Upload File', () => {
  let uploadFilePage: UploadFilePage;

  beforeEach(() => {
    uploadFilePage = new UploadFilePage();
    uploadFilePage.visit();
  })

  it('should display upload page correctly', () => {
    cy.log('verifying if the upload page loaded correctly');
    uploadFilePage.verifyPageLoaded();

    cy.log('verifying that the input is of type file');
    uploadFilePage.verifyFileInputType();
  })

  it('should upload a text file successfully', () => {
    const fileName = 'cypress/fixtures/example.txt'

    cy.log('select file to upload');
    uploadFilePage.selectFile(fileName)

    cy.log('verify file is selected');
    uploadFilePage.verifyFileSelected(1)

    cy.log('submit upload');
    uploadFilePage.submitUpload()

    cy.log('verify upload success');
    uploadFilePage.verifyUploadSuccess('example.txt')
  })

  it('should upload an image file', () => {
    const fileName = 'cypress/fixtures/sample.png'

    cy.log('select imagem file to upload');
    uploadFilePage.uploadFile(fileName)

    cy.log('verify upload success for image file');
    uploadFilePage.verifyUploadSuccess('sample.png')
  })

  it('should upload file using drag and drop', () => {
    const fileName = 'cypress/fixtures/example.txt'

    cy.log('simulate drag and drop to upload file');
    uploadFilePage.uploadFileWithDragDrop(fileName)

    cy.log('verify upload success for drag and drop');
    uploadFilePage.verifyUploadSuccess('example.txt')
  })

  it('should show error for no file selected', () => {
    cy.log('try to submit without selecting file');
    uploadFilePage.submitUpload()

    cy.log('should remain on upload page');
    uploadFilePage.verifyOnUploadPage();
  });
});