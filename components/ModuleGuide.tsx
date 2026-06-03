"use client";

import React, { useEffect, useState, useRef } from "react";
import mermaid from "mermaid";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Maximize2, X } from "lucide-react";

// --- FLOWCHART DEFINITIONS ---
// Keys match the `id` field in erpSolutions from data.tsx
const FLOWCHARTS: Record<string, string> = {
    "default": `
        graph TD
          Start([Start]) --> Process[Process]
          Process --> End([End])
    `,

    // ── HRMS ──────────────────────────────────────────────────────────────
    "hrms": `
        graph TD
          subgraph Recruitment ["🔍 Recruitment"]
            JD[Job Posting] --> AI[AI Resume Scanner]
            AI --> |Shortlist| SC[AI Calling Agent]
            SC --> |Qualified| IV[Interview Scheduled]
            SC --> |Rejected| TR[Talent Pool]
            IV --> OF[Offer Letter]
          end
          subgraph Onboarding ["📋 Onboarding"]
            OF --> EMP[Employee Created]
            EMP --> DOC[Document Collection]
            DOC --> ACC[Account & Access Setup]
          end
          subgraph Daily_Ops ["⏱️ Daily Operations"]
            ACC --> ATT{Attendance}
            ATT --> |Face + Geo-Tag| PR[Present]
            ATT --> |Absent/Late| AL[Alert to Manager]
            PR --> LV[Leave Management]
          end
          subgraph Payroll ["💰 Payroll"]
            LV --> PAY[Payroll Engine]
            AL --> PAY
            PAY --> |PF · ESIC · TDS| SLIP[Salary Slip]
            SLIP --> BANK[Bank Transfer]
            SLIP --> COMP[Compliance Report]
          end
          style AI fill:#e1f5fe,stroke:#01579b,stroke-width:2px
          style SC fill:#e1f5fe,stroke:#01579b,stroke-width:2px
          style ATT fill:#fff9c4,stroke:#fbc02d,stroke-width:2px,stroke-dasharray:5 5
          style BANK fill:#e8f5e9,stroke:#2e7d32,stroke-width:3px
    `,

    // ── ACCOUNTS & BILLING ────────────────────────────────────────────────
    "accounts-billing": `
        graph TD
          subgraph Sales ["🛒 Sales"]
            SO[Sales Order] --> INV[Sales Invoice]
            INV --> |GST Calculation| EINV[E-Invoice / E-Way Bill]
          end
          subgraph Payments ["💳 Payments"]
            EINV --> PAY{Payment Received?}
            PAY -- Yes --> PE[Payment Entry]
            PAY -- No --> REM[Auto Reminder]
            REM --> PAY
            PE --> RECON[Bank Reconciliation]
          end
          subgraph Purchases ["📦 Purchases"]
            PO[Purchase Order] --> BILL[Vendor Bill]
            BILL --> EXP[Expense Tracker]
            EXP --> RECON
          end
          subgraph Reporting ["📊 Reporting"]
            RECON --> GL[General Ledger]
            GL --> PL[P&L Statement]
            GL --> BS[Balance Sheet]
            GL --> CF[Cash Flow Report]
          end
          style INV fill:#e1f5fe,stroke:#01579b,stroke-width:2px
          style PAY fill:#fff9c4,stroke:#fbc02d,stroke-width:2px,stroke-dasharray:5 5
          style GL fill:#f3e5f5,stroke:#6a1b9a,stroke-width:2px
          style PL fill:#e8f5e9,stroke:#2e7d32,stroke-width:3px
    `,

    // ── PROJECT MANAGER ───────────────────────────────────────────────────
    "project-manager": `
        graph TD
          subgraph Initiation ["🚀 Initiation"]
            REQ[Requirements] --> PLAN[Project Plan]
            PLAN --> MILE[Milestones Defined]
            MILE --> RES[Resource Allocation]
          end
          subgraph Execution ["⚙️ Execution"]
            RES --> TASK[Task Assignment]
            TASK --> PROG[Progress Tracking]
            PROG --> RISK{Risk Detected?}
            RISK -- Yes --> AI[AI Alert & Forecast]
            AI --> MAN[Manager Review]
            MAN --> TASK
            RISK -- No --> PROG
          end
          subgraph Integration ["🔗 Integrations"]
            PROG --> HRM[HRMS Module]
            PROG --> ACC[Accounts Module]
            PROG --> INV[Inventory Module]
          end
          subgraph Closure ["✅ Closure"]
            ACC --> REP[Project P&L Report]
            REP --> CL[Project Closed]
            CL --> KPI[KPI Dashboard]
          end
          style RISK fill:#fff9c4,stroke:#fbc02d,stroke-width:2px,stroke-dasharray:5 5
          style AI fill:#e1f5fe,stroke:#01579b,stroke-width:2px
          style CL fill:#e8f5e9,stroke:#2e7d32,stroke-width:3px
    `,

    // ── LABOUR MANAGEMENT ─────────────────────────────────────────────────
    "labour-management": `
        graph TD
          subgraph Onboarding ["📝 Worker Onboarding"]
            WO[Worker Registration] --> VER[ID Verification]
            VER --> SKILL[Skill Tagging]
            SKILL --> SITE[Site Assignment]
          end
          subgraph Attendance ["📍 Attendance"]
            SITE --> ATT{Daily Check-in}
            ATT --> |Geo-tag / Face| PRES[Mark Present]
            ATT --> |Absent| ABS[Absence Alert]
            PRES --> SHIFT[Shift & OT Tracking]
          end
          subgraph Wages ["💰 Wages"]
            SHIFT --> WAGE{Worker Type}
            WAGE --> |Daily Wager| DW[Daily Wage Calc]
            WAGE --> |Monthly| MW[Monthly Wage Calc]
            WAGE --> |Contract| CW[Contract Billing]
            DW & MW & CW --> COMP[Compliance Check\nPF · ESIC · BOCW]
            COMP --> PAY[Payment Transfer]
          end
          subgraph Analytics ["📊 Analytics"]
            PAY --> UTIL[Labour Utilization Report]
            ABS --> UTIL
            UTIL --> DASH[Management Dashboard]
          end
          style ATT fill:#fff9c4,stroke:#fbc02d,stroke-width:2px,stroke-dasharray:5 5
          style COMP fill:#fce4ec,stroke:#c62828,stroke-width:2px
          style PAY fill:#e8f5e9,stroke:#2e7d32,stroke-width:3px
    `,

    // ── PLANT & MACHINERY ─────────────────────────────────────────────────
    "plant-machinery": `
        graph TD
          subgraph Registration ["🏗️ Asset Registration"]
            AR[Asset Entry] --> SPEC[Specifications & Docs]
            SPEC --> ASSIGN[Assign to Project/Site]
          end
          subgraph Operations ["⚙️ Operations"]
            ASSIGN --> USE[Daily Usage Log]
            USE --> FUEL[Fuel Consumption]
            USE --> SPARE[Spare Parts Usage]
            USE --> GPS[GPS Location Tracking]
          end
          subgraph Maintenance ["🔧 Maintenance"]
            USE --> HEALTH{AI Health Check}
            HEALTH --> |Degraded| ALERT[Maintenance Alert]
            ALERT --> WO[Work Order Created]
            WO --> SER[Service Done]
            SER --> LOG[Maintenance Log]
            HEALTH --> |Healthy| USE
          end
          subgraph Costing ["💰 Costing"]
            FUEL --> COST[Machine Cost Sheet]
            SPARE --> COST
            LOG --> COST
            COST --> ACC[Post to Accounts]
            COST --> ROI[ROI & Utilization Report]
          end
          style HEALTH fill:#fff9c4,stroke:#fbc02d,stroke-width:2px,stroke-dasharray:5 5
          style ALERT fill:#fce4ec,stroke:#c62828,stroke-width:2px
          style ROI fill:#e8f5e9,stroke:#2e7d32,stroke-width:3px
    `,

    // ── CRM + AI AGENT ────────────────────────────────────────────────────
    "crm-ai-agent": `
        graph TD
          subgraph Lead_Capture ["📥 Lead Capture"]
            IG[Instagram] --> AGG[Lead Aggregator]
            LI[LinkedIn] --> AGG
            WEB[Website Form] --> AGG
            FB[Facebook] --> AGG
          end
          subgraph Qualification ["🤖 AI Qualification"]
            AGG --> AIC[AI Calling Agent]
            AIC --> |Conversation Analysis| SCORE{Lead Score}
            SCORE --> |Hot 🔥| HOT[Priority Queue]
            SCORE --> |Warm| WARM[Nurture Sequence]
            SCORE --> |Cold| COLD[Email Drip]
            WARM --> |Re-engaged| HOT
          end
          subgraph Sales ["💼 Sales Pipeline"]
            HOT --> OPP[Opportunity Created]
            OPP --> DEMO[Demo / Proposal]
            DEMO --> NEG{Negotiation}
            NEG -- Won --> SO[Sales Order → ERP]
            NEG -- Lost --> LOST[Lost Analysis]
          end
          subgraph ERP_Sync ["🔗 ERP Integration"]
            SO --> INV[Invoice Module]
            SO --> PROJ[Project Module]
            SO --> DASH[CRM Dashboard]
          end
          style AIC fill:#e1f5fe,stroke:#01579b,stroke-width:2px
          style SCORE fill:#fff9c4,stroke:#fbc02d,stroke-width:2px,stroke-dasharray:5 5
          style SO fill:#e8f5e9,stroke:#2e7d32,stroke-width:4px
    `,
};

