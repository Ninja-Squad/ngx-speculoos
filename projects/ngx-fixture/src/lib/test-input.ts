import { ComponentTester } from './component-tester';
import { TestElement } from './test-element';

export class TestInput extends TestElement<HTMLInputElement> {
  constructor(tester: ComponentTester<any>, nativeElement: HTMLInputElement) {
    super(tester, nativeElement);
  }

  fillWith(value: string) {
    this.nativeElement.value = value;
    this.dispatchEventOfType('input');
  }

  get value() {
    return this.nativeElement.value;
  }

  get checked() {
    return this.nativeElement.checked;
  }

  check() {
    this.nativeElement.checked = true;
    this.dispatchEventOfType('change');
  }
}
