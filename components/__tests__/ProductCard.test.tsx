import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../ProductCard";
import { Product } from "../../lib/types";

jest.mock("framer-motion", () => ({
  motion: {
    article: ({ children, ...props }: any) => (
      <article {...props}>{children}</article>
    ),
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
  },
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

const mockProduct: Product = {
  id: 1,
  title: "Test Product",
  description: "This is a test product description",
  price: 99.99,
  image: "/test-image.jpg",
  rating: 4,
  inStock: true,
  onSale: true,
  salePercentage: 20,
};

describe("ProductCard", () => {
  it("renders product information correctly", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(
      screen.getByText(/This is a test product description/)
    ).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
  });

  it("displays sale badge when product is on sale", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("-20%")).toBeInTheDocument();
  });

  it("displays out of stock overlay when product is not in stock", () => {
    const outOfStockProduct = { ...mockProduct, inStock: false };
    render(<ProductCard product={outOfStockProduct} />);

    expect(screen.getByText("Out of Stock")).toBeInTheDocument();
    expect(screen.getByText("Currently Unavailable")).toBeInTheDocument();
  });

  it("calls onViewMore when button is clicked", () => {
    const mockOnViewMore = jest.fn();
    render(<ProductCard product={mockProduct} onViewMore={mockOnViewMore} />);

    const button = screen.getByRole("button", {
      name: /View more details about Test Product/i,
    });
    fireEvent.click(button);

    expect(mockOnViewMore).toHaveBeenCalledWith(1);
  });

  it("disables button when product is out of stock", () => {
    const outOfStockProduct = { ...mockProduct, inStock: false };
    render(<ProductCard product={outOfStockProduct} />);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("displays rating stars correctly", () => {
    render(<ProductCard product={mockProduct} />);

    const ratingElement = screen.getByLabelText(/Rating: 4 out of 5 stars/i);
    expect(ratingElement).toBeInTheDocument();

    const stars = screen.getAllByText("★");
    expect(stars).toHaveLength(5);

    expect(screen.getByText("(4)")).toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByRole("article")).toHaveAttribute(
      "aria-label",
      "Product card for Test Product"
    );

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute(
      "aria-label",
      "View more details about Test Product"
    );
  });

  it("applies correct hover classes", () => {
    const { container } = render(<ProductCard product={mockProduct} />);

    const card = container.querySelector("article");
    expect(card).toHaveClass("hover:shadow-2xl");
    expect(card).toHaveClass("transition-all");
  });

  it("shows different button text when out of stock", () => {
    const outOfStockProduct = { ...mockProduct, inStock: false };
    render(<ProductCard product={outOfStockProduct} />);

    expect(screen.getByText("Currently Unavailable")).toBeInTheDocument();
    expect(screen.queryByText("View More")).not.toBeInTheDocument();
  });

  it("displays price correctly", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("$99.99")).toBeInTheDocument();
    expect(screen.getByLabelText(/Price: \$99\.99/)).toBeInTheDocument();
  });

  it("handles missing onViewMore prop gracefully", () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(<ProductCard product={mockProduct} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(consoleSpy).toHaveBeenCalledWith(
      "onViewMore function is not provided!"
    );

    consoleSpy.mockRestore();
  });
});
