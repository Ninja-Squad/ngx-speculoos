import { Component } from '@angular/core';
import { ComponentTester } from './component-tester';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestElement } from './test-element';
import { TestHtmlElement } from './test-html-element';

@Component({
  template: `
    <svg id="s1" foo="bar" class="baz bing" (change)="onChange($event)">Test</svg>
  `
})
class TestComponent {
  onChange($event) { }
}

class TestComponentTester extends ComponentTester<TestComponent> {
  constructor(fixture: ComponentFixture<TestComponent>) {
    super(fixture);
  }

  get svg() {
    return this.element('#s1');
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
    tester = new TestComponentTester(TestBed.createComponent(TestComponent));
    tester.detectChanges();
  });

  it('should construct', () => {
    expect(tester.svg instanceof TestElement).toBe(true);
    expect(tester.svg instanceof TestHtmlElement).toBe(false);
  });

  it('should get the text content', () => {
    expect(tester.svg.textContent).toBe('Test');
  });

  it('should get the classes', () => {
    expect(tester.svg.classes).toEqual(['baz', 'bing']);
  });

  it('should get the attribute', () => {
    expect(tester.svg.attr('foo')).toBe('bar');
  });

  it('should dispatch an event', () => {
    spyOn(tester.componentInstance, 'onChange');
    spyOn(tester, 'detectChanges');

    const event = new Event('change');
    tester.svg.dispatchEvent(event);

    expect(tester.componentInstance.onChange).toHaveBeenCalledWith(event);
    expect(tester.detectChanges).toHaveBeenCalled();
  });

  it('should dispatch an event of a given type', () => {
    spyOn(tester.componentInstance, 'onChange');
    spyOn(tester, 'detectChanges');

    tester.svg.dispatchEventOfType('change');

    expect(tester.componentInstance.onChange).toHaveBeenCalled();
    expect(tester.detectChanges).toHaveBeenCalled();
  });
});