// --- NODE DETAIL DEFINITIONS ---
const NODE_DETAILS: Record<string, { title: string; description: string; fields: string[] }> = {
    // HRMS nodes
    "AI Resume Scanner": { title: "AI Resume Scanner", description: "Automatically parses and scores resumes against job requirements using ML.", fields: ["Skills Match %", "Experience Years", "Education Level", "Shortlist Status"] },
    "AI Calling Agent": { title: "AI Calling Agent", description: "Conducts automated screening calls, records answers, and ranks candidates.", fields: ["Call Transcript", "Intent Score", "Questions Asked", "Recommendation"] },
    "Face + Geo-Tag": { title: "Face Recognition + Geo-Tag", description: "Dual-factor attendance: face ID + GPS location stamp.", fields: ["Employee ID", "GPS Coordinates", "Timestamp", "Device ID"] },
    "Salary Slip": { title: "Salary Slip", description: "Auto-generated slip with all deductions and net pay.", fields: ["Basic Pay", "HRA", "PF Deduction", "TDS", "Net Pay"] },

    // Accounts nodes
    "Sales Invoice": { title: "Sales Invoice", description: "GST-compliant invoice generated from a Sales Order.", fields: ["Invoice No.", "GSTIN", "Tax Breakdown", "Due Date"] },
    "Bank Reconciliation": { title: "Bank Reconciliation", description: "Auto-match bank statements with ledger entries.", fields: ["Bank Statement", "Unmatched Entries", "Reconciled Date"] },
    "P&L Statement": { title: "Profit & Loss", description: "Real-time profit and loss statement per period or project.", fields: ["Revenue", "COGS", "Gross Margin", "Net Profit"] },

    // CRM nodes
    "Lead Aggregator": { title: "Lead Aggregator", description: "Collects leads from all digital channels into one queue.", fields: ["Source Platform", "Lead Name", "Contact", "Timestamp"] },
    "AI Calling Agent (CRM)": { title: "AI Calling Agent", description: "Calls new leads instantly, qualifies intent, and scores them.", fields: ["Transcript", "Lead Score", "Intent Tags", "Follow-up Date"] },
    "Opportunity Created": { title: "Opportunity", description: "Qualified lead promoted to a sales opportunity.", fields: ["Expected Value", "Probability %", "Close Date", "Owner"] },
    "Sales Order → ERP": { title: "Sales Order", description: "Closed-won deal converted to a Sales Order and synced with ERP.", fields: ["Items", "Total Value", "Payment Terms", "Delivery Date"] },

    // Project nodes
    "Project Plan": { title: "Project Plan", description: "Detailed plan with tasks, timelines, and dependencies.", fields: ["Start Date", "End Date", "Budget", "Phase"] },
    "AI Alert & Forecast": { title: "AI Risk Alert", description: "Predicts delays or overruns and notifies the manager.", fields: ["Risk Type", "Probability", "Suggested Action", "Affected Tasks"] },

    // Plant nodes
    "AI Health Check": { title: "AI Health Check", description: "Analyzes sensor data to predict equipment failures.", fields: ["Vibration", "Temperature", "Run Hours", "Next Service Due"] },
    "ROI & Utilization Report": { title: "Utilization Report", description: "Tracks asset ROI and deployment efficiency.", fields: ["Hours Deployed", "Cost per Hour", "Idle Time", "ROI %"] },
};

