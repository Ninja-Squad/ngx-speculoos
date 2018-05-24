import { ComponentTester } from './component-tester';
import { TestHtmlElement } from './test-html-element';
import { DebugElement } from '@angular/core';

/**
 * A wrapped button element, providing additional methods and attributes helping with writing tests
 */
export class TestButton extends TestHtmlElement<HTMLButtonElement> {
  constructor(tester: ComponentTester<any>, debugElement: DebugElement) {
    super(tester, debugElement);
  }

  /**
   * the disabled flag of the button
   */
  get disabled() {
    return this.nativeElement.disabled;
  }
}
