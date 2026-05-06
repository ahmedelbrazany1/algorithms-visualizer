import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "@/App";

const renderAtRoute = (route: string) => {
  window.history.pushState({}, "Test page", route);
  return render(<App />);
};

describe("Sorting algorithm pages", () => {
  it("renders and runs Bubble Sort, then resets", async () => {
    const user = userEvent.setup();
    renderAtRoute("/sorting/bubble");

    expect(await screen.findByRole("heading", { name: /Bubble Sort/i })).toBeInTheDocument();

    const arrayInput = screen.getByLabelText(/Array \(space or comma separated\)/i);
    await user.clear(arrayInput);
    await user.type(arrayInput, "9 7 5 3 1");
    await user.click(screen.getByRole("button", { name: /^Start$/i }));

    expect(await screen.findByText(/Bubble Sort: compare adjacent pairs|Compare \d+ and \d+/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /^Reset$/i }));
    expect(screen.getByText(/Press Start to run the algorithm/i)).toBeInTheDocument();
  });

  it("renders Selection page from routing", async () => {
    renderAtRoute("/sorting/selection");
    expect(await screen.findByRole("heading", { name: /Selection Sort/i })).toBeInTheDocument();
  });

  it("renders Insertion page from routing", async () => {
    renderAtRoute("/sorting/insertion");
    expect(await screen.findByRole("heading", { name: /Insertion Sort/i })).toBeInTheDocument();
  });

  it("opens Code Mode on sorting page", async () => {
    const user = userEvent.setup();
    renderAtRoute("/sorting/quick");

    expect(await screen.findByRole("heading", { name: /Quick Sort/i })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Code Mode/i }));

    expect(await screen.findByRole("heading", { name: /Code Mode/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Execution steps/i })).toBeInTheDocument();
  });
});
