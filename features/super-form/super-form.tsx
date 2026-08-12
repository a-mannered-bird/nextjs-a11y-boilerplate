"use client";

import { TextField } from "@/components/react-aria/TextField";
import {
  useActionState,
  useEffect,
  useId,
  useRef,
  type ReactNode,
} from "react";
import { submitSuperForm } from "./action";
import { Form } from "@/components/react-aria/Form";
import { Button } from "@/components/react-aria/Button";
import styles from "./super-form.module.scss";

type SuperFormProps = {
  /**
   * Rendered alongside the submit button, and again beside the success
   * message. A dialog passes its own `slot="close"` button here; a standalone
   * form passes nothing.
   */
  actions?: ReactNode;
  /**
   * Level for the error summary heading, so the form fits the outline of
   * whatever renders it. Defaults to the level below a dialog title.
   */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
};

export function SuperForm({ actions, headingLevel = 3 }: SuperFormProps) {
  const [{ errors, success }, formAction, pending] = useActionState(
    submitSuperForm,
    {
      errors: {},
      success: false,
    },
  );
  const errorEntries = Object.entries(errors);
  const hasErrors = errorEntries.length > 0;

  const errorSummaryRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (Object.keys(errors).length > 0) errorSummaryRef.current?.focus();
  }, [errors]);

  const successRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (success) successRef.current?.focus();
  }, [success]);

  // RAC deletes `id` from the field wrapper and hands it to the input, so these
  // are the ids the summary links resolve to.
  const idPrefix = useId();
  const fieldId = (name: string) => `${idPrefix}-${name}`;

  const SummaryHeading = `h${headingLevel}` as const;

  return (
    <>
      {!success && (
        <Form action={formAction} validationErrors={errors}>
          {hasErrors && (
            // Focus moves here rather than to a live region: an alert plus a
            // focus move gets announced twice.
            <div className={styles.errorSummary}>
              <SummaryHeading ref={errorSummaryRef} tabIndex={-1}>
                Unable to submit
              </SummaryHeading>
              <p>Please fix the following, and re-submit the form.</p>
              {/* Each message links to the field it came from, so a keyboard or
                  screen reader user reaches the input directly instead of
                  hunting for it. Real anchors, so this still works before
                  hydration. */}
              <ul>
                {errorEntries.map(([name, message]) => (
                  <li key={name}>
                    <a href={`#${fieldId(name)}`}>{message}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <TextField
            id={fieldId("full-name")}
            name="full-name"
            label="Your full name"
            isRequired
            isDisabled={pending}
            autoComplete="name"
          />
          <TextField
            id={fieldId("email")}
            type="email"
            name="email"
            label="Your email"
            isRequired
            isDisabled={pending}
            autoComplete="email"
          />

          <div className={styles.actions}>
            {actions}
            <Button type="submit" isDisabled={pending}>
              Submit
            </Button>
          </div>
        </Form>
      )}

      {success && (
        <>
          <p ref={successRef} tabIndex={-1}>
            Form submitted!
          </p>
          {/* The success state replaces the form, so anything the caller put in
              the actions row has to be rendered here too. Without it a dialog
              ends up with no visible way out. */}
          {actions && <div className={styles.actions}>{actions}</div>}
        </>
      )}
    </>
  );
}
