import { redirect } from "next/navigation";
import type { ReactElement } from "react";

export default function SignInPage(): ReactElement {
  redirect("/admin/login");
}
