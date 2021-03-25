import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentTester } from './component-tester';
import { Component } from '@angular/core';
import { TestElement } from './test-element';
import { TestInput } from './test-input';
import { TestButton } from './test-button';
import { TestSelect } from './test-select';
import { TestTextArea } from './test-textarea';
import { TestHtmlElement } from './test-html-element';

@Component({
  template: `
    <svg id="svg"></svg>
    <a id="a">link</a>
    <input id="input" />
    <button id="button">Test</button>
    <select id="select"></select>
    <textarea id="textarea"></textarea>
  `
})
class TestComponent {}

describe('ComponentTester', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent]
    });
  });

  describe('creation', () => {
    it('should create via constructor with a component type', () => {
      const tester = new ComponentTester<TestComponent>(TestComponent);
      expect(tester.fixture instanceof ComponentFixture).toBe(true);
      expect(tester.fixture.componentInstance instanceof TestComponent).toBe(true);
    });

    it('should create via constructor with a fixture', () => {
      const fixture = TestBed.createComponent(TestComponent);
      const tester = new ComponentTester<TestComponent>(fixture);
      expect(tester.fixture).toBe(fixture);
    });

    it('should create via factory method', () => {
      const tester = ComponentTester.create(TestComponent);
      expect(tester.fixture instanceof ComponentFixture).toBe(true);
      expect(tester.fixture.componentInstance instanceof TestComponent).toBe(true);
    });
  });

  describe('usage', () => {
    let tester: ComponentTester<TestComponent>;

    beforeEach(() => {
      tester = ComponentTester.create(TestComponent);
      tester.detectChanges();
    });

    it('should select existing element and wrap it', () => {
      expect(tester.element('#svg') instanceof TestElement).toBe(true);
      expect(tester.element('#a') instanceof TestHtmlElement).toBe(true);
      expect(tester.element('#input') instanceof TestInput).toBe(true);
      expect(tester.element('#button') instanceof TestButton).toBe(true);
      expect(tester.element('#select') instanceof TestSelect).toBe(true);
      expect(tester.element('#textarea') instanceof TestTextArea).toBe(true);
    });

    it('should select unexisting element', () => {
      expect(tester.element('#unexisting')).toBeNull();
    });

    it('should select existing elements and wrap them', () => {
      const elements = tester.elements('[id]');
      expect(elements.length).toBe(6);
      expect(elements[0] instanceof TestElement).toBe(true);
      expect(elements[1] instanceof TestHtmlElement).toBe(true);
      expect(elements[2] instanceof TestInput).toBe(true);
      expect(elements[3] instanceof TestButton).toBe(true);
      expect(elements[4] instanceof TestSelect).toBe(true);
      expect(elements[5] instanceof TestTextArea).toBe(true);
    });

    it('should select unexisting elements', () => {
      const elements = tester.elements('unexisting');
      expect(elements).toEqual([]);
    });

    it('should expose fixture', () => {
      expect(tester.fixture instanceof ComponentFixture).toBe(true);
    });

    it('should expose native element', () => {
      expect(tester.nativeElement).toBe(tester.fixture.nativeElement);
    });

    it('should expose debug element', () => {
      expect(tester.debugElement).toBe(tester.fixture.debugElement);
    });

    it('should expose test element', () => {
      expect(tester.testElement.debugElement).toBe(tester.fixture.debugElement);
      expect(tester.testElement.nativeElement).toBe(tester.fixture.nativeElement);
    });

    it('should expose component instance', () => {
      expect(tester.componentInstance).toBe(tester.fixture.componentInstance);
    });

    it('should detect changes', () => {
      spyOn(tester.fixture, 'detectChanges');

      tester.detectChanges(true);

      expect(tester.fixture.detectChanges).toHaveBeenCalledWith(true);
    });

    it('should select existing input', () => {
      expect(tester.input('#input') instanceof TestInput).toBe(true);
      expect(tester.input('#input').attr('id')).toBe('input');
    });

    it('should select unexisting input', () => {
      expect(tester.input('#unexisting')).toBeNull();
    });

    it('should throw when selecting input that is not an input', () => {
      expect(() => tester.input('#a')).toThrow();
    });

    it('should select existing button', () => {
      expect(tester.button('#button') instanceof TestButton).toBe(true);
      expect(tester.button('#button').attr('id')).toBe('button');
    });

    it('should select unexisting button', () => {
      expect(tester.button('#unexisting')).toBeNull();
    });

    it('should throw when selecting button that is not an button', () => {
      expect(() => tester.button('#a')).toThrow();
    });

    it('should select existing select', () => {
      expect(tester.select('#select') instanceof TestSelect).toBe(true);
      expect(tester.select('#select').attr('id')).toBe('select');
    });

    it('should select unexisting select', () => {
      expect(tester.select('#unexisting')).toBeNull();
    });

    it('should throw when selecting select that is not an select', () => {
      expect(() => tester.select('#a')).toThrow();
    });

    it('should select existing textarea', () => {
      expect(tester.textarea('#textarea') instanceof TestTextArea).toBe(true);
      expect(tester.textarea('#textarea').attr('id')).toBe('textarea');
    });

    it('should select unexisting textarea', () => {
      expect(tester.textarea('#unexisting')).toBeNull();
    });

    it('should throw when selecting textarea that is not an textarea', () => {
      expect(() => tester.textarea('#a')).toThrow();
    });
  });
});
