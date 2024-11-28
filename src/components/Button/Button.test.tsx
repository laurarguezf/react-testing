import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Button } from './Button';

describe('<Button />', () => {
    test('Debería renderizar el botón', () => {
        render(<Button label="click"/>);
        const button = screen.getByText("click");
        expect(button).toBeInTheDocument();
    })

    test('Debería llamar a la función onClick', async () => {
        //Arrange (preparar)
        const handleClick = vi.fn();
        render(<Button label="Click" onClick={handleClick} />);
        const button = screen.getByText("Click");
        //Act (actual)
        await act(() => {
            fireEvent.click(button);
        })        
        //Assert (verificar)
        expect(handleClick).toHaveBeenCalledTimes(1);
    })
})