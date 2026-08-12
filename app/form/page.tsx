import type { Metadata } from "next";

import { Button } from "@/components/react-aria/Button";
import { Heading } from "@/components/react-aria/Content";
import { Dialog, DialogTrigger } from "@/components/react-aria/Dialog";
import {
  Disclosure,
  DisclosureHeader,
  DisclosurePanel,
} from "@/components/react-aria/Disclosure";
import { DisclosureGroup } from "@/components/react-aria/DisclosureGroup";
import { Modal } from "@/components/react-aria/Modal";
import { SuperForm } from "@/features/super-form/super-form";
import { SignatureCounter } from "./SignatureCounter";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "My super form",
};

export default function FormPage() {
  return (
    <main>
      <h1>My super form</h1>
      <h2>Q&A</h2>
      <DisclosureGroup defaultExpandedKeys={["personal"]}>
        <Disclosure id="personal">
          <DisclosureHeader>Personal Information</DisclosureHeader>
          <DisclosurePanel>
            <p>Personal information form here.</p>
          </DisclosurePanel>
        </Disclosure>
        <Disclosure id="billing">
          <DisclosureHeader>Billing Address</DisclosureHeader>
          <DisclosurePanel>
            <p>Billing address form here.</p>
          </DisclosurePanel>
        </Disclosure>
      </DisclosureGroup>
      <DialogTrigger>
        <Button>Sign up</Button>
        <Modal>
          <Dialog>
            {/* Stays a react-aria Heading: the title slot is what Dialog uses to
                label itself via aria-labelledby. Level is explicit so the
                dialog's own outline starts at h2 rather than RAC's default h3. */}
            <Heading level={2} slot="title">
              Subscribe to our newsletter
            </Heading>
            <p className={styles.dialogIntro}>
              Enter your information to subscribe to our newsletter and receive
              updates about new features and announcements.
            </p>
            {/* The dialog owns its dismiss control and hands it to the form,
                which places it in the actions row. headingLevel follows the
                h2 title above. */}
            <SuperForm
              headingLevel={3}
              actions={
                <Button slot="close" variant="secondary">
                  Close
                </Button>
              }
            />
          </Dialog>
        </Modal>
      </DialogTrigger>
      <SignatureCounter />
    </main>
  );
}
