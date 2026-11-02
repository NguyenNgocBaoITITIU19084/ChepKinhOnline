import Link from "next/link";
import { IconFeather } from "@tabler/icons-react";

export function AppHeader() {
  return (
    <header className="navbar navbar-expand-md d-print-none">
      <div className="container-xl">
        <Link href="/" className="navbar-brand d-flex align-items-center gap-2">
          <IconFeather size={24} stroke={1.5} />
          Chép Kinh Online
        </Link>
      </div>
    </header>
  );
}
