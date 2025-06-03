import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "pages/index";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});
