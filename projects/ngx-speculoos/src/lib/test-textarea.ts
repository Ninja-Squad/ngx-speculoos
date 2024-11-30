import { ComponentTester } from './component-tester';
import { TestHtmlElement } from './test-html-element';
import { DebugElement } from '@angular/core';

/**
 * A wrapped DOM HTML textarea element, providing additional methods and attributes helping with writing tests
 */
export class TestTextArea extends TestHtmlElement<HTMLTextAreaElement> {
  constructor(tester: ComponentTester<unknown>, debugElement: DebugElement) {
    super(tester, debugElement);
  }

  /**
   * Sets the value of the wrapped textarea, then dispatches an event of type input and triggers a change detection
   * @param value the new value of the textarea
   */
  async fillWith(value: string): Promise<void> {
    this.nativeElement.value = value;
    await this.dispatchEventOfType('input');
  }

  /**
   * the value of the wrapped textarea
   */
  get value(): string {
    return this.nativeElement.value;
  }

  /**
   * the disabled property of the wrapped textarea
   */
  get disabled(): boolean {
    return this.nativeElement.disabled;
  }
}
