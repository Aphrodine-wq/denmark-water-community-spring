import Link from "next/link";
import {
  org,
  alertNotice,
  quickActions,
  services,
  rates,
  waterQuality,
  board,
  boardMeetings,
  faqs,
} from "@/lib/content";
import {
  DropletIcon,
  ShieldIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ArrowRightIcon,
  WaveIcon,
  quickActionIcon,
} from "@/components/icons";

// CONCEPT 3 — "Community Spring": warm, approachable, soft greens & cream, rounded.
export const metadata = { title: `${org.name} — Concept 3` };

const nav = [
  { label: "Services", href: "#services" },
  { label: "Rates", href: "#rates" },
  { label: "Water Quality", href: "#quality" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function CommunitySpringHome() {
  return (
    <div className="min-h-screen bg-amber-50 text-stone-700">
      {/* Alert banner */}
      {alertNotice.active && (
        <div className="bg-green-800 text-green-50">
          <div className="mx-auto flex max-w-6xl items-start gap-3 px-5 py-2.5 text-sm">
            <span className="mt-0.5 rounded-full bg-green-700 px-3 py-0.5 text-xs font-semibold">{alertNotice.label}</span>
            <p className="text-green-100">{alertNotice.message}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-amber-200/70 bg-amber-50/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <Link href="#top" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-700 text-white">
              <DropletIcon className="h-6 w-6" />
            </span>
            <span className="leading-tight">
              <span className="block font-serif text-lg font-semibold text-stone-900">{org.name}</span>
              <span className="block text-xs text-stone-500">Your neighbors since {org.established}</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-sm font-medium text-stone-600 hover:text-green-700">{n.label}</a>
            ))}
          </nav>
          <Link href="/pay" className="inline-flex items-center gap-2 rounded-full bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800">
            Pay My Bill <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-lime-200/70 px-4 py-1.5 text-xs font-semibold text-green-800">
                <WaveIcon className="h-4 w-4" /> Caring for {org.membersServed}
              </span>
              <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight text-stone-900 md:text-5xl">{org.tagline}</h1>
              <p className="mt-5 max-w-md text-lg text-stone-600">
                Pay your bill, report a leak, or set up new service — all online, anytime. Proudly serving
                {" "}{org.serviceArea} since {org.established}.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/pay" className="inline-flex items-center gap-2 rounded-full bg-green-700 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-green-800">
                  Pay My Bill <ArrowRightIcon className="h-5 w-5" />
                </Link>
                <a href="#services" className="inline-flex items-center gap-2 rounded-full border-2 border-green-700/30 px-6 py-3.5 text-base font-semibold text-green-800 transition hover:border-green-700">
                  Explore Services
                </a>
              </div>
            </div>
            <div className="rounded-3xl border border-amber-200 bg-white p-7 shadow-lg shadow-green-900/5">
              <div className="flex items-center gap-3 border-b border-amber-100 pb-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-lime-100 text-green-700">
                  <DropletIcon className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-stone-900">Your account</p>
                  <p className="text-xs text-stone-500">Sample dashboard</p>
                </div>
              </div>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between"><dt className="text-stone-500">Current balance</dt><dd className="font-semibold text-stone-900">$64.35</dd></div>
                <div className="flex justify-between"><dt className="text-stone-500">Due date</dt><dd className="font-medium text-stone-700">July 20, 2026</dd></div>
                <div className="flex justify-between"><dt className="text-stone-500">This month&apos;s usage</dt><dd className="font-medium text-stone-700">7,450 gal</dd></div>
              </dl>
              <Link href="/pay" className="mt-6 flex items-center justify-center gap-2 rounded-full bg-lime-100 py-2.5 text-sm font-semibold text-green-800 transition hover:bg-lime-200">
                Open the payment portal <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Quick actions */}
        <section className="mx-auto max-w-6xl px-5 py-12">
          <div className="grid gap-5 md:grid-cols-3">
            {quickActions.map((a) => {
              const Icon = quickActionIcon[a.key as keyof typeof quickActionIcon];
              const href = a.href === "pay" ? "/pay" : a.href;
              return (
                <Link key={a.key} href={href} className="group rounded-3xl border border-amber-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-green-900/5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-100 text-green-700 transition group-hover:bg-green-700 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-serif text-xl font-semibold text-stone-900">{a.title}</h3>
                  <p className="mt-2 text-sm text-stone-600">{a.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-green-700">Get started <ArrowRightIcon className="h-4 w-4" /></span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Services */}
        <section id="services" className="bg-white/60 py-16">
          <div className="mx-auto max-w-6xl px-5">
            <SectionHeading eyebrow="What we do" title="Services for our community" />
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {services.map((s) => (
                <div key={s.title} className="flex gap-4 rounded-3xl bg-white p-7 shadow-sm">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-100 text-green-700">
                    <DropletIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-stone-900">{s.title}</h3>
                    <p className="mt-1 text-sm text-stone-600">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rates */}
        <section id="rates" className="py-16">
          <div className="mx-auto max-w-4xl px-5">
            <SectionHeading eyebrow="Billing" title="Rates & fees" />
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
            <p className="mt-3 text-xs text-stone-500">Rates shown are representative. Current schedules are available at the association office.</p>
          </div>
        </section>

        {/* Water quality */}
        <section id="quality" className="bg-green-700 py-16 text-white">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-green-600/50 px-4 py-1.5 text-xs font-semibold">
                <ShieldIcon className="h-4 w-4" /> {waterQuality.reportYear} Consumer Confidence Report
              </span>
              <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight md:text-4xl">{waterQuality.headline}</h2>
              <p className="mt-5 max-w-xl text-green-100">{waterQuality.body}</p>
              <a href="#contact" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-green-800 transition hover:bg-lime-50">
                Request the full report <ArrowRightIcon className="h-4 w-4" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { k: "0", v: "Violations" },
                { k: "100%", v: "Standards met" },
                { k: "24/7", v: "Monitoring" },
                { k: org.established.toString(), v: "Serving since" },
              ].map((stat) => (
                <div key={stat.v} className="rounded-3xl bg-green-600/40 p-6">
                  <p className="font-serif text-3xl font-semibold">{stat.k}</p>
                  <p className="mt-1 text-sm text-green-100">{stat.v}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About / Board */}
        <section id="about" className="py-16">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2">
            <div>
              <SectionHeading eyebrow="About us" title="Member-owned, neighbor-run" />
              <p className="mt-5 text-stone-600">
                {org.name} is a member-owned, not-for-profit water system. Every dollar goes right back
                into clean, reliable water for the families and businesses we&apos;re proud to serve.
              </p>
              <div className="mt-7 rounded-3xl border border-amber-200 bg-white p-6">
                <p className="text-sm font-semibold text-stone-900">Board meetings</p>
                <p className="mt-1 text-sm text-stone-600">{boardMeetings.cadence}</p>
                <p className="text-sm text-stone-600">{boardMeetings.location}</p>
                <p className="mt-2 text-xs text-stone-500">{boardMeetings.note}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">Board of directors</p>
              <ul className="mt-5 divide-y divide-amber-100 overflow-hidden rounded-3xl border border-amber-200 bg-white">
                {board.map((m) => (
                  <li key={m.name} className="flex items-center justify-between px-5 py-4">
                    <span className="font-medium text-stone-800">{m.name}</span>
                    <span className="text-sm text-green-700">{m.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white/60 py-16">
          <div className="mx-auto max-w-4xl px-5">
            <SectionHeading eyebrow="Questions" title="Frequently asked" />
            <div className="mt-8 space-y-3">
              {faqs.map((f) => (
                <details key={f.q} className="group rounded-2xl border border-amber-200 bg-white p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-serif text-lg font-medium text-stone-900">
                    {f.q}
                    <span className="text-green-700 transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-stone-600">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-16">
          <div className="mx-auto max-w-6xl px-5">
            <SectionHeading eyebrow="Get in touch" title="Contact the office" />
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <ContactCard icon={<PhoneIcon className="h-5 w-5" />} label="Office phone" value={org.phone} sub={`Emergency: ${org.emergencyPhone}`} />
              <ContactCard icon={<MapPinIcon className="h-5 w-5" />} label="Office address" value={org.address} sub={org.email} />
              <ContactCard icon={<ClockIcon className="h-5 w-5" />} label="Office hours" value={org.officeHours} sub="Closed weekends & holidays" />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-green-800 py-10 text-green-100">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 text-sm md:flex-row">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-green-700">
              <DropletIcon className="h-5 w-5" />
            </span>
            <span className="font-serif font-semibold text-white">{org.name}</span>
          </div>
          <p className="text-green-200">© {waterQuality.reportYear} {org.name}.</p>
          <Link href="/" className="text-green-200 underline hover:text-white">← Back to concepts</Link>
        </div>
      </footer>
    </div>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-wide text-green-700">{eyebrow}</p>
      <h2 className="mt-1 font-serif text-3xl font-semibold tracking-tight text-stone-900 md:text-4xl">{title}</h2>
    </div>
  );
}

function ContactCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) {
  return (
    <div className="rounded-3xl border border-amber-200 bg-white p-7">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lime-100 text-green-700">{icon}</span>
      <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-stone-500">{label}</p>
      <p className="mt-1 font-semibold text-stone-900">{value}</p>
      <p className="mt-0.5 text-sm text-stone-500">{sub}</p>
    </div>
  );
}
