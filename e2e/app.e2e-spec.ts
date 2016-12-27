import { BabyplayerPage } from './app.po';

describe('babyplayer App', function() {
  let page: BabyplayerPage;

  beforeEach(() => {
    page = new BabyplayerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('bp works!');
  });
});
