import { Component } from '@angular/core';
import { ComponentTester } from './component-tester';
import { TestBed } from '@angular/core/testing';
import { TestElement } from './test-element';
import { TestHtmlElement } from './test-html-element';

@Component({
  template: `
    <a id="link1" (click)="onClick($event)">Test</a>
  `
})
class TestComponent {
  onClick($event: Event) { }
}

class TestComponentTester extends ComponentTester<TestComponent> {
  constructor() {
    super(TestComponent);
  }

  get link() {
    return this.element('#link1') as TestHtmlElement<HTMLAnchorElement>;
  }
}

describe('TestElement', () => {
  let tester: TestComponentTester;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent
      ]
    });
    tester = new TestComponentTester();
    tester.detectChanges();
  });

  it('should construct', () => {
    expect(tester.link instanceof TestHtmlElement).toBe(true);
  });

  it('should click', () => {
    spyOn(tester.componentInstance, 'onClick');
    spyOn(tester, 'detectChanges');

    tester.link.click();

    expect(tester.componentInstance.onClick).toHaveBeenCalled();
    expect(tester.detectChanges).toHaveBeenCalled();
  });
});
