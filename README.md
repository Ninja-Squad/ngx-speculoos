[![Build Status](https://travis-ci.org/Ninja-Squad/ngx-speculoos.svg?branch=master)](https://travis-ci.org/Ninja-Squad/ngx-speculoos)

# ngx-speculoos

ngx-speculoos helps you write simpler, cleaner unit tests for your Angular components, based on the
*page object* pattern. It also provides utilities to make writing Angular unit tests.

The library simply wraps the standard Angular ComponentFixture, and you should thus be 
able to understand and start using ngx-speculoos in just a few minutes if you already know
how to write Angular unit tests.

## Why should you care?

If you've ever written tests like the following:

```typescript
it('should display French cities when selecting the country France', () => {
  const countrySelect = fixture.nativeElement.querySelector('#country'); // countrySelect is of type any
  countrySelect.selectedIndex = 12; // what is at index 12?
  countrySelect.dispatchEvent(new Event('change')); // why do I need to do that?
  fixture.detectChanges();
  
  const city = fixture.nativeElement.querySelector('#city'); // city is of type any
  expect(city).toBeTruthy();
  expect(city.options.length).toBe(3);
  expect(city.options[0].value).toBe('');
  expect(city.options[0].label).toBe('');
  expect(city.options[1].value).toBe('PARIS');
  expect(city.options[1].label).toBe('Paris');
  expect(city.options[2].value).toBe('LYON');
  expect(city.options[2].label).toBe('Lyon');
});

it('should hide cities when selecting the empty country option', () => {
  const countrySelect = fixture.nativeElement.querySelector('#country'); // I did that previously. What about DRY?
  countrySelect.selectedIndex = 0;
  countrySelect.dispatchEvent(new Event('change')); // why do I need to do that?
  fixture.detectChanges(); // why do I need to do that?
  
  expect(fixture.nativeElement.querySelector('#city')).toBeFalsy(); // I did that previously. What about DRY?
});
```

ngx-speculoos allows writing the above tests in a simpler, cleaner way. 

By using the page object pattern (which is optional, but recommended), you avoid repetitions. 

By using wrappers around elements, dispatching events and triggering change detection is automatic.

By using wrappers around elements, you get useful additional methods to make tests easier to write and read.

In any case you need them, you always have access to the fixture, the native elements, the debug elements, etc.

```typescript
class MyComponentTester extends ComponentTester<MyComponent> {
  constructor() {
    super(MyComponent);
  }
  
  get country() {
    return this.select('#country'); // returns a TestSelect object, not any. Similar methods exist for inputs, buttons, etc.
  }
  
  get city() {
    return this.select('#city'); // returns a TestSelect object, not any
  }
}

[...]

it('should display French cities when selecting the country France', () => {
  tester.country.selectLabel('France'); // no dispatchEvent, no detectChanges needed
  
  expect(tester.city.optionValues).toEqual(['', 'PARIS', 'LYON']);
  expect(tester.city.optionLabels).toEqual(['', 'Paris', 'Lyon']);
});

it('should hide cities when selecting empty country option', () => {
  tester.country.selectIndex(0); // no repetition of the selector, no dispatchEvent, no detectChanges needed
  
  expect(tester.city).toBeFalsy(); // no repetition of the selector
});
```

## Installation

Using npm: `npm install --save-dev ngx-speculoos`

Using yarn: `yarn add --dev ngx-speculoos`

## Getting started

 - import ComponentTester, and other needed classes from ngx-speculoos
 - Create a `MyComponentTester` class (in your `my-component.spec.ts` file, typically) extending 
   `ComponentTester<MyComponent>`, as shown above.
 - Expose getters (or methods, if you prefer) returning the elements used in your tests, using
   one of the ComponentTester methods (`element`, `elements`, `input`, `select`, `textarea`, `button`).
   See the API documentation for details
 - Write your tests, as shown above, benefitting from the additional methods on the TestXxx classes.
 - If needed, you can always get the fixture, componentInstance, debugElement, nativeElement, etc.
   from the ComponentTester, and the nativeElement from each TestXxx wrapper.
   
## Issues, questions

Please, provide feedback by filing issues, or by submitting pull requests.
