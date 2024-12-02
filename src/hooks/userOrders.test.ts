import { describe, test, expect, Mock } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';
import { getOrders } from '../services/getOrders';
import { useSession } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

vi.mock('../services/getOrders', () => ({
    getOrders: vi.fn()
}))

vi.mock('../context/AuthContext', () => ({
    useSession: vi.fn()
}))

vi.mock('react-router-dom', () => ({
    useNavigate: vi.fn()
}))


describe('useOrders', () => {
    const mockNavigate = vi.fn();
    const getGetOrders = getOrders as Mock;
    const mockUseSession = useSession as Mock;

    test('')
})