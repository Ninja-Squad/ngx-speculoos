import { Component } from '@angular/core';
import { ComponentTester } from './component-tester';
import { TestBed } from '@angular/core/testing';
import { TestHtmlElement } from './test-html-element';

@Component({
  template: `
    <a id="link1" (click)="onClick($event)">Test</a>
    <div id="outer" [style]="'display: ' + (invisible ? 'none' : 'block')">
      <div id="inner"></div>
    </div>
  `
})
class TestComponent {
  invisible = false;
  onClick($event: Event) { }
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

  it('should be visible', () => {
    expect(tester.outerDiv.visible).toBe(true);
    expect(tester.innerDiv.visible).toBe(true);
  });

  it('should not be visible if display or ancestor display is none', () => {
    tester.componentInstance.invisible = true;
    tester.detectChanges();
    expect(tester.outerDiv.visible).toBe(false);
    expect(tester.innerDiv.visible).toBe(false);
  });
});
