import Link from "next/link";
import { BrandMark } from "@/components/brand/LotusLogo";

export function AppHeader() {
  return (
    <header className="navbar navbar-expand-md d-print-none">
      <div className="container-xl">
        <Link href="/" className="navbar-brand">
          <BrandMark size={36} light={false} />
        </Link>
      </div>
    </header>
  );
}
