"use client";

import { TextField } from "@/components/react-aria/TextField";
import { useActionState, useEffect, useRef } from "react";
import { submitSuperForm } from "./action";
import { Form } from "@/components/react-aria/Form";
import { Button } from "@/components/react-aria/Button";
import styles from "./super-form.module.scss";

export function SuperForm({ isInModal }: { isInModal: boolean }) {
  const [{ errors, success }, formAction, pending] = useActionState(
    submitSuperForm,
    {
      errors: {},
      success: false,
    },
  );
  const hasErrors = Object.keys(errors).length > 0;

  const errorSummaryRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (Object.keys(errors).length > 0) errorSummaryRef.current?.focus();
  }, [errors]);

  const successRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (success) successRef.current?.focus();
  }, [success]);

  return (
    <>
      {!success && (
        <Form action={formAction} validationErrors={errors}>
          {hasErrors && (
            <div>
              <h3 ref={errorSummaryRef} tabIndex={-1}>
                Unable to submit
              </h3>
              <p>
                Please fix the validation errors below, and re-submit the form.
              </p>
            </div>
          )}
          <TextField
            name="full-name"
            label="Your full name"
            isRequired
            isDisabled={pending}
          />
          <TextField
            type="email"
            name="email"
            label="Your email"
            isRequired
            isDisabled={pending}
            autoComplete="email"
          />

          <div className={styles.actions}>
            {isInModal && (
              <Button slot="close" variant="secondary">
                Close
              </Button>
            )}
            <Button type="submit" isDisabled={pending}>
              Submit
            </Button>
          </div>
        </Form>
      )}

      {success && (
        <p ref={successRef} tabIndex={-1}>
          Form submitted!
        </p>
      )}
    </>
  );
}
