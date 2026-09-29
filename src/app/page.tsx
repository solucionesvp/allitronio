import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";

// Home rediseñado 29-sep-2026. Los componentes anteriores (Hero,
// ConnectionIntro, WorkMarquee, Solutions, HubTeaser) quedan en
// src/components/sections/ sin usarse, por si se retoma algo.

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return <HomePage />;
}
