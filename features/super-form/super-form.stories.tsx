import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import { SuperForm } from "./super-form";

const meta: Meta<typeof SuperForm> = {
  component: SuperForm,
  parameters: {
    // Opted in per story file. The vendored react-aria stories stay on the
    // global "todo" setting, so their violations are reported without gating our
    // build on third-party code.
    a11y: { test: "error" },
  },
};

export default meta;
type Story = StoryObj<typeof SuperForm>;

export const InModal: Story = {
  args: { isInModal: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Queried by accessible label, so the assertion fails if the labelling breaks.
    const name = canvas.getByLabelText(/your full name/i);
    await userEvent.type(name, "Damien Bernard");
    await expect(name).toHaveValue("Damien Bernard");

    // isInModal is the component's only branch: it decides whether the dialog's
    // own dismiss control is rendered.
    await expect(
      canvas.getByRole("button", { name: /close/i }),
    ).toBeInTheDocument();
  },
};

export const Standalone: Story = {
  args: { isInModal: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.queryByRole("button", { name: /close/i }),
    ).not.toBeInTheDocument();
  },
};
