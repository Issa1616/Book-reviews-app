import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import Page from "../app/page";

describe("Página principal de Book Reviews", () => {
  it("Renderiza el título de la app", () => {
    render(<Page />);
    expect(screen.getByText("App de Reseñas de Libros")).toBeInTheDocument();
  });

  it("Permite buscar un libro y muestra resultados", async () => {
    render(<Page />);

    // buscamos el input
    const input = screen.getByPlaceholderText("Buscar libro...");
    fireEvent.change(input, { target: { value: "Harry Potter" } });

    // apretamos Enter (simulando la búsqueda)
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    // esperamos que aparezca algo con el texto "Harry Potter"
    const result = await screen.findByText(/Harry Potter/i);
    expect(result).toBeInTheDocument();
  });
});
