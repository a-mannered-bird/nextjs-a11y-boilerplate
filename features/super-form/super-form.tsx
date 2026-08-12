"use client";

import { TextField } from "@/components/TextField";
import { useActionState, useEffect, useRef } from "react";
import { submitSuperForm } from "./action";
import { Form } from "@/components/Form";
import { Button } from "@/components/Button";
import { Heading, Text } from "@/components/Content";

export default function ({ isInModal }: { isInModal: boolean }) {
  const [{ errors, success }, formAction, pending] = useActionState(
    submitSuperForm,
    {
      errors: {},
      success: false,
    },
  );
  const hasErrors = Object.keys(errors).length > 0;

  const errorSummaryRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (Object.keys(errors).length > 0) errorSummaryRef.current?.focus();
  }, [errors]);

  const successRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (success) successRef.current?.focus();
  }, [success]);

  return (
    <>
      {!success && (
        <Form action={formAction} validationErrors={errors}>
          {hasErrors && (
            <div ref={errorSummaryRef} role="alert" tabIndex={-1}>
              <Heading>Unable to submit</Heading>
              <Text elementType="p">
                Please fix the validation errors below, and re-submit the form.
              </Text>
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

          <div className="w-full flex justify-between">
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
        <Text ref={successRef} role="status" tabIndex={-1}>
          Form submitted!
        </Text>
      )}
    </>
  );
}
