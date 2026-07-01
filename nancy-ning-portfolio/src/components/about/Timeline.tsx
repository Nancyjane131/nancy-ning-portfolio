interface TimelineItem {
  year: string;
  title: string;
  subtitle?: string;
  organisation: string;
  description: string;
}

const timelineItems: TimelineItem[] = [
  {
    year: "2016–2020",
    title: "BSc in Computer Science",
    subtitle: "Double degree in English",
    organisation: "Beijing Normal University · Beijing",
    description:
      "Graduated with an 88/100 GPA, building a strong foundation in mathematics, programming, algorithms, and data structures—while standing at the intersection of science and art through a double degree in English.",
  },
  {
    year: "2020–2023",
    title: "Master in Business Analytics",
    organisation: "HKU · Hong Kong",
    description:
      "Graduated with a GPA of 3.7/4.3, awarded the HKU Merit Scholarship. Bridged quantitative methods with real-world business problems — data, decisions, and everything in between.",
  },
  {
    year: "2023–2024",
    title: "Junior Data Scientist",
    organisation: "Zurich Insurance · Hong Kong",
    description:
      "Applied data analysis, BI, machine learning, and AI automation to solve business problems from a data-driven perspective, bridging the gap between complex models and practical insurance challenges.",
  },
  {
    year: "2024–Now",
    title: "Senior Officer, Actuarial GenAI",
    organisation: "FWD Insurance · Hong Kong",
    description:
      "Provide end-to-end AI solutions across actuarial, product, and finance teams to enable enterprise AI transformation, bridging insurance business, data, and AI.",
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
            <div className="flex flex-col gap-0.5 mb-1">
              <div className="flex flex-row items-baseline gap-3">
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
              {item.subtitle && (
                <p className="text-xs font-sans text-text-tertiary pl-0 ml-0">
                  {item.subtitle}
                </p>
              )}
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
