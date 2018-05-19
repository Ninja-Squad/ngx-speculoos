import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Type } from '@angular/core';
import { TestTextArea } from './test-textarea';
import { TestElement } from './test-element';
import { TestInput } from './test-input';
import { TestSelect } from './test-select';
import { TestButton } from './test-button';

export class ComponentTester<T> {

  readonly nativeElement: HTMLElement;

  static create<T>(type: Type<T>) {
    const fixture = TestBed.createComponent(type);
    return new ComponentTester(fixture);
  }

  constructor(public fixture: ComponentFixture<T>) {
    this.nativeElement = fixture.nativeElement;
  }

  get componentInstance(): T {
    return this.fixture.componentInstance;
  }

  get debugElement(): DebugElement {
    return this.fixture.debugElement;
  }

  element<E extends Element>(selector: string): TestElement<E> | null {
    const el: E = this.nativeElement.querySelector(selector);
    return el && new TestElement<E>(this, el);
  }

  elements<E extends Element>(selector: string): Array<TestElement<E>> {
    const elements = Array.prototype.slice.call(this.nativeElement.querySelectorAll(selector));
    return elements.map(e => new TestElement<E>(this, e));
  }

  input(selector: string): TestInput {
    const el: HTMLInputElement = this.nativeElement.querySelector(selector);
    return el && new TestInput(this, el);
  }

  select(selector: string): TestSelect {
    const el: HTMLSelectElement = this.nativeElement.querySelector(selector);
    return el && new TestSelect(this, el);
  }

  textarea(selector: string): TestTextArea {
    const el: HTMLTextAreaElement = this.nativeElement.querySelector(selector);
    return el && new TestTextArea(this, el);
  }

  button(selector: string): TestButton {
    const el: HTMLButtonElement = this.nativeElement.querySelector(selector);
    return el && new TestButton(this, el);
  }

  detectChanges(checkNoChanges?: boolean) {
    this.fixture.detectChanges(checkNoChanges);
  }
}
