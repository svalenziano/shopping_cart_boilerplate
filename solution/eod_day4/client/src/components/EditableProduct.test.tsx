import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import EditableProduct from "./EditableProduct";
import { Product } from "../types";

const mockProduct: Product = {
  _id: "123",
  title: "Kindle",
  price: 50,
  quantity: 10,
};

describe("EditableProduct", () => {
  it("displays product details initially", () => {
    render(
      <EditableProduct
        product={mockProduct}
        onUpdateProduct={vi.fn()}
        onDeleteProduct={vi.fn()}
        onAddToCart={vi.fn()}
      />
    );

    expect(screen.getByText(/kindle/i)).toBeInTheDocument();
    expect(screen.getByText(/50/)).toBeInTheDocument();
    expect(screen.getByText(/10/)).toBeInTheDocument();
  });

  it("toggles the edit form when edit/cancel buttons are clicked", async () => {
    render(
      <EditableProduct
        product={mockProduct}
        onUpdateProduct={vi.fn()}
        onDeleteProduct={vi.fn()}
        onAddToCart={vi.fn()}
      />
    );
    const editHeading = screen.queryByRole("heading", {
      name: /edit product/i,
    });
    expect(editHeading).not.toBeInTheDocument();
    const editButton = screen.getByRole("button", { name: /edit/i });
    await userEvent.click(editButton);

    expect(
      screen.getByRole("heading", { name: /edit product/i })
    ).toBeInTheDocument();

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    await userEvent.click(cancelButton);
    expect(
      screen.queryByRole("heading", { name: /edit product/i })
    ).not.toBeInTheDocument();
  });
});
