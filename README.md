[![CircleCI](https://circleci.com/gh/Ninja-Squad/ngx-speculoos.svg?style=svg)](https://circleci.com/gh/Ninja-Squad/ngx-speculoos)
[![Codecov](https://codecov.io/gh/Ninja-Squad/ngx-speculoos/branch/master/graph/badge.svg)](https://codecov.io/gh/Ninja-Squad/ngx-speculoos)

# ngx-speculoos

ngx-speculoos helps you write simpler, cleaner unit tests for your Angular components, based on the
*page object* pattern. It also provides utilities to make writing Angular unit tests easier.

The library simply wraps the standard Angular ComponentFixture, and you should thus be 
able to understand and start using ngx-speculoos in just a few minutes if you already know
how to write Angular unit tests.

## Table of Contents

- [Quick presentation](#quick-presentation)
  - [Why should you care?](#why-should-you-care)
  - [Installation](#installation)
  - [Getting started](#getting-started)
- [Features in details](#features-in-details)
  - [ComponentTester](#componenttester)
  - [Queries](#queries)
    - [Queries for elements](#queries-for-elements)
    - [CSS and Type selectors](#css-and-type-selectors)
    - [Queries for sub components](#queries-for-sub-components)
    - [Queries for injection tokens](#queries-for-injection-tokens)
    - [Queries for custom TestElement](#queries-for-custom-testelement)
    - [Subqueries](#subqueries)
  - [Dispatching events](#dispatching-events)
  - [Custom Jasmine matchers](#custom-jasmine-matchers)
  - [Routing helper](#routing-helper)
  - [Mocking helper](#mocking-helper)
  - [Testing with a host component](#testing-with-a-host-component)
- [Gotchas](#gotchas)
  - [When do I need to call detectChanges()](#when-do-i-need-to-call-detectchanges)
  - [Can I use the TestElement methods to act on the component element itself, rather than a sub-element?](#can-i-use-the-testelement-methods-to-act-on-the-component-element-itself-rather-than-a-sub-element)
- [Issues, questions](#issues-questions)
- [Complete example](#complete-example)

## Quick presentation

### Why should you care?

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

ngx-speculoos allows writing the above tests in a simpler, cleaner way:

 - by using the page object pattern (which is optional, but recommended), you avoid repetitions. 
 - by using wrappers around elements, dispatching events and triggering change detection is automatic.
 - by using wrappers around elements, you get useful additional methods to make tests easier to write and read.
 - by using custom matchers, you get even simpler expectations and more readable error messages
 - in any case you need them, you always have access to the fixture, the native elements, the debug elements, etc.
 
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

### Installation

Using the CLI: `ng add ngx-speculoos`

Using npm: `npm install --save-dev ngx-speculoos`

Using yarn: `yarn add --dev ngx-speculoos`

### Getting started

 - import ComponentTester, and other needed classes from ngx-speculoos
 - Create a `MyComponentTester` class (in your `my-component.spec.ts` file, typically) extending 
   `ComponentTester<MyComponent>`, as shown above.
 - Expose getters (or methods, if you prefer) returning the elements used in your tests, using
   one of the ComponentTester methods (`element`, `elements`, `input`, `select`, `textarea`, `button`, etc.).
   See the [API documentation](https://ngx-speculoos.ninja-squad.com/documentation/classes/ComponentTester.html) for details
 - Write your tests, as shown above, benefiting from the additional methods on the TestXxx classes.
 - If needed, you can always get the fixture, componentInstance, debugElement, nativeElement, etc.
   from the ComponentTester, and the nativeElement from each TestXxx wrapper.
 - If you like our custom matchers, add them in a `beforeEach` block as shown above, and enjoy.
   You can also add them for all tests at once by adding the beforeEach block to the CLI-generated `test.ts` file.

## Features in details

### ComponentTester

This is the entry point for most of the functionalities of ngx-speculoos. It wraps a `ComponentFixture`.
You can simply create one in your tests using

```typescript
const tester = new ComponentTester(MyComponent);
```

and then use it to query for sub elements, components, directives, etc. But we recommend adopting the 
page object pattern, in order to make your test easier to write and read, and to avoid repeating the
same selectors over and over again. 

You do that by writing a class that extends `ComponentTester`, and provides getters (or functions)
to query for elements, components, etc. 

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
```

and then in your tests, or in your `beforeEach`, once you've configured the testing module, you create
an instance of your component tester.

```typescript
describe('My component', () => {
  let tester: MyComponentTester;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyComponent],
      ...
    });
    
    tester = new MyComponentTester();
    tester.detectChanges();
  });
  
  it('should ...', () => {
    
  });
```

### Queries

#### Queries for elements

Most of the queries that ngx-speculoos supports are used to query for DOM elements. The queries, however, 
don't actually returns native DOM elements, but wrappers around them, which are instances of `TestElement`.

`TestElement` has more specialized subclasses: `TestHtmlElement`, `TestInput`, `TestSelect`, `TestTextarea`, `TestButton`.
Those subclasses offer helpful methods to get information or dispatch events to HTML elements, inputs, selects, etc.
Our custom matchers act on those `TestElement` objects. 

You can [create your own subclasses of TestElement](#queries-for-custom-testelement) and query for them, too.

A TestElement is a wrapper around an Angular `DebugElement`. So it can access the `DebugElement` and the 
native DOM element that it wraps. It also has an instance of the `ComponentTester` which created it,
which itself wraps the Angular `ComponentFixture` and thus allows detecting changes automatically after
an element has been dispatched, for example.

#### CSS and Type selectors

The first kind of query uses CSS selectors. This is simply a wrapper around Angular's `DebugElement.query(By.css())`.
The second kind of query uses directive types. This is simply a wrapper around Angular's `DebugElement.query(By.directive())`.

Whatever the kind of selector you choose, the methods are the same though:

- `element(selector)` to get the first element matching the selector
- `elements(selector)` to get an array of elements matching the selector

Both of those methods will automatically return a `TestInput`, or a `TestSelect`, or any other `TestElement`
subclass that ngx-speculoos provides based on the actual type of element being matched. But if you know
in advance what the result of the query is, you can use more-specific methods, or their generic parameter.
Passing an HTML element name as selector also automatically returns the right type

- `input(selector)` returns a `TestInput`
- `textarea(selector)` returns a `TestTextarea`
- `select(selector)` returns a `TestSelect`
- `button(selector)` returns a `TestButton`
- `element<HtmlInputElement>(selector)` returns a `TestInput`
- `element<HtmlDivElement>(selector)` returns a `TestHtmlElement<HtmlDivElement>`
- `elements<HtmlButtonElement>(selector)` returns an `Array<TestButton>`
- `element('input')` returns a `TestInput`

#### Queries for sub components

It's often useful to get the component instance of a sub component, for example to inspect its state,
or to make one of its outputs emit something. You can do that using the `component` and `components`
methods:

```typescript
get productIcon() {
  return this.component(ProductIconComponent); // returns a ProductIconComponent 
}

get reviewers() {
  return this.components(ReviewerComponent); // returns an Array<ReviewerComponent> 
}
```

#### Queries for injection tokens

Querying using `element(DatepickerDirective)` will return you a `TestElement` on which the 
`DatepickerDirective` has been applied.

If you need to get the `Datepicker` directive instance itself, then use the `token()` method
(or `tokens()` to get several of them) 
which takes a selector (CSS or type) as first argument, and the token as second argument:

```typescript
get datepicker() {
  return this.token('#birth-date', DatepickerDirective); // returns a DatepickerDirective instance
}
```

#### Queries for custom `TestElement`

We provide `TestInput`, `TestSelect`, etc. to easily inspect or interact with inputs and selects in our tests.
But what if you want the same kind of test abstraction for your own reusable components or directives, like
for example your `DatepickerDirective`.

You can create your own `TestElement` subclass for that. This subclass must have a constructor that
takes a `ComponentTester` as first argument, and a `DebugElement` as second argument.

```typescript
class TestDatepicker extends TestHtmlElement<HTMLElement> {
  constructor(tester: ComponentTester<unknown>, debugElement: DebugElement) {
    super(tester, debugElement);
  }

  get inputField() {
    return this.input('input');
  }

  setDate(year: number, month: number, day: number) {
    this.inputField.fillWith(`${year}-${month}-${day}`);
  }

  toggleDropdown() {
    this.button('button').click();
  }
}
```

Once you have created that class, you can use the `custom()` and `customs()` methods, using any selector,
to get instances of your custom `TestElement``

```typescript
get birthDate() {
  return this.custom('#birth-date', TestDatepicker);
}
```

```typescript
it('should not save if birth date is in the future') {
  // ...
  tester.birthDate.setDate(2200, 1, 1);
  tester.save.click();
  expect(userService.create).not.toHaveBenCalled();
}
```

#### Subqueries

A query is made from the root `ComponentTester`. But `TestElement` themselves also support queries.
So you can query for a parent `TestElement`, and then use it to perform subqueries:

```typescript
get cardEditButton() {
  return this.element('.card').button('.edit');
}

get cardReviewerComponent() {
  return this.element('.card').component(ReviewerComponent);
}
```

### Custom Jasmine matchers

We provide custom matchers, that act on `TestElement` and on its more specific subclasses (`TestInput`, `TestSelect`, etc.).

The complete matcher list includes:

- `toHaveClass(className: string)`
- `toHaveValue(value: string)`
- `toHaveText(textContent: string)`
- `toHaveTrimmedText(textContent: string)`
- `toContainText(textContent: string)`
- `toBeChecked()`
- `toHaveSelectedIndex(index: number)`
- `toHaveSelectedValue(value: string)`
- `toHaveSelectedLabel(label: string)`
- `toBeVisible()`

These matchers must be installed in each test using them:

```typescript
beforeEach(() => jasmine.addMatchers(speculoosMatchers));
```

or in all tests, by adding the above line of code in the `test.ts` file.

### Dispatching events

`TestElement` provides two methods that allow dispatching events in a simple way. 

- `dispatchEvent(event: Event)`
- `dispatchEventOfType(type: string)`

Going through these methods automatically calls `detectChanges()` on the `ComponentTester` after the event has been dispatched,
so you don't need to call that yourself.

The TestElement subclasses that we provide have more specific event dispatching methods.
For example

- `TestHtmlElement.click()`
- `TestInput.fillWith()` for text, password, number, etc.
- `TestInput.check()` for radios and checkboxes
- `TestInput.uncheck()` for checkboxes
- `TestTextarea.fillWith()`
- `TestSelect.selectIndex()`
- `TestSelect.selectValue()`
- `TestSelect.selectLabel()`

Creating your own TestElement subclasses is a good way to provide such custom methods to interact
with your own reusable components in tests.

### Routing helper

The library provides a stub for the `ActivatedRoute` class that you typically inject in your routing components.
It mimics the behavior of the actual `ActivatedRoute`, by having a snapshot and observables that emit when this
snapshot changes. And it also allows simulating navigations by imperatively changing the parameters, query parameters, 
etc.

```typescript
import { ActivatedRouteStub } from 'ngx-speculoos';

class RoutingComponentTester extends ComponentTester<RoutingComponent> {
  // ...
}

describe('routing component', () => {
  let route: ActivatedRouteStub;
  let tester: RoutingComponentTester;
  
  beforeEach(() => {
    route = stubRoute({
      params: { categoryId: 'pets' }
    });
    
    TestBed.configureTestingModule({
      declarations: [RoutingComponent],
      providers: [
        { provide: ActivatedRoute, useValue: route }
      ]
    });
    
    tester = new RoutingComponentTester();
    tester.detectChanges();
  });
  
  it('should display all the products of the category', () => {
    // test based on the initial route state
  });

  it('should load other products when the category changes or when the query changes', () => {
    route.setParam('category', 'toys');
    tester.detectChanges();
    // ...

    route.setQueryParams({ 'max-price': '30', target: 'children' });
    tester.detectChanges();
    // ...
  });
});
```

### Mocking helper

Jasmine is quite verbose when creating mock objects in a typesafe way:

```typescript
const productService = jasmine.createSpyObj<ProductService>('ProductService', ['list', 'get', 'create', 'update']);
```

Since most of what we mock (usually Angular services) are classes, we can actually do a bit of introspection
and create a mock that will automatically mock all the methods declared in the class. That's what our 
`createMock()` function does. The above code can thus be reduced to:

```typescript
const productService = createMock(ProductService);
```

### Testing with a host component

ngx-speculoos doesn't provide any specific support for testing with host components, but we do it
a lot, simply by creating a ComponentTester for the host component rather than the component under test:

```typescript
@Component({
  template: '<app-user [user]="user" (smile)="smiled = true"></app-user>'
})
class HostComponent {
  user: User = {
    id: 'u1',
    name: 'John'
  };
  
  smiled = false;
}

class HostComponentTester extends ComponentTester<HostComponent> {
  constructor() {
    super(HostComponent);
  }
  
  get userComponent() {
    return this.component(UserComponent);
  }
  
  // ...
}
```

Once you have that, you can access the host component using `componentInstance()`,
the component under test using `userComponent()`, and any element of the component under test
using the usual queries.

## Gotchas

### When do I need to call `detectChanges()`?

Any event dispatched through a `TestElement` automatically calls `detectChanges()` for you.
But you still need to call `detectChanges()` by yourself in the other cases:

- to actually initialize your component. Sometimes, you want to configure some mocks before the `ngOnInit()`
  method of your component is called. That's why creating a `ComponentTester` does not automatically call
  `detectChanges()`. You need to do it yourself. The first call will cause the component lifecycle to start,
  just as when using a `ComponentFixture` directly.
- to force change detection once you've changed the state of your component without dispatching an event:
  by changing the state, or emitting an event through a subject, or triggering a navigation 
  from the `ActivatedRouteStub`

### Can I use the `TestElement` methods to act on the component element itself, rather than a sub-element?

Yes. The `ComponentTester` has a `testElement` property, which is the `TestHtmlElement` wrapping the component's element.

## Issues, questions

Please, provide feedback by filing issues, or by submitting pull requests, to the [Github Project](https://github.com/Ninja-Squad/ngx-speculoos).

## Complete example

You can look at a minimal complete example in the [demo](https://github.com/Ninja-Squad/ngx-speculoos/tree/master/projects/demo/src/app) project.
