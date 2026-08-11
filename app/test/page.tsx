import { Heading } from "@/components/Content";
import { Link } from "@/components/Link";

export default function Page() {
  return (
    <div>
      <title>Navigation Page</title>
      <Heading level={1}>Navigation</Heading>
      <ul>
        <li>
          <Link href="/test/2">Test 2</Link>
        </li>
      </ul>
    </div>
  );
}
