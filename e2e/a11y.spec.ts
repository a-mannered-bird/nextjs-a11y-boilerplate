import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// The rule tags are pinned rather than left to axe's defaults. "Zero violations"
// is only a meaningful promise if the rule set is stated: axe ships new rules in
// minor versions, and it has false positives (its own tables allow the
// aria-value* attributes on both `meter` and `progressbar`, yet it rejects them
// on react-aria's `role="meter progressbar"` fallback list). If a rule ever has
// to be excluded, add it to a `.disableRules([...])` call with a comment saying
// why, so the exception is visible instead of the promise being quietly weakened.
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

test("the form page has no detectable accessibility violations on load", async ({
  page,
}) => {
  await page.goto("/form");

  // Assert something rendered before scanning, so a blank page cannot pass.
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  const { violations } = await new AxeBuilder({ page })
    .withTags(WCAG_TAGS)
    .analyze();

  // Mapped to strings so a failure names the rules instead of dumping axe nodes.
  expect(violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
});
