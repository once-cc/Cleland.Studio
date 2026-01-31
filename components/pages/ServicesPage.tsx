import React from 'react';

const pillars = [
    {
        title: "Brand & Positioning",
        purpose: "Defining the core narrative.",
        capabilities: ["Strategic Narrative", "Visual Identity Systems", "Market Positioning", "Tone of Voice"],
        outcome: "Authority established"
    },
    {
        title: "Experience & Digital Design",
        purpose: "Translating brand into behavior.",
        capabilities: ["UX Research & Strategy", "UI & Interface Design", "Interaction Design", "Design Systems"],
        outcome: "Friction removed"
    },
    {
        title: "Product & Platform Design",
        purpose: "Building tools that serve users.",
        capabilities: ["SaaS Architecture", "Web Applications", "Mobile App Design", "Complex User Flows"],
        outcome: "Utility maximized"
    },
    {
        title: "Build & Implementation",
        purpose: "Execution without compromise.",
        capabilities: ["Frontend Development", "Headless CMS", "Performance Optimization", "Technical SEO"],
        outcome: "System stability"
    },
    {
        title: "Growth Systems & Automation",
        purpose: "Scaling efficiently.",
        capabilities: ["CRM Architecture", "Email Automation", "Lead Scoring", "Analytics & Reporting"],
        outcome: "Revenue automated"
    }
];

const matrixRows = [
    { label: "Strategic Roadmap & Audit", sprint: "●", retainer: "●", advisory: "●" },
    { label: "Visual Identity System", sprint: "●", retainer: "○", advisory: "—" },
    { label: "High-Fidelity UI/UX", sprint: "●", retainer: "●", advisory: "—" },
    { label: "Frontend Architecture", sprint: "●", retainer: "●", advisory: "—" },
    { label: "CMS Integration", sprint: "●", retainer: "●", advisory: "—" },
    { label: "Performance Optimization", sprint: "●", retainer: "●", advisory: "○" },
    { label: "Analytics & Event Tracking", sprint: "●", retainer: "●", advisory: "○" },
    { label: "A/B Testing & Experiments", sprint: "—", retainer: "●", advisory: "—" },
    { label: "Weekly Growth Reporting", sprint: "—", retainer: "●", advisory: "—" },
];

const Symbol: React.FC<{ type: string }> = ({ type }) => {
    if (type === "●") return <span className="text-gold text-lg">●</span>;
    if (type === "○") return <span className="text-ivory/20 text-lg">○</span>;
    return <span className="text-ivory/20 text-lg">—</span>;
};

