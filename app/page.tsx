import Link from "next/link";
import { org, quickActions, waterQuality, rates, alertNotice } from "@/lib/content";
import {
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ArrowRightIcon,
  quickActionIcon,
} from "@/components/icons";

const actionHref: Record<string, string> = { pay: "/pay", leak: "/report-leak", service: "/start-stop" };

export const metadata = { title: `${org.name} — Pay your water bill online` };

const nav = [
  { label: "Pay Bill", href: "/pay" },
  { label: "Services", href: "#services" },
  { label: "Rates", href: "#rates" },
  { label: "Water Quality", href: "#quality" },
  { label: "Contact", href: "#contact" },
];

export default function CommunitySpringHome() {
  return (
    <div className="min-h-screen bg-amber-50 text-stone-700">
      {/* Service notice */}
      {alertNotice.active && (
        <div className="bg-green-800 text-green-50">
          <div className="mx-auto flex max-w-6xl items-start gap-3 px-6 py-2.5 text-sm">
            <span className="mt-0.5 rounded-full bg-green-700 px-3 py-0.5 text-xs font-semibold">{alertNotice.label}</span>
            <p className="text-green-100">{alertNotice.message}</p>
          </div>
        </div>
      )}
      {/* Utility bar */}
      <div className="hidden bg-green-800 text-green-100 md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 text-xs">
          <span className="flex items-center gap-2"><MapPinIcon className="h-3.5 w-3.5" /> {org.address}</span>
          <span className="flex items-center gap-5">
            <span className="flex items-center gap-2"><ClockIcon className="h-3.5 w-3.5" /> {org.officeHours}</span>
            <a href={`tel:${org.phone}`} className="flex items-center gap-2 text-white"><PhoneIcon className="h-3.5 w-3.5" /> {org.phone}</a>
          </span>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-amber-200/70 bg-amber-50/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <Link href="/" className="font-serif text-xl font-semibold text-stone-900">{org.name}</Link>
          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((n) => (
              <a key={n.label} href={n.href} className="text-sm font-semibold text-stone-600 transition hover:text-green-700">
                {n.label}
              </a>
            ))}
          </nav>
          <Link
            href="/pay"
            className="inline-flex items-center gap-2 rounded-full bg-green-700 px-6 py-3 text-base font-bold text-white shadow-sm transition hover:bg-green-800"
          >
            Pay My Bill <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
      </header>

      {/* Mobile quick bar — tap-to-call + section nav (desktop gets the utility bar + full nav). */}
      <div className="border-b border-amber-200 bg-white lg:hidden">
        <div className="flex items-center gap-1 overflow-x-auto px-4 py-2 text-sm">
          <a href={`tel:${org.phone}`} className="flex shrink-0 items-center gap-1.5 rounded-full bg-lime-100 px-3 py-1.5 font-semibold text-green-800">
            <PhoneIcon className="h-4 w-4" /> Call office
          </a>
          {nav.filter((n) => n.href.startsWith("#")).map((n) => (
            <a key={n.label} href={n.href} className="shrink-0 rounded-full px-3 py-1.5 font-medium text-stone-600">{n.label}</a>
          ))}
        </div>
      </div>

      <main id="main">
        {/* Hero */}
        <section className="relative isolate overflow-hidden">
          <img src="/images/hero.jpg" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-green-950/80 via-green-900/55 to-transparent" />
          <div className="mx-auto max-w-6xl px-6 py-28 md:py-40">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-lime-200">Your neighbors since {org.established}</p>
              <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
                {org.tagline}
              </h1>
              <p className="mt-5 max-w-md text-lg text-green-50">
                Pay your water bill online anytime — just have your account number ready.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/pay"
                  className="inline-flex items-center gap-2.5 rounded-full bg-green-600 px-9 py-5 text-xl font-bold text-white shadow-lg shadow-green-950/30 transition hover:bg-green-500"
                >
                  Pay My Bill <ArrowRightIcon className="h-6 w-6" />
                </Link>
                <Link href="/report-leak" className="inline-flex items-center gap-2 rounded-full border-2 border-white/60 px-7 py-5 text-base font-semibold text-white transition hover:bg-white/10">
                  Report a Leak
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick actions */}
        <section id="services" className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-6 md:grid-cols-3">
            {quickActions.map((a) => {
              const Icon = quickActionIcon[a.key as keyof typeof quickActionIcon];
              const href = actionHref[a.key] ?? "#contact";
              return (
                <Link key={a.key} href={href} className="group flex items-start gap-4 rounded-3xl border border-amber-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-green-900/5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-lime-100 text-green-700 transition group-hover:bg-green-700 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block font-serif text-lg font-semibold text-stone-900">{a.title}</span>
                    <span className="mt-1 block text-sm text-stone-500">{a.desc}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* About / water-quality band */}
        <section id="quality" className="bg-white/60">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
            <div className="overflow-hidden rounded-3xl shadow-lg">
              <img src="/images/band.jpg" alt="Wildflowers in the service area" className="h-80 w-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">Clean water, close to home</p>
              <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-stone-900 md:text-4xl">Member-owned, neighbor-run since {org.established}</h2>
              <p className="mt-4 text-stone-600">{waterQuality.body}</p>
              <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-amber-200 pt-6">
                {[["0", "Violations"], ["100%", "Standards met"], [org.membersServed, "Served"]].map(([k, v]) => (
                  <div key={v}>
                    <dt className="font-serif text-3xl font-semibold text-green-700">{k}</dt>
                    <dd className="mt-0.5 text-sm text-stone-500">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Rates */}
        <section id="rates" className="py-16">
          <div className="mx-auto max-w-4xl px-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-green-700">Billing</p>
            <h2 className="mt-1 font-serif text-3xl font-semibold tracking-tight text-stone-900 md:text-4xl">Rates &amp; fees</h2>
            <div className="mt-8 overflow-hidden rounded-3xl border border-amber-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-lime-50 text-stone-500">
                  <tr>
                    <th className="px-5 py-3.5 font-semibold">Charge</th>
                    <th className="hidden px-5 py-3.5 font-semibold sm:table-cell">Detail</th>
                    <th className="px-5 py-3.5 text-right font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100">
                  {rates.map((r) => (
                    <tr key={r.label}>
                      <td className="px-5 py-3.5 font-medium text-stone-800">{r.label}</td>
                      <td className="hidden px-5 py-3.5 text-stone-500 sm:table-cell">{r.detail}</td>
                      <td className="px-5 py-3.5 text-right font-semibold text-green-700">{r.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Contact + final CTA */}
        <section id="contact" className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-col items-start justify-between gap-10 rounded-[2rem] bg-green-700 p-10 text-white md:flex-row md:items-center md:p-14">
            <div>
              <h2 className="font-serif text-3xl font-semibold md:text-4xl">Ready to pay your bill?</h2>
              <p className="mt-2 max-w-sm text-green-100">Have your account number ready. Questions? Call the office at <a href={`tel:${org.phone}`} className="font-semibold text-white underline underline-offset-2">{org.phone}</a>.</p>
            </div>
            <Link href="/pay" className="inline-flex items-center gap-2.5 rounded-full bg-white px-9 py-5 text-xl font-bold text-green-700 shadow-lg transition hover:bg-lime-50">
              Pay My Bill <ArrowRightIcon className="h-6 w-6" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-green-800 py-8 text-green-100">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm md:flex-row">
          <span className="font-serif font-semibold text-white">{org.name}</span>
          <span className="text-green-200">{org.address} · <a href={`tel:${org.phone}`} className="hover:text-white">{org.phone}</a></span>
          <span className="text-green-300">© {waterQuality.reportYear}</span>
        </div>
      </footer>
    </div>
  );
}
