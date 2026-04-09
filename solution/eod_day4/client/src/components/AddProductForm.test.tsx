import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import AddProductForm from "./AddProductForm";

describe("AddProductForm", () => {
  it("updates input fields", async () => {
    const onToggleForm = vi.fn();
    const onAddProduct = vi.fn();

    render(
      <AddProductForm onToggleForm={onToggleForm} onAddProduct={onAddProduct} />
    );

    const titleInput = screen.getByLabelText(/name/i);
    const priceInput = screen.getByLabelText(/price/i);
    const quantityInput = screen.getByLabelText(/quantity/i);

    await userEvent.type(titleInput, "New Product");
    await userEvent.type(priceInput, "10");
    await userEvent.type(quantityInput, "5");

    expect(titleInput).toHaveValue("New Product");
    expect(priceInput).toHaveValue(10);
    expect(quantityInput).toHaveValue(5);
  });
});