interface ModuleGuideProps {
    solutionId: string;
}

export function ModuleGuide({ solutionId }: ModuleGuideProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [svgContent, setSvgContent] = useState<string>("");
    const [selectedNode, setSelectedNode] = useState<string | null>(null);
    const [isRendering, setIsRendering] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        mermaid.initialize({
            startOnLoad: false,
            theme: "default",
            securityLevel: "loose",
            fontFamily: "Inter, sans-serif",
            flowchart: {
                curve: "basis",
                padding: 20,
            },
        });
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        const renderDiagram = async () => {
            setIsRendering(true);
            setSvgContent("");

            // Key lookup: try exact match, then strip trailing variants
            const chart =
                FLOWCHARTS[solutionId] ??
                FLOWCHARTS[solutionId.replace(/-with-.*$/, "")] ??
                FLOWCHARTS["default"];

            // Mermaid requires a unique ID per render; use timestamp to avoid stale-ID collisions
            const renderId = `mermaid-${solutionId}-${Date.now()}`;

            try {
                const { svg } = await mermaid.render(renderId, chart.trim());
                setSvgContent(svg);
            } catch (e) {
                console.error("Mermaid render error:", e);
                setSvgContent(`<p style="color:red;padding:16px">Could not render flowchart for <strong>${solutionId}</strong>.</p>`);
            } finally {
                setIsRendering(false);
            }
        };

        renderDiagram();
    }, [isOpen, solutionId]);

    // Detect clicks on Mermaid-rendered SVG nodes
    const handleDiagramClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        const nodeEl = target.closest(".node");
        if (nodeEl) {
            const text = nodeEl.textContent?.trim() ?? "";
            const match = Object.keys(NODE_DETAILS).find((k) =>
                text.toLowerCase().includes(k.toLowerCase())
            );
            if (match) {
                setSelectedNode(match);
                return;
            }
        }
        setSelectedNode(null);
    };

    // Human-readable title for the dialog header
    const titleMap: Record<string, string> = {
        "hrms": "HRMS – HR & Payroll Flow",
        "accounts-billing": "Accounts & Billing Flow",
        "project-manager": "Project Management Flow",
        "labour-management": "Labour Management Flow",
        "plant-machinery": "Plant & Machinery Flow",
        "crm-ai-agent": "CRM with AI Agent Flow",
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <Maximize2 className="w-4 h-4" /> Interactive Guide
                </Button>
            </DialogTrigger>

            {/* Full-screen dialog */}
            <DialogContent className="max-w-[95vw] w-[95vw] h-[90vh] p-0 overflow-hidden flex flex-col bg-background/95 backdrop-blur-xl border-border/50">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border/50 shrink-0">
                    <div>
                        <DialogTitle className="text-xl font-bold">
                            {titleMap[solutionId] ?? `Process Flow: ${solutionId}`}
                        </DialogTitle>
                        <DialogDescription>
                            Click any node to see details about that step.
                        </DialogDescription>
                    </div>
                </div>

                {/* Body */}
                <div className="flex-1 relative overflow-hidden flex min-h-0">
                    {/* Main canvas */}
                    <div
                        ref={containerRef}
                        className="flex-1 overflow-auto p-8 flex items-start justify-center bg-grid-white/[0.02]"
                        onClick={handleDiagramClick}
                    >
                        {isRendering && (
                            <div className="flex items-center gap-2 text-muted-foreground mt-20">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                                Rendering diagram…
                            </div>
                        )}

                        {!isRendering && (
                            <div
                                className="w-full"
                                dangerouslySetInnerHTML={{ __html: svgContent }}
                            />
                        )}
                    </div>

                    {/* Sidebar – node details */}
                    {selectedNode && NODE_DETAILS[selectedNode] && (
                        <aside className="w-80 border-l border-border/50 p-6 bg-card/50 backdrop-blur-md overflow-y-auto animate-in slide-in-from-right duration-300 shrink-0">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-primary leading-tight">
                                    {NODE_DETAILS[selectedNode].title}
                                </h3>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setSelectedNode(null)}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>

                            <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                                {NODE_DETAILS[selectedNode].description}
                            </p>

                            <div>
                                <h4 className="font-semibold mb-3 text-xs uppercase tracking-wider text-muted-foreground">
                                    Key Fields
                                </h4>
                                <ul className="space-y-2">
                                    {NODE_DETAILS[selectedNode].fields.map((f, i) => (
                                        <li
                                            key={i}
                                            className="flex items-center gap-2 p-2 rounded-lg bg-background/50 border border-border/50 text-sm"
                                        >
                                            <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}