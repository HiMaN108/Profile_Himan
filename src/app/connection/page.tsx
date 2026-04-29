import ConnectionClient from "@/components/ConnectionClient";
import PortfolioShell from "@/components/PortfolioShell";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connection | Himanshu Maurya",
  description: "Direct contact, social links, and live telemetry.",
};

export default function ConnectionPage() {
  return (
    <PortfolioShell>
      <ConnectionClient />
    </PortfolioShell>
  );
}
