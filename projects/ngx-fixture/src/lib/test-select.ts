import { ComponentTester } from './component-tester';
import { TestElement } from './test-element';

export class TestSelect extends TestElement<HTMLSelectElement> {
  constructor(tester: ComponentTester<any>, public nativeElement: HTMLSelectElement) {
    super(tester, nativeElement);
  }

  selectIndex(index: number) {
    this.nativeElement.selectedIndex = index;
    this.dispatchEventOfType('change');
  }

  get selectedIndex(): number {
    return this.nativeElement.selectedIndex;
  }

  get selectedValue(): string {
    if (this.selectedIndex < 0) {
      return null;
    }
    return this.nativeElement.options[this.selectedIndex].value;
  }

  get selectedText(): string {
    if (this.selectedIndex < 0) {
      return null;
    }
    return this.nativeElement.options[this.selectedIndex].innerText;
  }
}
