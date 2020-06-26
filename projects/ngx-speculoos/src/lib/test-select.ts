import { ComponentTester } from './component-tester';
import { TestHtmlElement } from './test-html-element';
import { DebugElement } from '@angular/core';

/**
 * A wrapped DOM HTML select element, providing additional methods and attributes helping with writing tests
 */
export class TestSelect extends TestHtmlElement<HTMLSelectElement> {
  constructor(tester: ComponentTester<unknown>, debugElement: DebugElement) {
    super(tester, debugElement);
  }

  /**
   * Selects the option at the given index, then dispatches an event of type change and triggers a change detection
   */
  selectIndex(index: number) {
    this.nativeElement.selectedIndex = index;
    this.dispatchEventOfType('change');
  }

  /**
   * Selects the first option with the given value, then dispatches an event of type change and triggers a change detection.
   * If there is no option with the given value, then does nothing
   * TODO should it throw instead?
   */
  selectValue(value: string) {
    const index = this.optionValues.indexOf(value);
    if (index >= 0) {
      this.selectIndex(index);
    }
  }

  /**
   * Selects the first option with the given label (or text), then dispatches an event of type change and triggers a change detection.
   * If there is no option with the given label, then does nothing
   * TODO should it throw instead?
   */
  selectLabel(label: string) {
    const index = this.optionLabels.indexOf(label);
    if (index >= 0) {
      this.selectIndex(index);
    }
  }

  /**
   * the selected index of the wrapped select
   */
  get selectedIndex(): number {
    return this.nativeElement.selectedIndex;
  }

  /**
   * the value of the selected option of the wrapped select, or null if there is no selected option
   */
  get selectedValue(): string | null {
    if (this.selectedIndex < 0) {
      return null;
    }
    return this.nativeElement.options[this.selectedIndex].value;
  }

  /**
   * the label (or text if no label) of the selected option of the wrapped select, or null if there is no selected option
   */
  get selectedLabel(): string | null {
    if (this.selectedIndex < 0) {
      return null;
    }
    return this.nativeElement.options[this.selectedIndex].label;
  }

  /**
   * the values of the options, as an array
   */
  get optionValues(): Array<string> {
    return (Array.prototype.slice.call(this.nativeElement.options) as Array<HTMLOptionElement>).map(option => option.value);
  }

  /**
   * the labels (or texts if no label) of the options, as an array
   */
  get optionLabels(): Array<string> {
    return (Array.prototype.slice.call(this.nativeElement.options) as Array<HTMLOptionElement>).map(option => option.label);
  }

  /**
   * the number of options in the select
   */
  get size() {
    return this.nativeElement.options.length;
  }

  /**
   * the disabled property of the wrapped select
   */
  get disabled() {
    return this.nativeElement.disabled;
  }
}
