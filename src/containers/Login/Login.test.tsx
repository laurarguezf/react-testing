import { describe, test, expect, vi, Mock } from "vitest";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { getAuth } from "../../services/getAuth";
import { SessionProvider } from "../../context/AuthContext";
import { Login } from "./Login";

vi.mock("../../services/getAuth", () => ({
  getAuth: vi.fn(),
}));

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate
    }
});

const mockGetAuth = getAuth as Mock;
const mockNavigate = vi.fn();


describe("<Login />", () => {
  const handleLogin = () => {
    return render(
      <SessionProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </SessionProvider>
    );
  };

  test("Debería mostrar un mensaje de error", async () => {
    mockGetAuth.mockRejectedValue(new Error("Invalid credentials"));
    handleLogin();

    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const buttonLogin = screen.getByRole("button", { name: "Login" });
    await act(() => {
      fireEvent.change(usernameInput, { target: { value: "wrongUser" } });
      fireEvent.change(passwordInput, { target: { value: "wrongPassword" } });
      fireEvent.click(buttonLogin);
    });

    const errorMessage = screen.getByText("Invalid credentials");
    expect(errorMessage).toBeInTheDocument();
  });

  test("Debería redirigir a /orders", async () => {
    mockGetAuth.mockResolvedValue({ success: true });
    handleLogin();

    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const buttonLogin = screen.getByRole("button", { name: "Login" });
    await act(() => {
        fireEvent.change(usernameInput, { target: { value: "validUser" } });
        fireEvent.change(passwordInput, { target: { value: "validPassword" } });
        fireEvent.click(buttonLogin);
    });

    await waitFor(() => {
        expect(mockGetAuth).toHaveBeenCalledWith('validUser', 'validPassword' );
        expect(mockNavigate).toHaveBeenCalledWith('/orders');
    });    
  });
});