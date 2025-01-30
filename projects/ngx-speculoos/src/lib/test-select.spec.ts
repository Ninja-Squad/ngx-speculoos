import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentTester } from './component-tester';
import { TestBed } from '@angular/core/testing';
import { TestSelect } from './test-select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { provideAutomaticChangeDetection } from './providers';

@Component({
  template: `
    <select id="s1" [formControl]="ctrl" (change)="onChange()">
      <option value=""></option>
      <option value="a">A</option>
      <option value="b" label="B"></option>
    </select>
    <select id="s2" [formControl]="disabledCtrl"></select>
    <span id="value">{{ ctrl.value }}</span>
  `,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
class TestComponent {
  readonly ctrl = new FormControl('');
  readonly disabledCtrl = new FormControl('');

  constructor() {
    this.disabledCtrl.disable();
  }

  onChange() {}
}

class TestComponentTester extends ComponentTester<TestComponent> {
  constructor() {
    super(TestComponent);
  }

  get selectBox() {
    return this.select('#s1');
  }

  get disabledSelectBox() {
    return this.select('#s2');
  }

  get value() {
    return this.element('#value');
  }
}

/* eslint-disable @typescript-eslint/no-floating-promises */
describe('TestSelect', () => {
  let tester: TestComponentTester;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    tester = new TestComponentTester();
    tester.detectChanges();
  });

  it('should construct', () => {
    expect(tester.selectBox instanceof TestSelect).toBe(true);
  });

  it('should expose the selectedIndex', () => {
    expect(tester.selectBox.selectedIndex).toBe(0);
  });

  it('should select by index', () => {
    spyOn(tester.componentInstance, 'onChange');
    spyOn(tester, 'change').and.callThrough();

    tester.selectBox.selectIndex(1);
    expect(tester.selectBox.selectedIndex).toBe(1);
    expect(tester.value.textContent).toBe('a');
    expect(tester.componentInstance.onChange).toHaveBeenCalled();
    expect(tester.change).toHaveBeenCalled();
  });

  it('should throw if index is out of bounds', () => {
    expect(() => tester.selectBox.selectIndex(-2)).toThrowError('The index -2 is out of bounds');
    expect(() => tester.selectBox.selectIndex(3)).toThrowError('The index 3 is out of bounds');
  });

  it('should select by value', () => {
    spyOn(tester.componentInstance, 'onChange');
    spyOn(tester, 'change').and.callThrough();

    tester.selectBox.selectValue('a');
    expect(tester.selectBox.selectedIndex).toBe(1);
    expect(tester.value.textContent).toBe('a');
    expect(tester.componentInstance.onChange).toHaveBeenCalled();
    expect(tester.change).toHaveBeenCalled();
  });

  it('should throw if value does not exist', async () => {
    expect(() => tester.selectBox.selectValue('oops')).toThrowError('The value oops is not part of the option values (, a, b)');
  });

  it('should select by label', () => {
    spyOn(tester.componentInstance, 'onChange');
    spyOn(tester, 'change').and.callThrough();

    tester.selectBox.selectLabel('A');
    expect(tester.selectBox.selectedIndex).toBe(1);
    expect(tester.value.textContent).toBe('a');
    expect(tester.componentInstance.onChange).toHaveBeenCalled();
    expect(tester.change).toHaveBeenCalled();
  });

  it('should throw if label does not exist', async () => {
    expect(() => tester.selectBox.selectLabel('oops')).toThrowError('The label oops is not part of the option labels (, A, B)');
  });

  it('should expose the selected value', () => {
    expect(tester.selectBox.selectedValue).toBe('');

    tester.selectBox.selectIndex(1);
    expect(tester.selectBox.selectedValue).toBe('a');

    tester.selectBox.selectIndex(-1);
    expect(tester.selectBox.selectedValue).toBeNull();
  });

  it('should expose the selected label', () => {
    expect(tester.selectBox.selectedLabel).toBe('');

    tester.selectBox.selectIndex(1);
    expect(tester.selectBox.selectedLabel).toBe('A');

    tester.selectBox.selectIndex(2);
    expect(tester.selectBox.selectedLabel).toBe('B');

    tester.selectBox.selectIndex(-1);
    expect(tester.selectBox.selectedLabel).toBeNull();
  });

  it('should expose the option values', () => {
    expect(tester.selectBox.optionValues).toEqual(['', 'a', 'b']);
  });

  it('should expose the option labels', () => {
    expect(tester.selectBox.optionLabels).toEqual(['', 'A', 'B']);
  });

  it('should expose the size', () => {
    expect(tester.selectBox.size).toBe(3);
  });

  it('should expose the disabled property', () => {
    expect(tester.selectBox.disabled).toBe(false);
    expect(tester.disabledSelectBox.disabled).toBe(true);
  });
});
/* eslint-enable @typescript-eslint/no-floating-promises */

