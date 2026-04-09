import { fetchQuery } from "convex/nextjs";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const slugs = await fetchQuery(api.marketReports.getAllMarketReportSlugs);
    return slugs.map((slug: string) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const doc = await fetchQuery(api.marketReports.getMarketReportBySlug, { slug });
    if (!doc) return { title: "Market report" };
    return {
      title: doc.title,
      description: `${doc.displayDate} — rates, bonds, equities, and global markets.`,
    };
  } catch {
    return { title: "Market report" };
  }
}

function ReportTable({
  head,
  rows,
}: {
  head: string[];
  rows: (string | number)[][];
}): ReactElement {
  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-[color-mix(in_srgb,var(--color-silver)_40%,transparent)] dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)]">
      <table className="w-full min-w-[600px] border-collapse text-left text-[13px] md:text-sm">
        <thead className="bg-[color-mix(in_srgb,var(--color-navy)_06%,var(--color-white))] font-body text-label uppercase tracking-wide text-[var(--color-navy)] dark:bg-[color-mix(in_srgb,var(--color-white)_06%,transparent)] dark:text-[var(--color-offwhite)]">
          <tr>
            {head.map((h) => (
              <th key={h} className="border-b border-[color-mix(in_srgb,var(--color-silver)_45%,transparent)] px-3 py-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="font-body text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
          {rows.map((r, i) => (
            <tr
              key={i}
              className="border-b border-[color-mix(in_srgb,var(--color-silver)_28%,transparent)] last:border-b-0 dark:border-[color-mix(in_srgb,var(--color-silver)_15%,transparent)]"
            >
              {r.map((c, j) => (
                <td key={j} className="px-3 py-2.5 tabular-nums">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NarrativeBlock({
  body,
  outlook,
}: {
  body: string;
  outlook: string;
}): ReactElement | null {
  if (!body.trim() && !outlook.trim()) return null;
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      {body.trim() ? (
        <div className="rounded-xl border border-[color-mix(in_srgb,var(--color-silver)_40%,transparent)] bg-[var(--color-white)] p-6 dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_88%,black)]">
          <p className="font-body text-label uppercase tracking-wide text-[var(--color-cyan)]">
            Commentary
          </p>
          <p className="mt-3 whitespace-pre-wrap font-body text-body leading-relaxed text-[color-mix(in_srgb,var(--color-navy)_88%,transparent)] dark:text-[var(--color-silver)]">
            {body}
          </p>
        </div>
      ) : null}
      {outlook.trim() ? (
        <div className="rounded-xl border border-[color-mix(in_srgb,var(--color-cyan)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-cyan)_06%,transparent)] p-6 dark:bg-[color-mix(in_srgb,var(--color-cyan)_08%,transparent)]">
          <p className="font-body text-label uppercase tracking-wide text-[var(--color-cyan)]">
            Outlook
          </p>
          <p className="mt-3 whitespace-pre-wrap font-body text-body leading-relaxed text-[color-mix(in_srgb,var(--color-navy)_88%,transparent)] dark:text-[var(--color-silver)]">
            {outlook}
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default async function MarketReportDetailPage({
  params,
}: PageProps): Promise<ReactElement> {
  const { slug } = await params;
  let doc: Doc<"marketReports"> | null = null;
  try {
    doc = await fetchQuery(api.marketReports.getMarketReportBySlug, { slug });
  } catch {
    notFound();
  }
  if (!doc) notFound();

  let pdfUrl: string | null = null;
  if (doc.pdfStorageId) {
    try {
      pdfUrl = await fetchQuery(api.storage.getFileUrl, { storageId: doc.pdfStorageId });
    } catch {
      pdfUrl = null;
    }
  }

  const mmRows = doc.moneyMarket.rates.map((r) => [
    r.label,
    r.today,
    r.prev,
    r.change,
  ]);
  const tbRows = doc.treasuryBills.benchmarkRates.map((r) => [
    r.maturityDate,
    r.dtm,
    r.discRateToday,
    r.discRatePrev,
    r.changeInDiscRate,
  ]);
  const fgnRows = doc.fgnBonds.bonds.map((r) => [
    r.maturityDate,
    r.coupon,
    r.ttm,
    r.yieldToday,
    r.yieldPrev,
    r.changeInYield,
  ]);
  const ssaRows = doc.ssaEurobonds.bonds.map((r) => [
    r.sovereign,
    r.maturityDate,
    r.coupon,
    r.ttm,
    r.yieldToday,
    r.yieldPrev,
    r.changeInYield,
  ]);
  const eqUp = doc.localEquities.topGainers.map((r) => [
    r.ticker,
    r.open,
    r.close,
    `${r.changePercent}%`,
  ]);
  const eqDown = doc.localEquities.topLosers.map((r) => [
    r.ticker,
    r.open,
    r.close,
    `${r.changePercent}%`,
  ]);
  const glRows = doc.globalMarkets.indices.map((r) => [
    r.region,
    r.index,
    r.open,
    r.closeOrIntraday,
    `${r.changePercent}%`,
    r.isIntraday ? "Yes" : "No",
  ]);

  return (
    <article className="pb-section pt-28">
      <header className="mx-auto max-w-container px-4 md:px-8">
        <p className="font-body text-caption uppercase tracking-[0.25em] text-amber-400/90">
          Market report
        </p>
        <h1 className="mt-3 max-w-4xl font-display text-h1 leading-snug text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
          {doc.title}
        </h1>
        <p className="mt-4 font-body text-label text-[var(--color-silver)]">{doc.displayDate}</p>
        {doc.moneyMarket.systemLiquiditySummary ? (
          <p className="mt-6 max-w-3xl border-l-2 border-[var(--color-cyan)] pl-5 font-body text-body leading-relaxed text-[color-mix(in_srgb,var(--color-navy)_85%,transparent)] dark:text-[var(--color-silver)]">
            {doc.moneyMarket.systemLiquiditySummary}
          </p>
        ) : null}
        {pdfUrl ? (
          <div className="mt-8">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-sm border border-[var(--color-cyan)] bg-[color-mix(in_srgb,var(--color-cyan)_12%,transparent)] px-5 py-3 font-body text-label uppercase tracking-wide text-[var(--color-navy)] transition-colors hover:bg-[var(--color-cyan)] dark:text-[var(--color-offwhite)]"
            >
              Download PDF{doc.pdfFileName ? ` · ${doc.pdfFileName}` : ""}
            </a>
          </div>
        ) : null}
      </header>

      <div className="mx-auto mt-16 max-w-container space-y-20 px-4 md:px-8">
        <section>
          <h2 className="font-display text-h2 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
            Money market
          </h2>
          {mmRows.length > 0 ? (
            <ReportTable
              head={["Label", "Today", "Prev", "Change"]}
              rows={mmRows}
            />
          ) : (
            <p className="mt-4 text-sm text-[var(--color-silver)]">No rows.</p>
          )}
          <NarrativeBlock {...doc.moneyMarket.narrative} />
        </section>

        <section>
          <h2 className="font-display text-h2 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
            Treasury bills
          </h2>
          {doc.treasuryBills.averageBenchmarkRate !== undefined ? (
            <p className="mt-3 font-body text-body text-[var(--color-silver)]">
              Average benchmark:{" "}
              <span className="tabular-nums text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
                {doc.treasuryBills.averageBenchmarkRate}
              </span>
            </p>
          ) : null}
          {tbRows.length > 0 ? (
            <ReportTable
              head={["Maturity", "DTM", "Disc today", "Disc prev", "Δ"]}
              rows={tbRows}
            />
          ) : null}
          <NarrativeBlock {...doc.treasuryBills.narrative} />
        </section>

        <section>
          <h2 className="font-display text-h2 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
            FGN bonds
          </h2>
          {doc.fgnBonds.averageBenchmarkYield !== undefined ? (
            <p className="mt-3 font-body text-body text-[var(--color-silver)]">
              Avg benchmark yield:{" "}
              <span className="tabular-nums text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
                {doc.fgnBonds.averageBenchmarkYield}
              </span>
            </p>
          ) : null}
          {fgnRows.length > 0 ? (
            <ReportTable
              head={["Maturity", "Coupon", "TTM", "Yield", "Yield prev", "Δ"]}
              rows={fgnRows}
            />
          ) : null}
          <NarrativeBlock {...doc.fgnBonds.narrative} />
        </section>

        <section>
          <h2 className="font-display text-h2 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
            SSA Eurobonds
          </h2>
          {ssaRows.length > 0 ? (
            <ReportTable
              head={[
                "Sovereign",
                "Maturity",
                "Coupon",
                "TTM",
                "Yield",
                "Yield prev",
                "Δ",
              ]}
              rows={ssaRows}
            />
          ) : null}
          <NarrativeBlock {...doc.ssaEurobonds.narrative} />
        </section>

        <section>
          <h2 className="font-display text-h2 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
            Local equities
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["ASI", doc.localEquities.asiLevel],
              ["ASI % chg", doc.localEquities.asiChangePercent],
              ["YTD %", doc.localEquities.ytdReturn],
              ["Breadth", doc.localEquities.marketBreadthRatio],
            ]
              .filter(([, v]) => v !== undefined)
              .map(([k, v]) => (
                <div
                  key={String(k)}
                  className="rounded-lg border border-[color-mix(in_srgb,var(--color-silver)_40%,transparent)] p-4 dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)]"
                >
                  <p className="font-body text-caption uppercase tracking-wide text-[var(--color-silver)]">
                    {k}
                  </p>
                  <p className="mt-2 font-display text-h3 tabular-nums text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
                    {String(v)}
                  </p>
                </div>
              ))}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {doc.localEquities.marketCap ? (
              <div>
                <p className="font-body text-caption text-[var(--color-silver)]">Market cap</p>
                <p className="mt-1 font-body">{doc.localEquities.marketCap}</p>
              </div>
            ) : null}
            {doc.localEquities.turnoverValue ? (
              <div>
                <p className="font-body text-caption text-[var(--color-silver)]">Turnover</p>
                <p className="mt-1 font-body">{doc.localEquities.turnoverValue}</p>
              </div>
            ) : null}
            {doc.localEquities.volumeTraded ? (
              <div>
                <p className="font-body text-caption text-[var(--color-silver)]">Volume</p>
                <p className="mt-1 font-body">{doc.localEquities.volumeTraded}</p>
              </div>
            ) : null}
          </div>
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            {eqUp.length > 0 ? (
              <div>
                <h3 className="font-display text-h3 text-[var(--color-cyan)]">Top gainers</h3>
                <ReportTable head={["Ticker", "Open", "Close", "% chg"]} rows={eqUp} />
              </div>
            ) : null}
            {eqDown.length > 0 ? (
              <div>
                <h3 className="font-display text-h3 text-[var(--color-cyan)]">Top losers</h3>
                <ReportTable head={["Ticker", "Open", "Close", "% chg"]} rows={eqDown} />
              </div>
            ) : null}
          </div>
          <NarrativeBlock {...doc.localEquities.narrative} />
        </section>

        <section>
          <h2 className="font-display text-h2 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
            Global markets
            {doc.globalMarkets.isIntradayNote ? (
              <span className="ml-3 align-middle font-body text-caption font-normal normal-case text-[var(--color-cyan)]">
                Intraday note
              </span>
            ) : null}
          </h2>
          {glRows.length > 0 ? (
            <ReportTable
              head={["Region", "Index", "Open", "Close / intraday", "% chg", "Intraday"]}
              rows={glRows}
            />
          ) : null}
          <NarrativeBlock {...doc.globalMarkets.narrative} />
        </section>

        {doc.sources || doc.disclaimer ? (
          <footer className="border-t border-[color-mix(in_srgb,var(--color-silver)_40%,transparent)] pt-10 dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)]">
            {doc.sources ? (
              <p className="font-body text-caption text-[var(--color-silver)]">
                <span className="font-medium text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
                  Sources:{" "}
                </span>
                {doc.sources}
              </p>
            ) : null}
            {doc.disclaimer ? (
              <p className="mt-4 font-body text-caption leading-relaxed text-[var(--color-silver)]">
                {doc.disclaimer}
              </p>
            ) : null}
          </footer>
        ) : null}
      </div>

      <div className="mx-auto mt-16 max-w-container px-4 text-center md:px-8">
        <Link
          href="/market-reports"
          className="font-body text-label uppercase tracking-wide text-[var(--color-cyan)]"
        >
          ← All market reports
        </Link>
      </div>
    </article>
  );
}
