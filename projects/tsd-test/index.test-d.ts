/* eslint-disable @typescript-eslint/ban-ts-comment */
import { expectType, ComponentTester, TestButton, TestElement, TestHtmlElement, TestInput, TestSelect, TestTextArea } from './';

class TestDirective {}

// @ts-ignore
const componentTester: ComponentTester<unknown> = null;
// @ts-ignore
const testElement: TestElement = null;
[componentTester, testElement].forEach(test => {
  // element
  expectType<TestHtmlElement<HTMLDivElement> | null>(test.element('div'));
  expectType<TestElement<SVGLineElement> | null>(test.element('line'));
  // @ts-expect-error SVGLineElement is not HTMLDivElement
  expectType<TestElement<HTMLDivElement> | null>(test.element('line'));
  expectType<TestElement | null>(test.element('.any-selector'));
  expectType<TestHtmlElement<HTMLDivElement> | null>(test.element<HTMLDivElement>('.any-selector'));
  expectType<TestElement<SVGLineElement> | null>(test.element<SVGLineElement>('.any-selector'));
  expectType<TestInput | null>(test.element<HTMLInputElement>('.any-selector'));
  expectType<TestTextArea | null>(test.element<HTMLTextAreaElement>('.any-selector'));
  expectType<TestButton | null>(test.element<HTMLButtonElement>('.any-selector'));
  expectType<TestSelect | null>(test.element<HTMLSelectElement>('.any-selector'));

  // elements
  expectType<Array<TestHtmlElement<HTMLDivElement>>>(test.elements('div'));
  expectType<Array<TestElement<SVGLineElement>>>(test.elements('line'));
  expectType<Array<TestElement>>(test.elements('.any-selector'));
  expectType<Array<TestHtmlElement<HTMLDivElement>>>(test.elements<HTMLDivElement>('.any-selector'));
  expectType<Array<TestElement<SVGLineElement>>>(test.elements<SVGLineElement>('.any-selector'));
  expectType<Array<TestInput>>(test.elements<HTMLInputElement>('.any-selector'));
  expectType<Array<TestTextArea>>(test.elements<HTMLTextAreaElement>('.any-selector'));
  expectType<Array<TestButton>>(test.elements<HTMLButtonElement>('.any-selector'));
  expectType<Array<TestSelect>>(test.elements<HTMLSelectElement>('.any-selector'));

  // element by type
  expectType<TestElement | null>(test.element(TestDirective));
  expectType<TestHtmlElement<HTMLDivElement> | null>(test.element<HTMLDivElement>(TestDirective));
  expectType<TestElement<SVGLineElement> | null>(test.element<SVGLineElement>(TestDirective));
  expectType<TestInput | null>(test.element<HTMLInputElement>(TestDirective));
  expectType<TestTextArea | null>(test.element<HTMLTextAreaElement>(TestDirective));
  expectType<TestButton | null>(test.element<HTMLButtonElement>(TestDirective));
  expectType<TestSelect | null>(test.element<HTMLSelectElement>(TestDirective));

  // elements by type
  expectType<Array<TestElement>>(test.elements(TestDirective));
  expectType<Array<TestHtmlElement<HTMLDivElement>>>(test.elements<HTMLDivElement>(TestDirective));
  expectType<Array<TestElement<SVGLineElement>>>(test.elements<SVGLineElement>(TestDirective));
  expectType<Array<TestInput>>(test.elements<HTMLInputElement>(TestDirective));
  expectType<Array<TestTextArea>>(test.elements<HTMLTextAreaElement>(TestDirective));
  expectType<Array<TestButton>>(test.elements<HTMLButtonElement>(TestDirective));
  expectType<Array<TestSelect>>(test.elements<HTMLSelectElement>(TestDirective));
});
