import { ComponentTester } from './component-tester';
import { TestHtmlElement } from './test-html-element';
import { DebugElement } from '@angular/core';

/**
 * A wrapped DOM HTML input element, providing additional methods and attributes helping with writing tests
 */
export class TestInput extends TestHtmlElement<HTMLInputElement> {
  constructor(tester: ComponentTester<unknown>, debugElement: DebugElement) {
    super(tester, debugElement);
  }

  /**
   * Sets the value of the wrapped input, then dispatches an event of type input and triggers a change detection
   * @param value the new value of the input
   */
  fillWith(value: string): void {
    this.nativeElement.value = value;
    this.dispatchEventOfType('input');
  }

  /**
   * the value of the wrapped input
   */
  get value(): string {
    return this.nativeElement.value;
  }

  /**
   * the checked property of the wrapped input
   */
  get checked(): boolean {
    return this.nativeElement.checked;
  }

  /**
   * the disabled property of the wrapped input
   */
  get disabled(): boolean {
    return this.nativeElement.disabled;
  }

  /**
   * Checks the wrapped input, then dispatches an event of type change and triggers a change detection
   */
  check(): void {
    this.nativeElement.checked = true;
    this.dispatchEventOfType('change');
  }

  /**
   * Unchecks the wrapped input, then dispatches an event of type change and triggers a change detection
   */
  uncheck(): void {
    this.nativeElement.checked = false;
    this.dispatchEventOfType('change');
  }
}
