"use client";

import { PropsWithChildren, useState } from "react";
import { Button } from "./Button";

export default function ({ children }: PropsWithChildren) {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <p>Hello {counter}!</p>
      <Button onPress={() => setCounter(counter + 1)}>More</Button>

      <br />
      <br />
      {children}
    </div>
  );
}
