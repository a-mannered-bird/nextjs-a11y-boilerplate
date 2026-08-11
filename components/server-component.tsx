export default async function () {
  const res = await fetch("http://localhost:3000/api/test", {
    cache: "no-store", // SSR equivalent
    // cache: 'force-cache',      // SSG equivalent
    // next: { revalidate: 60 },  // ISR equivalent
  });
  const data = await res.json();
  return <div>This is the result: {data.message}</div>;
}
