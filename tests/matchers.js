function desc(element) {
    return element
        ? element.outerHTML
        : '<!--ELEMENT NOT FOUND--!>';
}

export function toHaveInnerText() {
    return {
        compare: (actual, expected) => {
            const pass = actual && actual.innerText === expected;
            const message = pass
                ? `Expected ${desc(actual)} not to contain ${expected}`
                : `Expected ${desc(actual)} to contain ${expected}`;
            return { pass, message };
        },
    };
}
