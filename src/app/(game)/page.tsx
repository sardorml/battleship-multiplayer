import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Link href="/create">Create room</Link>
      <button>Join room</button>
    </main>
  );
}
