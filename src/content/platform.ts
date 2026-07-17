export const navItems = [
  "Dashboard",
  "Learning Path",
  "Knowledge Library",
  "Frameworks",
  "Conversations",
  "Practice",
  "Progress",
] as const;

export const competencyAreas = [
  { label: "Discovery", value: 68 },
  { label: "Emotional Drivers", value: 54 },
  { label: "Commercial Reframe", value: 47 },
  { label: "Negotiation", value: 38 },
  { label: "Coaching", value: 44 },
];

export const productWarnings = [
  "The source DOCX jumps from Chapter 5 to Chapter 7; the content model preserves source numbering.",
  "Several later DOCX sections use Heading 1 for sub-sections, so the extractor treats chapter headings by title pattern instead of style alone.",
  "MVP progress and reflection state are local-first; production should move these to Supabase once authentication is introduced.",
];
