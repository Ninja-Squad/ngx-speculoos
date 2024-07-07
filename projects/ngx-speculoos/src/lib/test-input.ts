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
    if (this.tester.isAutoDetectingChanges()) {
      throw new Error('Avoid calling fillWith when the autoDetectChanges option is true');
    }
    this.nativeElement.value = value;
    this.dispatchEventOfType('input');
  }

  /**
   * Sets the value of the wrapped input, then dispatches an event of type input and awaits the tester is stable
   * @param value the new value of the input
   */
  async asyncFillWith(value: string): Promise<void> {
    this.nativeElement.value = value;
    await this.asyncDispatchEventOfType('input');
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
    if (this.tester.isAutoDetectingChanges()) {
      throw new Error('Avoid calling check when the autoDetectChanges option is true');
    }
    this.nativeElement.checked = true;
    this.dispatchEventOfType('change');
  }

  /**
   * Checks the wrapped input, then dispatches an event of type change and awaits the tester is stable
   */
  async asyncCheck(): Promise<void> {
    this.nativeElement.checked = true;
    await this.asyncDispatchEventOfType('change');
  }

  /**
   * Unchecks the wrapped input, then dispatches an event of type change and triggers a change detection
   */
  uncheck(): void {
    if (this.tester.isAutoDetectingChanges()) {
      throw new Error('Avoid calling uncheck when the autoDetectChanges option is true');
    }
    this.nativeElement.checked = false;
    this.dispatchEventOfType('change');
  }

  /**
   * Unchecks the wrapped input, then dispatches an event of type change and awaits the tester is stable
   */
  async asyncUncheck(): Promise<void> {
    this.nativeElement.checked = false;
    await this.asyncDispatchEventOfType('change');
  }
}