export const ServicesPage: React.FC = () => {
    return (
        <section className="min-h-screen bg-studio-bg pt-nav pb-20">
            <div className="max-w-[1400px] mx-auto h-full flex flex-col pt-8 md:pt-16 px-6 md:px-12">

                {/* Architectural Line */}
                <div className="w-full h-px bg-white/10 mb-8"></div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-12 mb-20 md:mb-32">

                    {/* Section Label */}
                    <div className="lg:col-span-12">
                        <span className="font-syne text-xs font-bold text-gold uppercase tracking-widest block pl-1">
                            Services
                        </span>
                    </div>

                    {/* Primary Heading - Visual Gravity */}
                    <div className="lg:col-span-7 relative">
                        <h1 className="font-domaine-narrow font-normal text-[48px] md:text-[72px] lg:text-[96px] leading-[1.05] tracking-[-0.64px] text-ivory select-none">
                            Services
                        </h1>
                    </div>

                    {/* Orientation Paragraph - Editorial Balance */}
                    <div className="lg:col-span-5 flex flex-col justify-end pb-2">
                        <div className="hidden lg:block w-full h-px bg-white/5 mb-8"></div>
                        <div className="lg:pl-8 border-l-0 lg:border-l border-gold/20 pt-6 lg:pt-0">
                            <p className="font-body text-xl md:text-2xl text-ivory/70 leading-relaxed font-light">
                                We design and build digital systems that clarify your offer, establish authority, and scale without noise.
                            </p>
                        </div>
                    </div>
                </div>

                {/* How We Engage Section */}
                <div className="w-full mb-32 md:mb-48">
                    <div className="w-full h-px bg-white/10 mb-12 hidden md:block"></div>
                    <div className="mb-8 md:mb-12">
                        <span className="font-syne text-xs font-bold text-ivory/40 uppercase tracking-widest pl-1">
                            How We Engage
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 border-t border-white/10 md:border-t-0">

                        {/* Model 01 */}
                        <div className="group border-b border-white/10 md:border-r md:last:border-r-0 py-12 md:py-0 md:pb-12 md:pr-12 flex flex-col justify-between min-h-[320px]">
                            <div>
                                <h3 className="font-cormorant text-3xl text-ivory mb-6">Project Sprint</h3>
                                <p className="font-body text-ivory/60 leading-relaxed max-w-sm">
                                    A defined scope of work with a clear beginning and end. Best for site builds, rebrands, or specific system implementations.
                                </p>
                            </div>
                            <div className="mt-8 pt-6 border-t border-white/5">
                                <span className="font-syne text-[10px] text-gold uppercase tracking-widest">
                                    Output: High-impact launch
                                </span>
                            </div>
                        </div>

                        {/* Model 02 */}
                        <div className="group border-b border-white/10 md:border-r md:last:border-r-0 py-12 md:py-0 md:pb-12 md:px-12 flex flex-col justify-between min-h-[320px]">
                            <div>
                                <h3 className="font-cormorant text-3xl text-ivory mb-6">Strategic Retainer</h3>
                                <p className="font-body text-ivory/60 leading-relaxed max-w-sm">
                                    Ongoing design and technical partnership. We become your dedicated digital product team, iterating and optimizing weekly.
                                </p>
                            </div>
                            <div className="mt-8 pt-6 border-t border-white/5">
                                <span className="font-syne text-[10px] text-gold uppercase tracking-widest">
                                    Output: Continuous growth
                                </span>
                            </div>
                        </div>

                        {/* Model 03 */}
                        <div className="group border-b border-white/10 md:border-r md:last:border-r-0 py-12 md:py-0 md:pb-12 md:pl-12 flex flex-col justify-between min-h-[320px]">
                            <div>
                                <h3 className="font-cormorant text-3xl text-ivory mb-6">System Advisory</h3>
                                <p className="font-body text-ivory/60 leading-relaxed max-w-sm">
                                    High-level guidance for internal teams. We audit, architect, and direct your strategy without executing the daily code.
                                </p>
                            </div>
                            <div className="mt-8 pt-6 border-t border-white/5">
                                <span className="font-syne text-[10px] text-gold uppercase tracking-widest">
                                    Output: Executive clarity
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-px bg-white/10 mt-0 md:mt-12 hidden md:block"></div>
                </div>

                {/* Pillars Section */}
                <div className="w-full mb-32">
                    <div className="mb-12">
                        <span className="font-syne text-xs font-bold text-ivory/40 uppercase tracking-widest">
                            Core Capabilities
                        </span>
                    </div>

                    <div className="border-t border-white/10">
                        {pillars.map((pillar, i) => (
                            <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-y-10 gap-x-8 py-12 md:py-16 border-b border-white/10 group hover:bg-white/[0.02] transition-colors duration-500">
                                <div className="md:col-span-4">
                                    <h3 className="font-cormorant text-4xl md:text-5xl text-ivory font-light group-hover:text-gold transition-colors duration-300">
                                        {pillar.title}
                                    </h3>
                                </div>
                                <div className="md:col-span-5 flex flex-col justify-between">
                                    <p className="font-body text-lg md:text-xl text-ivory/70 italic mb-8 font-light">
                                        {pillar.purpose}
                                    </p>
                                    <ul className="space-y-3">
                                        {pillar.capabilities.map((cap) => (
                                            <li key={cap} className="font-syne text-[11px] text-ivory/50 uppercase tracking-widest flex items-start gap-3">
                                                <span className="w-1 h-1 bg-gold rounded-full opacity-60 mt-[0.4em] shrink-0"></span>
                                                <span>{cap}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="md:col-span-3 md:text-right flex flex-col justify-end pt-4 md:pt-0">
                                    <div className="inline-block md:block">
                                        <span className="font-syne text-[10px] text-gold uppercase tracking-widest opacity-80 border border-gold/20 px-3 py-2 rounded-sm">
                                            Outcome: {pillar.outcome}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Deliverables Matrix */}
                <div className="w-full mb-32">
                    <div className="mb-12">
                        <span className="font-syne text-xs font-bold text-ivory/40 uppercase tracking-widest">
                            Deliverables Matrix
                        </span>
                    </div>

                    {/* Legend */}
                    <div className="flex flex-wrap gap-8 mb-8 border-b border-white/5 pb-8 pl-1">
                        <div className="flex items-center gap-3">
                            <span className="text-gold text-lg">●</span>
                            <span className="font-syne text-[10px] text-ivory/50 uppercase tracking-widest">Included</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-ivory/20 text-lg">○</span>
                            <span className="font-syne text-[10px] text-ivory/50 uppercase tracking-widest">Optional</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-ivory/20 text-lg">—</span>
                            <span className="font-syne text-[10px] text-ivory/50 uppercase tracking-widest">Not Included</span>
                        </div>
                    </div>

                    {/* Matrix Table */}
                    <div className="overflow-x-auto pb-4">
                        <div className="min-w-[800px]">
                            {/* Header Row */}
                            <div className="grid grid-cols-4 border-b border-white/10 pb-6 px-4">
                                <div className="col-span-1"></div>
                                <div className="col-span-1 text-center font-cormorant text-2xl text-ivory">Project Sprint</div>
                                <div className="col-span-1 text-center font-cormorant text-2xl text-ivory">Strategic Retainer</div>
                                <div className="col-span-1 text-center font-cormorant text-2xl text-ivory">System Advisory</div>
                            </div>

                            {/* Rows */}
                            {matrixRows.map((row, i) => (
                                <div key={i} className="grid grid-cols-4 py-6 border-b border-white/5 items-center hover:bg-white/[0.02] transition-colors px-4">
                                    <div className="col-span-1 font-body text-sm text-ivory/70 whitespace-nowrap">{row.label}</div>
                                    <div className="col-span-1 flex justify-center">
                                        <Symbol type={row.sprint} />
                                    </div>
                                    <div className="col-span-1 flex justify-center">
                                        <Symbol type={row.retainer} />
                                    </div>
                                    <div className="col-span-1 flex justify-center">
                                        <Symbol type={row.advisory} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Qualification Section */}
                <div className="w-full mb-20">
                    <div className="w-full h-px bg-white/10 mb-12"></div>
                    <div className="mb-12">
                        <span className="font-syne text-xs font-bold text-ivory/40 uppercase tracking-widest">
                            Qualification Criteria
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16 md:gap-y-12">

                        {/* Column 1: Alignment */}
                        <div>
                            <h4 className="font-cormorant text-3xl text-ivory mb-8">Strategic Alignment</h4>
                            <ul className="space-y-6">
                                {[
                                    "Organizations valuing long-term system stability over short-term trends.",
                                    "Decision makers with authority to approve architectural changes.",
                                    "Budgets allocated for both implementation and ongoing optimization.",
                                    "A desire to establish category leadership through design fidelity."
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <span className="w-1 h-1 bg-gold rounded-full mt-2.5 shrink-0"></span>
                                        <span className="font-body text-lg text-ivory/70 font-light leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 2: Misalignment */}
                        <div className="md:pl-16 md:border-l border-white/10">
                            <h4 className="font-cormorant text-3xl text-ivory/50 mb-8">Non-Engagement Factors</h4>
                            <ul className="space-y-6">
                                {[
                                    "Requests for speculative work or unpaid pitching.",
                                    "Timelines under 4 weeks for full system deployment.",
                                    "Micro-management of the design execution process.",
                                    "Focus on lowest-cost execution rather than highest-value output."
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <span className="w-1 h-1 bg-ivory/20 rounded-full mt-2.5 shrink-0"></span>
                                        <span className="font-body text-lg text-ivory/40 font-light leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};