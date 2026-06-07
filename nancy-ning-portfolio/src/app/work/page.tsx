import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectGrid } from "@/components/work/ProjectGrid";
import { projects } from "@/content/work";

export const metadata: Metadata = {
  title: "Work",
  description: "Projects, experiments, and things I've built.",
};

export default function WorkPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
      <PageHeader
        title="Work"
        subtitle="Projects, experiments, and things I've built."
      />
      <ProjectGrid projects={projects} />
    </div>
  );
}
