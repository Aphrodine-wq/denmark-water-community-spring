"use client";

import { useState } from "react";
import Link from "next/link";
import { org, payment } from "@/lib/content";
import { CardIcon, ShieldIcon, ArrowRightIcon, PhoneIcon, MapPinIcon, ClockIcon } from "@/components/icons";

// CONCEPT 3 — "Community Spring" payment portal.
// On desktop the BBI EzPay portal is embedded; on phones we open it full-screen
// instead of cramming an external app into a tiny iframe. Fee disclosure + offline
// payment options are always shown. Swap org.ezpayUrl when BBI confirms the link.
export default function CommunitySpringPortal() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-amber-50 text-stone-700">
      <header className="border-b border-amber-200 bg-white/70">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-3.5">
          <Link href="/" className="font-serif text-sm font-semibold text-stone-900">{org.name}</Link>
          <a href={`tel:${org.phone}`} className="flex items-center gap-1.5 text-sm font-semibold text-green-700">
            <PhoneIcon className="h-4 w-4" /> {org.phone}
          </a>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-4xl px-5 py-10">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-green-700">
          <CardIcon className="h-4 w-4" /> Pay My Bill
        </div>
        <h1 className="font-serif text-3xl font-semibold text-stone-900 md:text-4xl">Online payment portal</h1>
        <p className="mt-3 max-w-2xl text-stone-600">
          Pay your water bill securely with <strong className="text-stone-900">BBI EzPay</strong>, our
          billing provider. Have the account number from your most recent bill ready — it&apos;s
          printed at the top of your bill, just above your service address.
        </p>

        {/* Fee disclosure — shown up front so the processor fee is never a surprise. */}
        <p className="mt-5 rounded-2xl border border-amber-300 bg-white px-4 py-3 text-sm text-amber-900">
          <strong>Heads up:</strong> {payment.feeNote}
        </p>

        {/* MOBILE — open EzPay full-screen instead of a cramped iframe. */}
        <div className="mt-6 md:hidden">
          <a
            href={org.ezpayUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-green-700 px-5 py-4 text-lg font-bold text-white transition hover:bg-green-800"
          >
            Open the EzPay payment portal <ArrowRightIcon className="h-5 w-5" />
          </a>
          <p className="mt-2 text-center text-xs text-stone-600">Opens your secure payment page in a new tab.</p>
        </div>

        {/* DESKTOP — embedded portal with an always-visible new-tab fallback. */}
        <div className="hidden md:block">
          <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-amber-200 bg-white px-4 py-3 text-sm text-stone-700 shadow-sm">
            <ShieldIcon className="h-5 w-5 shrink-0 text-green-700" />
            <span className="flex-1">Trouble seeing the payment form below? Open the secure EzPay portal in a new tab.</span>
            <a
              href={org.ezpayUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-green-700 px-4 py-2 font-semibold text-white transition hover:bg-green-800"
            >
              Open EzPay <ArrowRightIcon className="h-4 w-4" />
            </a>
          </div>

          <div className="relative mt-4 overflow-hidden rounded-3xl border border-amber-200 bg-white shadow-sm">
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-white">
                <span className="flex items-center gap-3 text-sm text-stone-600">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-amber-200 border-t-green-700" />
                  Loading secure payment portal…
                </span>
              </div>
            )}
            <iframe
              src={org.ezpayUrl}
              title="BBI EzPay — secure bill payment"
              onLoad={() => setLoaded(true)}
              className="h-[820px] w-full"
              allow="payment"
            />
          </div>
        </div>

        {/* Other ways to pay — for members who don't pay online. */}
        <section className="mt-10 rounded-3xl border border-amber-200 bg-white p-6 shadow-sm">
          <h2 className="font-serif text-2xl font-semibold text-stone-900">Other ways to pay</h2>
          <p className="mt-1 text-sm text-stone-600">Don&apos;t want to pay online? You have options.</p>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {payment.otherWays.map((w) => (
              <li key={w.method} className="rounded-2xl bg-amber-50 p-4">
                <p className="font-semibold text-stone-900">{w.method}</p>
                <p className="mt-0.5 text-sm text-stone-600">{w.detail}</p>
              </li>
            ))}
          </ul>
          <div className="mt-5 grid gap-2 border-t border-amber-200 pt-4 text-sm text-stone-600 sm:grid-cols-3">
            <a href={`tel:${org.phone}`} className="flex items-center gap-2 font-semibold text-green-700">
              <PhoneIcon className="h-4 w-4" /> {org.phone}
            </a>
            <span className="flex items-center gap-2"><MapPinIcon className="h-4 w-4 text-stone-400" /> {org.address}</span>
            <span className="flex items-center gap-2"><ClockIcon className="h-4 w-4 text-stone-400" /> {org.officeHours}</span>
          </div>
        </section>

        <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-stone-600">
          <ShieldIcon className="h-4 w-4" /> Payments are securely processed by BBI EzPay.{" "}
          {org.shortName} never sees or stores your card or bank details.
        </p>
      </main>
    </div>
  );
}
