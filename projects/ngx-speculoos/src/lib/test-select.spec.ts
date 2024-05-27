import { Component } from '@angular/core';
import { ComponentTester } from './component-tester';
import { TestBed } from '@angular/core/testing';
import { TestSelect } from './test-select';

@Component({
  template: `
    <select id="s1" (change)="onChange()">
      <option selected></option>
      <option value="a">A</option>
      <option value="b" label="B"></option>
    </select>
    <select id="s2" disabled></select>
  `,
  standalone: true
})
class TestComponent {
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
}

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
    spyOn(tester, 'detectChanges').and.callThrough();

    tester.selectBox.selectIndex(1);
    expect(tester.selectBox.selectedIndex).toBe(1);
    expect(tester.componentInstance.onChange).toHaveBeenCalled();
    expect(tester.detectChanges).toHaveBeenCalled();
  });

  it('should throw if index is out of bounds', () => {
    expect(() => tester.selectBox.selectIndex(-2)).toThrowError('The index -2 is out of bounds');
    expect(() => tester.selectBox.selectIndex(3)).toThrowError('The index 3 is out of bounds');
  });

  it('should select by value', () => {
    spyOn(tester.componentInstance, 'onChange');
    spyOn(tester, 'detectChanges').and.callThrough();

    tester.selectBox.selectValue('a');
    expect(tester.selectBox.selectedIndex).toBe(1);
    expect(tester.componentInstance.onChange).toHaveBeenCalled();
    expect(tester.detectChanges).toHaveBeenCalled();
  });

  it('should throw if value does not exist', () => {
    expect(() => tester.selectBox.selectValue('oops')).toThrowError('The value oops is not part of the option values (, a, b)');
  });

  it('should select by label', () => {
    spyOn(tester.componentInstance, 'onChange');
    spyOn(tester, 'detectChanges').and.callThrough();

    tester.selectBox.selectLabel('A');
    expect(tester.selectBox.selectedIndex).toBe(1);
    expect(tester.componentInstance.onChange).toHaveBeenCalled();
    expect(tester.detectChanges).toHaveBeenCalled();
  });

  it('should throw if label does not exist', () => {
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
