import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "@/App";

const renderAtRoute = (route: string) => {
  window.history.pushState({}, "Test page", route);
  return render(<App />);
};

describe("App routing and core UI", () => {
  it("renders home page branding and navigation", async () => {
    renderAtRoute("/");

    expect(await screen.findByRole("heading", { name: /Algorithms Visualizer/i })).toBeInTheDocument();
    expect(screen.getByText(/SET222/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^Home$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^Searching$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^Sorting$/i })).toBeInTheDocument();
  });

  it("navigates to searching and sorting index pages", async () => {
    const user = userEvent.setup();
    renderAtRoute("/");

    await user.click(screen.getByRole("link", { name: /Searching Algorithms/i }));
    expect(await screen.findByRole("heading", { name: /Searching Algorithms/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Linear Search/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Binary Search/i })).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: /^Sorting$/i }));
    expect(await screen.findByRole("heading", { name: /Sorting Algorithms/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Bubble Sort/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Merge Sort/i })).toBeInTheDocument();
  });
});
