import { Component, Directive, Input } from '@angular/core';
import { ComponentTester } from './component-tester';
import { TestBed } from '@angular/core/testing';
import { TestElement } from './test-element';
import { TestHtmlElement } from './test-html-element';
import { TestButton } from './test-button';
import { TestSelect } from './test-select';
import { TestTextArea } from './test-textarea';
import { TestInput } from './test-input';

@Directive({
  selector: '[libTestdir]'
})
class TestDirective {
  @Input('libTestdir') value?: string;
}

@Component({
  selector: 'lib-sub',
  template: ''
})
class SubComponent {
  @Input() sub?: string;
}

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
    <div id="type-parent">
      <div>
        <textarea libTestdir="a" id="textarea2"></textarea>
        <lib-sub libTestdir="b" id="sub1" sub="sub1"></lib-sub>
        <lib-sub id="sub2" sub="sub2"></lib-sub>
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

  get typeParent() {
    return this.element('#type-parent');
  }
}

describe('TestElement', () => {
  let tester: TestComponentTester;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, TestDirective, SubComponent]
    });
    tester = new TestComponentTester();
    tester.detectChanges();
  });

  it('should construct', () => {
    expect(tester.svg).toBeInstanceOf(TestElement);
    expect(tester.svg).not.toBeInstanceOf(TestHtmlElement);
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

  describe('CSS queries', () => {
    let parent: TestElement;

    beforeEach(() => {
      parent = tester.parent;
    });

    it('should select existing input', () => {
      expect(parent.input('#input')).toBeInstanceOf(TestInput);
      expect(parent.input('#input').attr('id')).toBe('input');
    });

    it('should select unexisting input', () => {
      expect(parent.input('#unexisting')).toBeNull();
    });

    it('should throw when selecting input that is not an input', () => {
      expect(() => parent.input('#a')).toThrow();
    });

    it('should select existing button', () => {
      expect(parent.button('#button')).toBeInstanceOf(TestButton);
      expect(parent.button('#button').attr('id')).toBe('button');
    });

    it('should select unexisting button', () => {
      expect(parent.button('#unexisting')).toBeNull();
    });

    it('should throw when selecting button that is not an button', () => {
      expect(() => parent.button('#a')).toThrow();
    });

    it('should select existing select', () => {
      expect(parent.select('#select')).toBeInstanceOf(TestSelect);
      expect(parent.select('#select').attr('id')).toBe('select');
    });

    it('should select unexisting select', () => {
      expect(parent.select('#unexisting')).toBeNull();
    });

    it('should throw when selecting select that is not an select', () => {
      expect(() => parent.select('#a')).toThrow();
    });

    it('should select existing textarea', () => {
      expect(parent.textarea('#textarea')).toBeInstanceOf(TestTextArea);
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

  describe('Type queries', () => {
    let parent: TestElement;

    beforeEach(() => {
      parent = tester.typeParent;
    });

    it('should select existing textarea', () => {
      expect(parent.textarea(TestDirective)).toBeInstanceOf(TestTextArea);
      expect(parent.textarea(TestDirective).attr('id')).toBe('textarea2');
    });

    it('should throw when selecting input that is not an input', () => {
      expect(() => parent.input(TestDirective)).toThrow();
    });

    it('should query elements by type', () => {
      const elements = parent.elements(TestDirective);
      expect(elements.length).toBe(2);
      expect(elements[0]).toBeInstanceOf(TestTextArea);
      expect(elements[0].attr('id')).toBe('textarea2');
      expect(elements[1]).toBeInstanceOf(TestHtmlElement);
      expect(elements[1].attr('id')).toBe('sub1');
    });

    it('should query component', () => {
      expect(parent.component(SubComponent)).toBeInstanceOf(SubComponent);
    });

    it('should query multiple component instances', () => {
      const components = parent.components(SubComponent);
      expect(components.length).toBe(2);
      expect(components[0]).toBeInstanceOf(SubComponent);
      expect(components[0].sub).toBe('sub1');
      expect(components[1]).toBeInstanceOf(SubComponent);
      expect(components[1].sub).toBe('sub2');
    });
  });

  describe('tokens', () => {
    let parent: TestElement;

    beforeEach(() => {
      parent = tester.typeParent;
    });

    it('should query token by type', () => {
      const directive = parent.token(SubComponent, TestDirective);
      expect(directive).toBeInstanceOf(TestDirective);
      expect(directive.value).toBe('b');
    });

    it('should query multiple tokens by type', () => {
      const directives = parent.tokens(SubComponent, TestDirective);
      expect(directives.length).toBe(2);
      expect(directives[0]).toBeInstanceOf(TestDirective);
      expect(directives[0]?.value).toBe('b');
      expect(directives[1]).toBeNull();
    });

    it('should query token by CSS', () => {
      const directive = parent.token('lib-sub', TestDirective);
      expect(directive).toBeInstanceOf(TestDirective);
      expect(directive.value).toBe('b');
    });

    it('should query multiple tokens by CSS', () => {
      const directives = parent.tokens('lib-sub', TestDirective);
      expect(directives.length).toBe(2);
      expect(directives[0]).toBeInstanceOf(TestDirective);
      expect(directives[0]?.value).toBe('b');
      expect(directives[1]).toBeNull();
    });

    it('should query directive', () => {
      const directive = parent.token(TestDirective, TestDirective);
      expect(directive).toBeInstanceOf(TestDirective);
      expect(directive.value).toBe('a');
    });

    it('should query multiple directive', () => {
      const directives = parent.tokens(TestDirective, TestDirective);
      expect(directives.length).toBe(2);
      expect(directives[0]).toBeInstanceOf(TestDirective);
      expect(directives[0]?.value).toBe('a');
      expect(directives[1]).toBeInstanceOf(TestDirective);
      expect(directives[1]?.value).toBe('b');
    });
  });
});
