import { Component } from '@angular/core';
import { ComponentTester } from './component-tester';
import { TestBed } from '@angular/core/testing';
import { TestElement } from './test-element';
import { TestHtmlElement } from './test-html-element';
import { TestButton } from './test-button';
import { TestSelect } from './test-select';
import { TestTextArea } from './test-textarea';
import { TestInput } from './test-input';

@Component({
  template: `
    <svg id="s1" foo="bar" class="baz bing" (change)="onChange($event)">Test</svg>
    <div id="parent">
      <div>
        <svg id="svg"></svg>
        <a id="a">link</a>
        <input id="input" />
        <button id="button">Test</button>
        <select id="select" name="foo"></select>
        <textarea id="textarea"></textarea>
      </div>
    </div>
  `
})
class TestComponent {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange($event: Event) {}
}

class TestComponentTester extends ComponentTester<TestComponent> {
  constructor() {
    super(TestComponent);
  }

  get svg() {
    return this.element('#s1');
  }

  get parent() {
    return this.element('#parent');
  }
}

describe('TestElement', () => {
  let tester: TestComponentTester;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent]
    });
    tester = new TestComponentTester();
    tester.detectChanges();
  });

  it('should construct', () => {
    expect(tester.svg instanceof TestElement).toBe(true);
    expect(tester.svg instanceof TestHtmlElement).toBe(false);
  });

  it('should expose the native element', () => {
    expect(tester.svg.nativeElement).toBe(tester.nativeElement.querySelector('#s1'));
  });

  it('should expose the debug element', () => {
    expect(tester.svg.debugElement.nativeElement).toBe(tester.nativeElement.querySelector('#s1'));
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

  describe('queries', () => {
    let parent: TestElement;

    beforeEach(() => {
      parent = tester.parent;
    });

    it('should select existing input', () => {
      expect(parent.input('#input') instanceof TestInput).toBe(true);
      expect(parent.input('#input').attr('id')).toBe('input');
    });

    it('should select unexisting input', () => {
      expect(parent.input('#unexisting')).toBeNull();
    });

    it('should throw when selecting input that is not an input', () => {
      expect(() => parent.input('#a')).toThrow();
    });

    it('should select existing button', () => {
      expect(parent.button('#button') instanceof TestButton).toBe(true);
      expect(parent.button('#button').attr('id')).toBe('button');
    });

    it('should select unexisting button', () => {
      expect(parent.button('#unexisting')).toBeNull();
    });

    it('should throw when selecting button that is not an button', () => {
      expect(() => parent.button('#a')).toThrow();
    });

    it('should select existing select', () => {
      expect(parent.select('#select') instanceof TestSelect).toBe(true);
      expect(parent.select('#select').attr('id')).toBe('select');
    });

    it('should select unexisting select', () => {
      expect(parent.select('#unexisting')).toBeNull();
    });

    it('should throw when selecting select that is not an select', () => {
      expect(() => parent.select('#a')).toThrow();
    });

    it('should select existing textarea', () => {
      expect(parent.textarea('#textarea') instanceof TestTextArea).toBe(true);
      expect(parent.textarea('#textarea').attr('id')).toBe('textarea');
    });

    it('should select unexisting textarea', () => {
      expect(parent.textarea('#unexisting')).toBeNull();
    });

    it('should throw when selecting textarea that is not an textarea', () => {
      expect(() => parent.textarea('#a')).toThrow();
    });

    it('should only query children', () => {
      expect(parent.element('#s1')).toBeNull();
      expect(parent.element('#parent')).toBeNull();
    });

    it('should support complex queries', () => {
      expect(parent.select('div:first-of-type select[name=foo]').nativeElement).toBe(tester.select('#select').nativeElement);
      expect(parent.select('div:first-of-type select[name=bar]')).toBeNull();
    });
  });
});
