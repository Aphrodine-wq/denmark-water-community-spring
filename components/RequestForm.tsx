"use client";

import { useState } from "react";
import Link from "next/link";
import { org } from "@/lib/content";
import { CheckIcon, ArrowRightIcon, ShieldIcon } from "@/components/icons";

type Kind = "leak" | "service";

const copy = {
  leak: {
    eyebrow: "Report a Leak",
    title: "Report a leak or water emergency",
    intro: "Tell us what you're seeing and where. For a main break or no-water emergency, please also call us right away.",
    submit: "Submit leak report",
    done: "Leak report received",
  },
  service: {
    eyebrow: "Start / Stop Service",
    title: "Start, stop, or transfer service",
    intro: "Moving in or out of the service area? Send us the details and the office will set up your account.",
    submit: "Submit request",
    done: "Request received",
  },
} as const;

function field() {
  return "w-full rounded-xl border border-amber-200 bg-amber-50/40 px-3.5 py-2.5 text-stone-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-lime-100";
}

export default function RequestForm({ kind }: { kind: Kind }) {
  const c = copy[kind];
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [details, setDetails] = useState("");
  const [type, setType] = useState("Start service");
  const [ref, setRef] = useState<string | null>(null);

  const canSubmit = name.trim() && phone.trim() && address.trim();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setRef("DWA-" + Math.random().toString(36).slice(2, 7).toUpperCase());
  }

  return (
    <div className="min-h-screen bg-amber-50 text-stone-700">
      <header className="border-b border-amber-200 bg-white/70">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
          <Link href="/" className="font-serif text-base font-semibold text-stone-900">{org.name}</Link>
          <Link href="/" className="text-sm text-stone-500 hover:text-green-700">← Back to site</Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-green-700">{c.eyebrow}</p>
        <h1 className="mt-1 font-serif text-3xl font-semibold text-stone-900 md:text-4xl">{c.title}</h1>

        <div className="mt-6 rounded-3xl border border-amber-200 bg-white p-6 shadow-sm md:p-8">
          {ref ? (
            <div className="text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime-100 text-green-700">
                <CheckIcon className="h-9 w-9" />
              </span>
              <h2 className="mt-4 font-serif text-2xl font-semibold text-stone-900">{c.done}</h2>
              <p className="mt-1 text-stone-600">Thanks, {name.split(" ")[0]}. The office will follow up within one business day.</p>
              <p className="mt-4 inline-block rounded-full bg-lime-50 px-4 py-2 text-sm">Reference <strong className="text-stone-900">{ref}</strong></p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href="/" className="rounded-full bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800">Return to site</Link>
                <Link href="/pay" className="rounded-full border-2 border-amber-300 px-6 py-3 font-semibold text-stone-700 transition hover:border-amber-400">Pay My Bill</Link>
              </div>
            </div>
          ) : (
            <form onSubmit={submit}>
              <p className="text-sm text-stone-600">{c.intro}</p>
              <div className="mt-5 grid gap-4">
                <label className="block">
                  <span className="text-sm font-medium text-stone-700">Full name</span>
                  <input className={`mt-1.5 ${field()}`} value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-medium text-stone-700">Phone</span>
                    <input className={`mt-1.5 ${field()}`} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(803) 555-0000" inputMode="tel" />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-stone-700">Service address</span>
                    <input className={`mt-1.5 ${field()}`} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 County Road" />
                  </label>
                </div>

                {kind === "service" && (
                  <label className="block">
                    <span className="text-sm font-medium text-stone-700">Request type</span>
                    <select className={`mt-1.5 ${field()}`} value={type} onChange={(e) => setType(e.target.value)}>
                      <option>Start service</option>
                      <option>Stop service</option>
                      <option>Transfer service</option>
                    </select>
                  </label>
                )}

                <label className="block">
                  <span className="text-sm font-medium text-stone-700">{kind === "leak" ? "What are you seeing?" : "Anything else we should know?"}</span>
                  <textarea className={`mt-1.5 ${field()} min-h-24`} value={details} onChange={(e) => setDetails(e.target.value)} placeholder={kind === "leak" ? "Water pooling near the meter, low pressure, etc." : "Move-in date, account number, etc."} />
                </label>
              </div>

              <button type="submit" disabled={!canSubmit} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-700 px-6 py-3.5 text-base font-bold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto">
                {c.submit} <ArrowRightIcon className="h-5 w-5" />
              </button>
            </form>
          )}
        </div>

        <p className="mt-4 flex items-center justify-center gap-2 text-xs text-stone-400">
          <ShieldIcon className="h-4 w-4" /> Demo only — this request is not sent anywhere.
        </p>
      </main>
    </div>
  );
}