describe('TestSelect in automatic mode', () => {
  let tester: TestComponentTester;

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [provideAutomaticChangeDetection()] });
    tester = new TestComponentTester();
    await tester.change();
  });

  it('should select by index', async () => {
    spyOn(tester.componentInstance, 'onChange');
    spyOn(tester, 'change').and.callThrough();

    await tester.selectBox.selectIndex(1);
    expect(tester.selectBox.selectedIndex).toBe(1);
    expect(tester.value.textContent).toBe('a');
    expect(tester.componentInstance.onChange).toHaveBeenCalled();
    expect(tester.change).toHaveBeenCalled();
  });

  it('should throw if index is out of bounds', async () => {
    expect(() => tester.selectBox.selectIndex(-2)).toThrowError('The index -2 is out of bounds');
    expect(() => tester.selectBox.selectIndex(3)).toThrowError('The index 3 is out of bounds');
  });

  it('should select by value', async () => {
    spyOn(tester.componentInstance, 'onChange');
    spyOn(tester, 'change').and.callThrough();

    await tester.selectBox.selectValue('a');
    expect(tester.selectBox.selectedIndex).toBe(1);
    expect(tester.value.textContent).toBe('a');
    expect(tester.componentInstance.onChange).toHaveBeenCalled();
    expect(tester.change).toHaveBeenCalled();
  });

  it('should throw if value does not exist', async () => {
    expect(() => tester.selectBox.selectValue('oops')).toThrowError('The value oops is not part of the option values (, a, b)');
  });

  it('should select by label', async () => {
    spyOn(tester.componentInstance, 'onChange');
    spyOn(tester, 'change').and.callThrough();

    await tester.selectBox.selectLabel('A');
    expect(tester.selectBox.selectedIndex).toBe(1);
    expect(tester.value.textContent).toBe('a');
    expect(tester.componentInstance.onChange).toHaveBeenCalled();
    expect(tester.change).toHaveBeenCalled();
  });

  it('should throw if label does not exist', async () => {
    expect(() => tester.selectBox.selectLabel('oops')).toThrowError('The label oops is not part of the option labels (, A, B)');
  });

  it('should expose the selected value', async () => {
    expect(tester.selectBox.selectedValue).toBe('');

    await tester.selectBox.selectIndex(1);
    expect(tester.selectBox.selectedValue).toBe('a');

    await tester.selectBox.selectIndex(-1);
    expect(tester.selectBox.selectedValue).toBeNull();
  });

  it('should expose the selected label', async () => {
    expect(tester.selectBox.selectedLabel).toBe('');

    await tester.selectBox.selectIndex(1);
    expect(tester.selectBox.selectedLabel).toBe('A');

    await tester.selectBox.selectIndex(2);
    expect(tester.selectBox.selectedLabel).toBe('B');

    await tester.selectBox.selectIndex(-1);
    expect(tester.selectBox.selectedLabel).toBeNull();
  });
});
