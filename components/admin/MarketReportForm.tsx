"use client";

import { useMutation, useQuery } from "convex/react";
import slugify from "slugify";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState, type ReactElement } from "react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PdfUploader } from "@/components/admin/PdfUploader";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import { useConvexStaffSessionReady } from "@/hooks/useConvexStaffSessionReady";
import { useRecaptchaGate } from "@/hooks/useRecaptchaGate";
import { defaultMarketReportPayload } from "@/lib/content-form-defaults";

type MRBody = Omit<Doc<"marketReports">, "_id" | "_creationTime">;

function emptyDoc(): MRBody {
  const b = defaultMarketReportPayload();
  return {
    slug: b.slug,
    title: b.title,
    reportDate: b.reportDate,
    displayDate: b.displayDate,
    status: "draft",
    moneyMarket: b.moneyMarket,
    treasuryBills: b.treasuryBills,
    fgnBonds: b.fgnBonds,
    ssaEurobonds: b.ssaEurobonds,
    localEquities: b.localEquities,
    globalMarkets: b.globalMarkets,
    sources: b.sources,
    disclaimer: b.disclaimer,
  };
}

function fromRow(d: Doc<"marketReports">): MRBody {
  return (({ _id: _a, _creationTime: _b, ...rest }): MRBody => rest)(d);
}

function NumInput({
  value,
  onChange,
  placeholder,
}: {
  value: number | "" | undefined;
  onChange: (n: number) => void;
  placeholder?: string;
}): ReactElement {
  return (
    <Input
      type="number"
      step="any"
      placeholder={placeholder}
      value={value === undefined || value === "" ? "" : String(value)}
      onChange={(e) => {
        const v = e.target.value;
        if (v === "") return;
        const n = Number(v);
        if (!Number.isNaN(n)) onChange(n);
      }}
    />
  );
}

