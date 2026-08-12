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

export default function FormPage() {
  return (
    <main>
      <Heading level={1}>My super form</Heading>
      <Heading level={2}>Q&A</Heading>
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
            <Heading slot="title">Subscribe to our newsletter</Heading>
            <p className={styles.dialogIntro}>
              Enter your information to subscribe to our newsletter and receive
              updates about new features and announcements.
            </p>
            <SuperForm isInModal />
          </Dialog>
        </Modal>
      </DialogTrigger>
      <SignatureCounter />
    </main>
  );
}
