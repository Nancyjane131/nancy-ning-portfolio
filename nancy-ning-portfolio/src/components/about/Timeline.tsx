interface TimelineItem {
  year: string;
  title: string;
  organisation: string;
  description: string;
}

const timelineItems: TimelineItem[] = [
  {
    year: "2020",
    title: "BSc Mathematics & Statistics",
    organisation: "University of Edinburgh",
    description:
      "Studied probability, statistical inference, and mathematical modelling. First exposure to data science and machine learning.",
  },
  {
    year: "2021",
    title: "Data Analyst",
    organisation: "Insurance Industry",
    description:
      "Started working with structured insurance data — pricing models, claims analytics, and actuarial reporting.",
  },
  {
    year: "2023",
    title: "AI & Data Specialist",
    organisation: "Insurance Industry",
    description:
      "Moved into applying AI and large language models to business problems. Bridging the gap between technical capability and organisational need.",
  },
  {
    year: "2025",
    title: "Building in public",
    organisation: "This portfolio",
    description:
      "Thinking through ideas on AI, data, and how organisations change. Writing to make thinking visible.",
  },
];

export function Timeline() {
  return (
    <div className="relative">
      <div className="absolute left-[7px] top-2 bottom-0 w-px bg-border" />
      <ul className="space-y-10">
        {timelineItems.map((item, index) => (
          <li key={index} className="relative pl-8">
            <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-accent bg-background" />
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-1">
              <span className="text-sm font-sans font-medium text-accent">
                {item.year}
              </span>
              <h3 className="text-base font-sans font-semibold text-text-primary">
                {item.title}
              </h3>
              <span className="text-sm font-sans text-text-secondary">
                · {item.organisation}
              </span>
            </div>
            <p className="text-sm font-sans text-text-secondary leading-relaxed">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
