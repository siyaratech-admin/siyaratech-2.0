"use client";

import React, { useEffect, useState, useRef } from "react";
import mermaid from "mermaid";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Maximize2, X } from "lucide-react";

// --- FLOWCHART DEFINITIONS (Simplified for brevity, can be expanded) ---
const FLOWCHARTS: Record<string, string> = {
    "default": `
    graph TD
      Start --> Process
      Process --> End
  `,
    "crm-with-ai-agent": `
    graph TD
      subgraph Lead_Capture ["Lead Capture"]
        L[Web Form] --> P[Prospect]
        C[Chatbot] --> P
      end
      subgraph Qualification ["Qualification"]
        P --> |AI Scoring| Q{Qualified?}
        Q -- Yes --> O[Opportunity]
        Q -- No --> N[Nurture]
        N --> |Email Drip| P
      end
      subgraph Sales ["Sales Pipeline"]
        O --> |Negotiation| D{Deal Won?}
        D -- Yes --> S[Sales Order]
        D -- No --> L2[Lost Logic]
      end
      style L fill:#e1f5fe,stroke:#01579b,stroke-width:2px
      style Q fill:#fff9c4,stroke:#fbc02d,stroke-width:2px,stroke-dasharray: 5 5
      style S fill:#e8f5e9,stroke:#2e7d32,stroke-width:4px
  `,
    "accounts-billing": `
      graph TD
      subgraph Sales
      SO[Sales Order] --> INV[Sales Invoice]
      end
      subgraph Payments
      INV --> PAY[Payment Entry]
      PAY --> |Reconcile| GL[General Ledger]
      end
      style INV fill:#e1f5fe,stroke:#01579b
  `,
    "hr-payroll": `
      graph TD
      EMP[Employee] --> ATT[Attendance]
      ATT --> PAY[Payroll Entry]
      PAY --> SLIP[Salary Slip]
      SLIP --> BANK[Bank Transfer]
   `
};

const NODE_DETAILS: Record<string, { title: string; description: string; fields: string[] }> = {
    "Web Form": { title: "Web Form", description: "Capture leads directly from your website.", fields: ["Name", "Email", "Phone", "Interest"] },
    "Chatbot": { title: "AI Chatbot", description: "24/7 AI agent collecting visitor info.", fields: ["Transcript", "Intent", "Contact Info"] },
    "Prospect": { title: "Prospect", description: "Initial lead record in CRM.", fields: ["Status", "Source", "Owner"] },
    "Opportunity": { title: "Opportunity", description: "Qualified lead with potential deal value.", fields: ["Expected Revenue", "Probability", "Close Date"] },
    "Sales Order": { title: "Sales Order", description: "Confirmed order from customer.", fields: ["Items", "Taxes", "Total"] },
};

interface ModuleGuideProps {
    solutionId: string;
}

export function ModuleGuide({ solutionId }: ModuleGuideProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [svgContent, setSvgContent] = useState<string>("");
    const [selectedNode, setSelectedNode] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        mermaid.initialize({
            startOnLoad: false,
            theme: "default",
            securityLevel: "loose",
            fontFamily: "Inter, sans-serif",
        });
    }, []);

    useEffect(() => {
        const renderDiagram = async () => {
            const chart = FLOWCHARTS[solutionId] || FLOWCHARTS["default"];
            try {
                const { svg } = await mermaid.render(`mermaid-${solutionId}`, chart);
                setSvgContent(svg);
            } catch (e) {
                console.error("Mermaid render error:", e);
                setSvgContent("Error rendering flowchart.");
            }
        };

        if (isOpen) {
            renderDiagram();
        }
    }, [isOpen, solutionId]);

    // Click handler to detect node clicks (using event delegation on SVG)
    const handleDiagramClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        // Walk up to find a node group
        const node = target.closest(".node");
        if (node) {
            // Extract text content or ID to find details
            // Mermaid nodes usually contain text. Ideally we parse ID.
            // For this demo, we'll try to match text content approx or ID.
            // In valid mermaid rendered SVG, nodes have IDs like 'flowchart-L-235'.
            // We can use the Text content as a key for simplicity here.
            const text = node.textContent?.trim();
            if (text && NODE_DETAILS[text]) {
                setSelectedNode(text);
            } else {
                // Fallback or clear
                // console.log("Clicked node:", text); 
            }
        } else {
            // Deselect if clicking background
            setSelectedNode(null);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <Maximize2 className="w-4 h-4" /> Interactive Guide
                </Button>
            </DialogTrigger>
            {/* Full Screen Content */}
            <DialogContent className="max-w-[95vw] w-[95vw] h-[90vh] p-0 overflow-hidden flex flex-col bg-background/95 backdrop-blur-xl border-border/50">
                <div className="flex items-center justify-between p-4 border-b border-border/50">
                    <div>
                        <DialogTitle className="text-xl font-bold">Process Flow: {solutionId}</DialogTitle>
                        <DialogDescription>Interactive module workflow guide.</DialogDescription>
                    </div>
                    {/* Close is handled by Dialog primitives usually, but we can add custom if needed */}
                </div>

                <div className="flex-1 relative overflow-hidden flex">
                    {/* Main Canvas */}
                    <div
                        ref={containerRef}
                        className="flex-1 overflow-auto p-8 cursor-grab flex items-center justify-center bg-grid-white/[0.02]"
                        onClick={handleDiagramClick}
                        dangerouslySetInnerHTML={{ __html: svgContent }}
                    />

                    {/* Sidebar Details */}
                    {selectedNode && NODE_DETAILS[selectedNode] && (
                        <div className="w-80 border-l border-border/50 p-6 bg-card/50 backdrop-blur-md overflow-y-auto animate-in slide-in-from-right duration-300">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-bold text-primary">{NODE_DETAILS[selectedNode].title}</h3>
                                <Button variant="ghost" size="icon" onClick={() => setSelectedNode(null)}><X className="w-4 h-4" /></Button>
                            </div>
                            <p className="text-muted-foreground mb-6 leading-relaxed">{NODE_DETAILS[selectedNode].description}</p>

                            <div>
                                <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">Key Fields</h4>
                                <ul className="space-y-2">
                                    {NODE_DETAILS[selectedNode].fields.map((f, i) => (
                                        <li key={i} className="flex items-center gap-2 p-2 rounded-lg bg-background/50 border border-border/50">
                                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
