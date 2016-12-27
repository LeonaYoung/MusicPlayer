import { browser, element, by } from 'protractor';

export class BabyplayerPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('bp-root h1')).getText();
  }
}
