import { Link } from "@tanstack/react-router";

export function NotFound({ childern }: { childern?: any }) {
  return (
    <div>
      <h2>Halaman not found</h2>
      <Link to="/">Balik ke home</Link>
    </div>
  )
}