export function MarketReportForm({
  reportId,
}: {
  reportId?: Id<"marketReports">;
}): ReactElement {
  const router = useRouter();
  const staffReady = useConvexStaffSessionReady();
  const existing = useQuery(
    api.marketReports.getMarketReportById,
    staffReady && reportId ? { id: reportId } : "skip",
  );

  const verifyHuman = useRecaptchaGate();
  const create = useMutation(api.marketReports.createMarketReport);
  const update = useMutation(api.marketReports.updateMarketReport);
  const publishM = useMutation(api.marketReports.publishMarketReport);
  const unpublishM = useMutation(api.marketReports.unpublishMarketReport);
  const deleteM = useMutation(api.marketReports.deleteMarketReport);

  const [form, setForm] = useState<MRBody>(() => emptyDoc());
  const [hydrated, setHydrated] = useState(!reportId);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    if (!reportId) {
      setForm(emptyDoc());
      setHydrated(true);
      return;
    }
    if (existing) {
      setForm(fromRow(existing));
      setHydrated(true);
    }
  }, [reportId, existing]);

  const setTop = useCallback(<K extends keyof MRBody>(key: K, value: MRBody[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  }, []);

  if (reportId && !hydrated) {
    return <div className="p-8 text-sm text-zinc-400">Loading…</div>;
  }

  const guard = async (action: string): Promise<boolean> => {
    try {
      await verifyHuman(action);
      return true;
    } catch {
      toast.error("Verification failed. Please try again.");
      return false;
    }
  };

  const buildArgs = (status: "draft" | "published", validatePublish: boolean) => {
    if (validatePublish && !form.title.trim()) {
      toast.error("Title is required to publish.");
      throw new Error("validation");
    }
    return {
      ...form,
      slug: form.slug || slugify(form.title, { lower: true, strict: true }),
      status,
    };
  };

  const saveDraft = async (): Promise<void> => {
    if (!(await guard("admin_market_report_draft"))) return;
    let args;
    try {
      args = buildArgs("draft", false);
    } catch {
      return;
    }
    if (reportId) {
      await update({ id: reportId, patch: { ...args } });
    } else {
      await create(args);
    }
    router.push("/admin/market-reports");
  };

  const publish = async (): Promise<void> => {
    if (!(await guard("admin_market_report_publish"))) return;
    let args;
    try {
      args = buildArgs("draft", true);
    } catch {
      return;
    }
    if (reportId) {
      await update({ id: reportId, patch: { ...args } });
      await publishM({ id: reportId });
    } else {
      const id = await create(args);
      await publishM({ id });
    }
    router.push("/admin/market-reports");
  };

  const unpublish = async (): Promise<void> => {
    if (!reportId) return;
    if (!(await guard("admin_market_report_unpublish"))) return;
    await unpublishM({ id: reportId });
    router.refresh();
  };

  const remove = async (): Promise<void> => {
    if (!reportId) return;
    if (!(await guard("admin_market_report_delete"))) return;
    await deleteM({ id: reportId });
    setConfirmOpen(false);
    router.push("/admin/market-reports");
  };

  const published = existing?.status === "published";

  const mm = form.moneyMarket;
  const tb = form.treasuryBills;
  const fgn = form.fgnBonds;
  const ssa = form.ssaEurobonds;
  const eq = form.localEquities;
  const gl = form.globalMarkets;

  return (
    <motion.div
      className="mx-auto max-w-4xl space-y-4 rounded-xl border border-white/10 bg-white/[0.03] p-6 shadow-xl md:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-wrap justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => void saveDraft()}>
          Save Draft
        </Button>
        <Button type="button" onClick={() => void publish()}>
          Publish
        </Button>
        {reportId && published ? (
          <Button type="button" variant="secondary" onClick={() => void unpublish()}>
            Unpublish
          </Button>
        ) : null}
        {reportId ? (
          <Button type="button" variant="destructive" onClick={() => setConfirmOpen(true)}>
            Delete
          </Button>
        ) : null}
      </div>

      <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100">
        <p className="font-semibold text-amber-200">Where this appears on the site</p>
        <p className="mt-2 text-amber-100/90">
          Published reports are listed at{" "}
          <span className="font-mono text-xs">/insights/market-report</span> and open at{" "}
          <span className="font-mono text-xs">/market-reports/[slug]</span> (the{" "}
          <span className="font-mono text-xs">/market-reports</span> index redirects to that
          listing). Short <strong>insight</strong> briefs with category &quot;Market
          Report&quot; live in the main <span className="font-mono text-xs">/insights</span>{" "}
          hub only—use Insights admin for those.
        </p>
      </div>

      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center gap-2 border-b border-white/10 py-3 font-body text-label uppercase tracking-wide text-cyan-300">
          <ChevronDown className="size-4" />
          Metadata
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 py-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label>Title</Label>
              <Input
                className="mt-2"
                value={form.title}
                onChange={(e) => setTop("title", e.target.value)}
                onBlur={() => {
                  if (!form.slug && form.title) {
                    setTop(
                      "slug",
                      slugify(form.title, { lower: true, strict: true, trim: true }),
                    );
                  }
                }}
              />
            </div>
            <div>
              <Label>Slug</Label>
              <Input
                className="mt-2 font-mono text-sm"
                value={form.slug}
                onChange={(e) => setTop("slug", e.target.value)}
              />
            </div>
            <div>
              <Label>Report date</Label>
              <Input
                type="date"
                className="mt-2"
                value={form.reportDate}
                onChange={(e) => setTop("reportDate", e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <Label>Display date</Label>
              <Input
                className="mt-2"
                value={form.displayDate}
                onChange={(e) => setTop("displayDate", e.target.value)}
                placeholder="Tuesday, 31ST March 2026"
              />
            </div>
            <div className="md:col-span-2">
              <Label>Sources (footer)</Label>
              <Textarea
                className="mt-2"
                value={form.sources ?? ""}
                onChange={(e) => setTop("sources", e.target.value || undefined)}
              />
            </div>
            <div className="md:col-span-2">
              <Label>Disclaimer</Label>
              <Textarea
                className="mt-2"
                value={form.disclaimer ?? ""}
                onChange={(e) => setTop("disclaimer", e.target.value || undefined)}
              />
            </div>
          </div>
          <PdfUploader
            storageId={form.pdfStorageId}
            fileName={form.pdfFileName}
            onUploaded={({ storageId, fileName }) =>
              setForm((f) => ({ ...f, pdfStorageId: storageId, pdfFileName: fileName }))
            }
            onRemoved={() =>
              setForm((f) => ({ ...f, pdfStorageId: undefined, pdfFileName: undefined }))
            }
          />
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger className="flex w-full items-center gap-2 border-b border-white/10 py-3 font-body text-label uppercase tracking-wide text-cyan-300">
          <ChevronDown className="size-4" />
          Money market
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 py-4">
          <div>
            <Label>Liquidity summary</Label>
            <Textarea
              className="mt-2"
              value={mm.systemLiquiditySummary ?? ""}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  moneyMarket: {
                    ...f.moneyMarket,
                    systemLiquiditySummary: e.target.value || undefined,
                  },
                }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase text-zinc-500">Rates</span>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() =>
                setForm((f) => ({
                  ...f,
                  moneyMarket: {
                    ...f.moneyMarket,
                    rates: [
                      ...f.moneyMarket.rates,
                      { label: "", today: 0, prev: 0, change: 0 },
                    ],
                  },
                }))
              }
            >
              <Plus className="mr-1 size-4" />
              Add row
            </Button>
          </div>
          {mm.rates.map((row, idx) => (
            <div key={idx} className="grid gap-2 rounded-lg border border-white/10 p-3 md:grid-cols-5">
              <Input
                placeholder="Label"
                className="md:col-span-5"
                value={row.label}
                onChange={(e) => {
                  const next = [...mm.rates];
                  next[idx] = { ...row, label: e.target.value };
                  setForm((f) => ({
                    ...f,
                    moneyMarket: { ...f.moneyMarket, rates: next },
                  }));
                }}
              />
              <NumInput
                placeholder="Today"
                value={row.today}
                onChange={(n) => {
                  const next = [...mm.rates];
                  next[idx] = { ...row, today: n, change: n - row.prev };
                  setForm((f) => ({
                    ...f,
                    moneyMarket: { ...f.moneyMarket, rates: next },
                  }));
                }}
              />
              <NumInput
                placeholder="Prev"
                value={row.prev}
                onChange={(n) => {
                  const next = [...mm.rates];
                  next[idx] = { ...row, prev: n, change: row.today - n };
                  setForm((f) => ({
                    ...f,
                    moneyMarket: { ...f.moneyMarket, rates: next },
                  }));
                }}
              />
              <NumInput
                placeholder="Change"
                value={row.change}
                onChange={(n) => {
                  const next = [...mm.rates];
                  next[idx] = { ...row, change: n };
                  setForm((f) => ({
                    ...f,
                    moneyMarket: { ...f.moneyMarket, rates: next },
                  }));
                }}
              />
              <div className="flex items-center justify-end md:col-span-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-destructive"
                  onClick={() => {
                    setForm((f) => ({
                      ...f,
                      moneyMarket: {
                        ...f.moneyMarket,
                        rates: f.moneyMarket.rates.filter((_, i) => i !== idx),
                      },
                    }));
                  }}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ))}
          <div className="grid gap-2 md:grid-cols-2">
            <div>
              <Label>Narrative — body</Label>
              <Textarea
                className="mt-2"
                value={mm.narrative.body}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    moneyMarket: {
                      ...f.moneyMarket,
                      narrative: { ...f.moneyMarket.narrative, body: e.target.value },
                    },
                  }))
                }
              />
            </div>
            <div>
              <Label>Narrative — outlook</Label>
              <Textarea
                className="mt-2"
                value={mm.narrative.outlook}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    moneyMarket: {
                      ...f.moneyMarket,
                      narrative: {
                        ...f.moneyMarket.narrative,
                        outlook: e.target.value,
                      },
                    },
                  }))
                }
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger className="flex w-full items-center gap-2 border-b border-white/10 py-3 font-body text-label uppercase tracking-wide text-cyan-300">
          <ChevronDown className="size-4" />
          Treasury bills
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 py-4">
          <div>
            <Label>Average benchmark rate</Label>
            <NumInput
              placeholder="Optional"
              value={tb.averageBenchmarkRate}
              onChange={(n) =>
                setForm((f) => ({
                  ...f,
                  treasuryBills: { ...f.treasuryBills, averageBenchmarkRate: n },
                }))
              }
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() =>
                setForm((f) => ({
                  ...f,
                  treasuryBills: {
                    ...f.treasuryBills,
                    benchmarkRates: [
                      ...f.treasuryBills.benchmarkRates,
                      {
                        maturityDate: "",
                        dtm: 0,
                        discRateToday: 0,
                        discRatePrev: 0,
                        changeInDiscRate: 0,
                      },
                    ],
                  },
                }))
              }
            >
              <Plus className="mr-1 size-4" />
              Add bill
            </Button>
          </div>
          {tb.benchmarkRates.map((row, idx) => (
            <div key={idx} className="grid gap-2 rounded-lg border border-white/10 p-3 md:grid-cols-6">
              <Input
                placeholder="Maturity"
                value={row.maturityDate}
                onChange={(e) => {
                  const next = [...tb.benchmarkRates];
                  next[idx] = { ...row, maturityDate: e.target.value };
                  setForm((f) => ({
                    ...f,
                    treasuryBills: { ...f.treasuryBills, benchmarkRates: next },
                  }));
                }}
              />
              <NumInput
                placeholder="DTM"
                value={row.dtm}
                onChange={(n) => {
                  const next = [...tb.benchmarkRates];
                  next[idx] = { ...row, dtm: n };
                  setForm((f) => ({
                    ...f,
                    treasuryBills: { ...f.treasuryBills, benchmarkRates: next },
                  }));
                }}
              />
              <NumInput
                placeholder="Disc today"
                value={row.discRateToday}
                onChange={(n) => {
                  const next = [...tb.benchmarkRates];
                  next[idx] = {
                    ...row,
                    discRateToday: n,
                    changeInDiscRate: n - row.discRatePrev,
                  };
                  setForm((f) => ({
                    ...f,
                    treasuryBills: { ...f.treasuryBills, benchmarkRates: next },
                  }));
                }}
              />
              <NumInput
                placeholder="Disc prev"
                value={row.discRatePrev}
                onChange={(n) => {
                  const next = [...tb.benchmarkRates];
                  next[idx] = {
                    ...row,
                    discRatePrev: n,
                    changeInDiscRate: row.discRateToday - n,
                  };
                  setForm((f) => ({
                    ...f,
                    treasuryBills: { ...f.treasuryBills, benchmarkRates: next },
                  }));
                }}
              />
              <NumInput
                placeholder="Δ"
                value={row.changeInDiscRate}
                onChange={(n) => {
                  const next = [...tb.benchmarkRates];
                  next[idx] = { ...row, changeInDiscRate: n };
                  setForm((f) => ({
                    ...f,
                    treasuryBills: { ...f.treasuryBills, benchmarkRates: next },
                  }));
                }}
              />
              <Button
                type="button"
                variant="ghost"
                className="text-destructive"
                onClick={() =>
                  setForm((f) => ({
                    ...f,
                    treasuryBills: {
                      ...f.treasuryBills,
                      benchmarkRates: f.treasuryBills.benchmarkRates.filter(
                        (_, i) => i !== idx,
                      ),
                    },
                  }))
                }
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
          <NarrativePair
            body={tb.narrative.body}
            outlook={tb.narrative.outlook}
            onBody={(body) =>
              setForm((f) => ({
                ...f,
                treasuryBills: {
                  ...f.treasuryBills,
                  narrative: { ...f.treasuryBills.narrative, body },
                },
              }))
            }
            onOutlook={(outlook) =>
              setForm((f) => ({
                ...f,
                treasuryBills: {
                  ...f.treasuryBills,
                  narrative: { ...f.treasuryBills.narrative, outlook },
                },
              }))
            }
          />
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger className="flex w-full items-center gap-2 border-b border-white/10 py-3 font-body text-label uppercase tracking-wide text-cyan-300">
          <ChevronDown className="size-4" />
          FGN bonds
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 py-4">
          <div>
            <Label>Average benchmark yield</Label>
            <NumInput
              value={fgn.averageBenchmarkYield}
              onChange={(n) =>
                setForm((f) => ({
                  ...f,
                  fgnBonds: { ...f.fgnBonds, averageBenchmarkYield: n },
                }))
              }
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() =>
                setForm((f) => ({
                  ...f,
                  fgnBonds: {
                    ...f.fgnBonds,
                    bonds: [
                      ...f.fgnBonds.bonds,
                      {
                        maturityDate: "",
                        coupon: 0,
                        ttm: 0,
                        yieldToday: 0,
                        yieldPrev: 0,
                        changeInYield: 0,
                      },
                    ],
                  },
                }))
              }
            >
              <Plus className="mr-1 size-4" />
              Add bond
            </Button>
          </div>
          {fgn.bonds.map((row, idx) => (
            <FgnBondRowEditor
                    key={idx}
                    row={row}
                    onChange={(nextRow) => {
                      const next = [...fgn.bonds];
                      next[idx] = nextRow;
                      setForm((f) => ({
                        ...f,
                        fgnBonds: { ...f.fgnBonds, bonds: next },
                      }));
                    }}
                    onRemove={() =>
                      setForm((f) => ({
                        ...f,
                        fgnBonds: {
                          ...f.fgnBonds,
                          bonds: f.fgnBonds.bonds.filter((_, i) => i !== idx),
                        },
                      }))
                    }
                  />
          ))}
          <NarrativePair
            body={fgn.narrative.body}
            outlook={fgn.narrative.outlook}
            onBody={(body) =>
              setForm((f) => ({
                ...f,
                fgnBonds: {
                  ...f.fgnBonds,
                  narrative: { ...f.fgnBonds.narrative, body },
                },
              }))
            }
            onOutlook={(outlook) =>
              setForm((f) => ({
                ...f,
                fgnBonds: {
                  ...f.fgnBonds,
                  narrative: { ...f.fgnBonds.narrative, outlook },
                },
              }))
            }
          />
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger className="flex w-full items-center gap-2 border-b border-white/10 py-3 font-body text-label uppercase tracking-wide text-cyan-300">
          <ChevronDown className="size-4" />
          SSA Eurobonds
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 py-4">
          <div className="flex justify-end">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() =>
                setForm((f) => ({
                  ...f,
                  ssaEurobonds: {
                    ...f.ssaEurobonds,
                    bonds: [
                      ...f.ssaEurobonds.bonds,
                      {
                        sovereign: "",
                        maturityDate: "",
                        coupon: 0,
                        ttm: 0,
                        yieldToday: 0,
                        yieldPrev: 0,
                        changeInYield: 0,
                      },
                    ],
                  },
                }))
              }
            >
              <Plus className="mr-1 size-4" />
              Add row
            </Button>
          </div>
          {ssa.bonds.map((row, idx) => (
            <div key={idx} className="grid gap-2 rounded-lg border border-white/10 p-3 md:grid-cols-8">
              <Input
                placeholder="Sovereign"
                className="md:col-span-2"
                value={row.sovereign}
                onChange={(e) => {
                  const next = [...ssa.bonds];
                  next[idx] = { ...row, sovereign: e.target.value };
                  setForm((f) => ({
                    ...f,
                    ssaEurobonds: { ...f.ssaEurobonds, bonds: next },
                  }));
                }}
              />
              <Input
                placeholder="Maturity"
                value={row.maturityDate}
                onChange={(e) => {
                  const next = [...ssa.bonds];
                  next[idx] = { ...row, maturityDate: e.target.value };
                  setForm((f) => ({
                    ...f,
                    ssaEurobonds: { ...f.ssaEurobonds, bonds: next },
                  }));
                }}
              />
              <NumInput
                placeholder="Coupon"
                value={row.coupon}
                onChange={(n) => {
                  const next = [...ssa.bonds];
                  next[idx] = { ...row, coupon: n };
                  setForm((f) => ({
                    ...f,
                    ssaEurobonds: { ...f.ssaEurobonds, bonds: next },
                  }));
                }}
              />
              <NumInput
                placeholder="TTM"
                value={row.ttm}
                onChange={(n) => {
                  const next = [...ssa.bonds];
                  next[idx] = { ...row, ttm: n };
                  setForm((f) => ({
                    ...f,
                    ssaEurobonds: { ...f.ssaEurobonds, bonds: next },
                  }));
                }}
              />
              <NumInput
                placeholder="Yield today"
                value={row.yieldToday}
                onChange={(n) => {
                  const next = [...ssa.bonds];
                  next[idx] = {
                    ...row,
                    yieldToday: n,
                    changeInYield: n - row.yieldPrev,
                  };
                  setForm((f) => ({
                    ...f,
                    ssaEurobonds: { ...f.ssaEurobonds, bonds: next },
                  }));
                }}
              />
              <NumInput
                placeholder="Yield prev"
                value={row.yieldPrev}
                onChange={(n) => {
                  const next = [...ssa.bonds];
                  next[idx] = {
                    ...row,
                    yieldPrev: n,
                    changeInYield: row.yieldToday - n,
                  };
                  setForm((f) => ({
                    ...f,
                    ssaEurobonds: { ...f.ssaEurobonds, bonds: next },
                  }));
                }}
              />
                    <NumInput
                placeholder="Δ"
                value={row.changeInYield}
                onChange={(n) => {
                  const next = [...ssa.bonds];
                  next[idx] = { ...row, changeInYield: n };
                  setForm((f) => ({
                    ...f,
                    ssaEurobonds: { ...f.ssaEurobonds, bonds: next },
                  }));
                }}
              />
              <Button
                type="button"
                variant="ghost"
                className="text-destructive"
                onClick={() =>
                  setForm((f) => ({
                    ...f,
                    ssaEurobonds: {
                      ...f.ssaEurobonds,
                      bonds: f.ssaEurobonds.bonds.filter((_, i) => i !== idx),
                    },
                  }))
                }
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
          <NarrativePair
            body={ssa.narrative.body}
            outlook={ssa.narrative.outlook}
            onBody={(body) =>
              setForm((f) => ({
                ...f,
                ssaEurobonds: {
                  ...f.ssaEurobonds,
                  narrative: { ...f.ssaEurobonds.narrative, body },
                },
              }))
            }
            onOutlook={(outlook) =>
              setForm((f) => ({
                ...f,
                ssaEurobonds: {
                  ...f.ssaEurobonds,
                  narrative: { ...f.ssaEurobonds.narrative, outlook },
                },
              }))
            }
          />
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger className="flex w-full items-center gap-2 border-b border-white/10 py-3 font-body text-label uppercase tracking-wide text-cyan-300">
          <ChevronDown className="size-4" />
          Local equities
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 py-4">
          <div className="grid gap-3 md:grid-cols-3">
            <FieldNum label="ASI level" value={eq.asiLevel} onChange={(n) => setForm((f) => ({ ...f, localEquities: { ...f.localEquities, asiLevel: n } }))} />
            <FieldNum label="ASI % chg" value={eq.asiChangePercent} onChange={(n) => setForm((f) => ({ ...f, localEquities: { ...f.localEquities, asiChangePercent: n } }))} />
            <FieldNum label="YTD %" value={eq.ytdReturn} onChange={(n) => setForm((f) => ({ ...f, localEquities: { ...f.localEquities, ytdReturn: n } }))} />
            <div>
              <Label>Market cap</Label>
              <Input className="mt-2" value={eq.marketCap ?? ""} onChange={(e) => setForm((f) => ({ ...f, localEquities: { ...f.localEquities, marketCap: e.target.value || undefined } }))} />
            </div>
            <div>
              <Label>Turnover</Label>
              <Input className="mt-2" value={eq.turnoverValue ?? ""} onChange={(e) => setForm((f) => ({ ...f, localEquities: { ...f.localEquities, turnoverValue: e.target.value || undefined } }))} />
            </div>
            <div>
              <Label>Volume</Label>
              <Input className="mt-2" value={eq.volumeTraded ?? ""} onChange={(e) => setForm((f) => ({ ...f, localEquities: { ...f.localEquities, volumeTraded: e.target.value || undefined } }))} />
            </div>
            <FieldNum label="Breadth ratio" value={eq.marketBreadthRatio} onChange={(n) => setForm((f) => ({ ...f, localEquities: { ...f.localEquities, marketBreadthRatio: n } }))} />
            <FieldNum label="Gainers" value={eq.gainers} onChange={(n) => setForm((f) => ({ ...f, localEquities: { ...f.localEquities, gainers: n } }))} />
            <FieldNum label="Losers" value={eq.losers} onChange={(n) => setForm((f) => ({ ...f, localEquities: { ...f.localEquities, losers: n } }))} />
          </div>
          <EquityTable
            label="Top gainers"
            rows={eq.topGainers}
            onChange={(rows) =>
              setForm((f) => ({ ...f, localEquities: { ...f.localEquities, topGainers: rows } }))
            }
          />
          <EquityTable
            label="Top losers"
            rows={eq.topLosers}
            onChange={(rows) =>
              setForm((f) => ({ ...f, localEquities: { ...f.localEquities, topLosers: rows } }))
            }
          />
          <NarrativePair
            body={eq.narrative.body}
            outlook={eq.narrative.outlook}
            onBody={(body) =>
              setForm((f) => ({
                ...f,
                localEquities: {
                  ...f.localEquities,
                  narrative: { ...f.localEquities.narrative, body },
                },
              }))
            }
            onOutlook={(outlook) =>
              setForm((f) => ({
                ...f,
                localEquities: {
                  ...f.localEquities,
                  narrative: { ...f.localEquities.narrative, outlook },
                },
              }))
            }
          />
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger className="flex w-full items-center gap-2 border-b border-white/10 py-3 font-body text-label uppercase tracking-wide text-cyan-300">
          <ChevronDown className="size-4" />
          Global markets
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 py-4">
          <div className="flex items-center gap-2">
            <input
              id="intraday"
              type="checkbox"
              checked={gl.isIntradayNote ?? false}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  globalMarkets: {
                    ...f.globalMarkets,
                    isIntradayNote: e.target.checked || undefined,
                  },
                }))
              }
            />
            <Label htmlFor="intraday" className="font-normal">
              Intraday note
            </Label>
          </div>
          <div className="flex justify-end">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() =>
                setForm((f) => ({
                  ...f,
                  globalMarkets: {
                    ...f.globalMarkets,
                    indices: [
                      ...f.globalMarkets.indices,
                      {
                        region: "",
                        index: "",
                        open: 0,
                        closeOrIntraday: 0,
                        changePercent: 0,
                      },
                    ],
                  },
                }))
              }
            >
              <Plus className="mr-1 size-4" />
              Add index
            </Button>
          </div>
          {gl.indices.map((row, idx) => (
            <div key={idx} className="grid gap-2 rounded-lg border border-white/10 p-3 md:grid-cols-7">
              <Input
                placeholder="Region"
                value={row.region}
                onChange={(e) => {
                  const next = [...gl.indices];
                  next[idx] = { ...row, region: e.target.value };
                  setForm((f) => ({
                    ...f,
                    globalMarkets: { ...f.globalMarkets, indices: next },
                  }));
                }}
              />
              <Input
                placeholder="Index"
                className="md:col-span-2"
                value={row.index}
                onChange={(e) => {
                  const next = [...gl.indices];
                  next[idx] = { ...row, index: e.target.value };
                  setForm((f) => ({
                    ...f,
                    globalMarkets: { ...f.globalMarkets, indices: next },
                  }));
                }}
              />
              <NumInput
                placeholder="Open"
                value={row.open}
                onChange={(n) => {
                  const next = [...gl.indices];
                  next[idx] = { ...row, open: n };
                  setForm((f) => ({
                    ...f,
                    globalMarkets: { ...f.globalMarkets, indices: next },
                  }));
                }}
              />
              <NumInput
                placeholder="Close / intraday"
                value={row.closeOrIntraday}
                onChange={(n) => {
                  const next = [...gl.indices];
                  next[idx] = { ...row, closeOrIntraday: n };
                  setForm((f) => ({
                    ...f,
                    globalMarkets: { ...f.globalMarkets, indices: next },
                  }));
                }}
              />
              <NumInput
                placeholder="% chg"
                value={row.changePercent}
                onChange={(n) => {
                  const next = [...gl.indices];
                  next[idx] = { ...row, changePercent: n };
                  setForm((f) => ({
                    ...f,
                    globalMarkets: { ...f.globalMarkets, indices: next },
                  }));
                }}
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={row.isIntraday ?? false}
                  onChange={(e) => {
                    const next = [...gl.indices];
                    next[idx] = {
                      ...row,
                      isIntraday: e.target.checked || undefined,
                    };
                    setForm((f) => ({
                      ...f,
                      globalMarkets: { ...f.globalMarkets, indices: next },
                    }));
                  }}
                />
                <span className="text-xs text-zinc-500">Intraday</span>
              </div>
              <Button
                type="button"
                variant="ghost"
                className="text-destructive"
                onClick={() =>
                  setForm((f) => ({
                    ...f,
                    globalMarkets: {
                      ...f.globalMarkets,
                      indices: f.globalMarkets.indices.filter((_, i) => i !== idx),
                    },
                  }))
                }
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
          <NarrativePair
            body={gl.narrative.body}
            outlook={gl.narrative.outlook}
            onBody={(body) =>
              setForm((f) => ({
                ...f,
                globalMarkets: {
                  ...f.globalMarkets,
                  narrative: { ...f.globalMarkets.narrative, body },
                },
              }))
            }
            onOutlook={(outlook) =>
              setForm((f) => ({
                ...f,
                globalMarkets: {
                  ...f.globalMarkets,
                  narrative: { ...f.globalMarkets.narrative, outlook },
                },
              }))
            }
          />
        </CollapsibleContent>
      </Collapsible>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete market report</DialogTitle>
          </DialogHeader>
          <p className="font-body text-body">This action cannot be undone.</p>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={() => void remove()}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

function NarrativePair({
  body,
  outlook,
  onBody,
  onOutlook,
}: {
  body: string;
  outlook: string;
  onBody: (v: string) => void;
  onOutlook: (v: string) => void;
}): ReactElement {
  return (
    <div className="grid gap-2 md:grid-cols-2">
      <div>
        <Label>Narrative — body</Label>
        <Textarea className="mt-2" value={body} onChange={(e) => onBody(e.target.value)} />
      </div>
      <div>
        <Label>Narrative — outlook</Label>
        <Textarea
          className="mt-2"
          value={outlook}
          onChange={(e) => onOutlook(e.target.value)}
        />
      </div>
    </div>
  );
}

function FieldNum({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: number;
  onChange: (n: number | undefined) => void;
}): ReactElement {
  return (
    <div>
      <Label>{label}</Label>
      <Input
        type="number"
        step="any"
        className="mt-2"
        value={value === undefined ? "" : String(value)}
        onChange={(e) => {
          const v = e.target.value;
          if (v === "") {
            onChange(undefined);
            return;
          }
          const n = Number(v);
          if (!Number.isNaN(n)) onChange(n);
        }}
      />
    </div>
  );
}

function EquityTable({
  label,
  rows,
  onChange,
}: {
  label: string;
  rows: { ticker: string; open: number; close: number; changePercent: number }[];
  onChange: (r: typeof rows) => void;
}): ReactElement {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs uppercase text-zinc-500">{label}</span>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() =>
            onChange([
              ...rows,
              { ticker: "", open: 0, close: 0, changePercent: 0 },
            ])
          }
        >
          <Plus className="mr-1 size-4" />
          Add
        </Button>
      </div>
      {rows.map((row, idx) => (
        <div key={idx} className="mb-2 grid gap-2 rounded border border-white/10 p-2 md:grid-cols-5">
          <Input
            placeholder="Ticker"
            value={row.ticker}
            onChange={(e) => {
              const next = [...rows];
              next[idx] = { ...row, ticker: e.target.value };
              onChange(next);
            }}
          />
          <NumInput
            placeholder="Open"
            value={row.open}
            onChange={(n) => {
              const next = [...rows];
              next[idx] = { ...row, open: n };
              onChange(next);
            }}
          />
          <NumInput
            placeholder="Close"
            value={row.close}
            onChange={(n) => {
              const next = [...rows];
              next[idx] = { ...row, close: n };
              onChange(next);
            }}
          />
          <NumInput
            placeholder="% chg"
            value={row.changePercent}
            onChange={(n) => {
              const next = [...rows];
              next[idx] = { ...row, changePercent: n };
              onChange(next);
            }}
          />
          <Button
            type="button"
            variant="ghost"
            className="text-destructive"
            onClick={() => onChange(rows.filter((_, i) => i !== idx))}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}

function FgnBondRowEditor({
  row,
  onChange,
  onRemove,
}: {
  row: {
    maturityDate: string;
    coupon: number;
    ttm: number;
    yieldToday: number;
    yieldPrev: number;
    changeInYield: number;
  };
  onChange: (r: typeof row) => void;
  onRemove: () => void;
}): ReactElement {
  return (
    <div className="grid gap-2 rounded-lg border border-white/10 p-3 md:grid-cols-7">
      <Input
        placeholder="Maturity"
        value={row.maturityDate}
        onChange={(e) => onChange({ ...row, maturityDate: e.target.value })}
      />
      <NumInput
        placeholder="Coupon"
        value={row.coupon}
        onChange={(n) => onChange({ ...row, coupon: n })}
      />
      <NumInput placeholder="TTM" value={row.ttm} onChange={(n) => onChange({ ...row, ttm: n })} />
      <NumInput
        placeholder="Yield today"
        value={row.yieldToday}
        onChange={(n) =>
          onChange({ ...row, yieldToday: n, changeInYield: n - row.yieldPrev })
        }
      />
      <NumInput
        placeholder="Yield prev"
        value={row.yieldPrev}
        onChange={(n) =>
          onChange({ ...row, yieldPrev: n, changeInYield: row.yieldToday - n })
        }
      />
      <NumInput
        placeholder="Δ"
        value={row.changeInYield}
        onChange={(n) => onChange({ ...row, changeInYield: n })}
      />
      <Button type="button" variant="ghost" className="text-destructive" onClick={onRemove}>
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}
