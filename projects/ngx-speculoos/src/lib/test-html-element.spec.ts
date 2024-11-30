import { Component, signal } from '@angular/core';
import { ComponentTester } from './component-tester';
import { TestBed } from '@angular/core/testing';
import { TestHtmlElement } from './test-html-element';
import { provideAutomaticChangeDetection } from './providers';

@Component({
  template: `
    <a id="link1" (click)="onClick()">Test</a>
    <div id="outer" [style]="'display: ' + (invisible() ? 'none' : 'block')">
      <div id="inner"></div>
    </div>
    <span id="text">{{ text() }}</span>
  `
})
class TestComponent {
  invisible = signal(false);
  text = signal('');

  onClick() {
    this.text.set('clicked');
  }
}

class TestComponentTester extends ComponentTester<TestComponent> {
  constructor() {
    super(TestComponent);
  }

  get link() {
    return this.element<HTMLAnchorElement>('#link1');
  }

  get outerDiv() {
    return this.element<HTMLDivElement>('#outer');
  }

  get innerDiv() {
    return this.element<HTMLDivElement>('#inner');
  }

  get text() {
    return this.element('#text');
  }
}

describe('TestHtmlElement', () => {
  let tester: TestComponentTester;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    tester = new TestComponentTester();
    tester.detectChanges();
  });

  it('should construct', () => {
    expect(tester.link instanceof TestHtmlElement).toBe(true);
  });

  it('should click', () => {
    spyOn(tester.componentInstance, 'onClick').and.callThrough();
    spyOn(tester, 'change').and.callThrough();

    tester.link.click();

    expect(tester.text.textContent).toBe('clicked');
    expect(tester.componentInstance.onClick).toHaveBeenCalled();
    expect(tester.change).toHaveBeenCalled();
  });

  it('should be visible', () => {
    expect(tester.outerDiv.visible).toBe(true);
    expect(tester.innerDiv.visible).toBe(true);
  });

  it('should not be visible if display or ancestor display is none', () => {
    tester.componentInstance.invisible.set(true);
    tester.change();
    expect(tester.outerDiv.visible).toBe(false);
    expect(tester.innerDiv.visible).toBe(false);
  });
});

describe('TestHtmlElement in automatic mode', () => {
  let tester: TestComponentTester;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideAutomaticChangeDetection()]
    });
    tester = new TestComponentTester();
    await tester.change();
  });

  it('should click', async () => {
    spyOn(tester.componentInstance, 'onClick').and.callThrough();
    spyOn(tester, 'change').and.callThrough();

    await tester.link.click();

    expect(tester.text.textContent).toBe('clicked');
    expect(tester.componentInstance.onClick).toHaveBeenCalled();
    expect(tester.change).toHaveBeenCalled();
  });

  it('should not be visible if display or ancestor display is none', async () => {
    tester.componentInstance.invisible.set(true);
    await tester.change();
    expect(tester.outerDiv.visible).toBe(false);
    expect(tester.innerDiv.visible).toBe(false);
  });
});
