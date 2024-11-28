import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Contador } from './';

describe('<Contador />', () => {
    test('Debería mostrar el valor inicial', () => {
        render(<Contador />);
        const contador = screen.getByText('Contador: 0');
        expect(contador).toBeInTheDocument();
    });

    test('Debería incrementar el contador', async () => {
        render(<Contador />);
        const boton = screen.getByText('Incrementar');
        await act(() => {
            fireEvent.click(boton);
        })
        const contador = screen.getByText('Contador: 1');
        expect(contador).toBeInTheDocument();
    })
})