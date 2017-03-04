import { RateBoardAngularAppPage } from './app.po';

describe('rate-board-angular-app App', function() {
  let page: RateBoardAngularAppPage;

  beforeEach(() => {
    page = new RateBoardAngularAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
