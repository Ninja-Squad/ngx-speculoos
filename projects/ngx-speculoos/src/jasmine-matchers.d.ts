declare namespace jasmine {
  interface Matchers<T> {

    /**
     * Checks that the receiver is a TestElement wrapping a DOM element and has the given CSS class
     */
    toHaveClass(className: string): boolean;

    /**
     * Checks that the receiver is a TestInput or a TestTextArea and has the given value
     */
    toHaveValue(value: string): boolean;

    /**
     * Checks that the receiver is a TestElement wrapping a DOM element and has the exact given textContent
     */
    toHaveText(textContent: string): boolean;

    /**
     * Checks that the receiver is a TestElement wrapping a DOM element and contains the given textContent
     */
    toContainText(textContent: string): boolean;

    /**
     * Checks that the receiver is a TestInput and is checked
     */
    toBeChecked(): boolean;

    /**
     * Checks that the receiver is a TestSelect wrapping a DOM element and has the given selected index
     */
    toHaveSelectedIndex(index: number): boolean;

    /**
     * Checks that the receiver is a TestSelect wrapping a DOM element with the selected option's value equal to the given value
     */
    toHaveSelectedValue(value: string): boolean;

    /**
     * Checks that the receiver is a TestSelect wrapping a DOM element with the selected option's label equal to the given label
     */
    toHaveSelectedLabel(label: string): boolean;
  }
}
