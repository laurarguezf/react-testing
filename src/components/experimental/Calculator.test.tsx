import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Calculator } from './Calculator'; 

describe('<Calculator />', () => {
    const useCasesTest = [
        { a: 1, b: 2, operation: "add", expected: 3 },
        { a: 3, b: 2, operation: "multiply", expected: 6 },
        { a: 3, b: 2, operation: "subtract", expected: 1 },
        { a: 4, b: 2, operation: "divide", expected: 2 },
        { a: 3, b: 0, operation: "divide", expected: "Error" }
    ];

    test.each(useCasesTest)('Debería retornar $expected cuando $a y $b son $operation', ({a, b, operation, expected}) => {
        render(<Calculator a={a} b={b} operation={operation} />)
        const result = screen.getByText(`Result: ${expected}`)
        expect(result).toBeInTheDocument();
    })
})