"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/content/work";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-4 mb-3">
        <h2 className="text-xl font-sans font-semibold text-text-primary">
          {project.title}
        </h2>
        {project.url && (
          <Link
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-tertiary hover:text-accent transition-colors shrink-0"
          >
            <ExternalLink size={16} />
          </Link>
        )}
      </div>
      <p className="text-sm font-sans text-text-secondary leading-relaxed mb-4">
        {project.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
        <span className="text-xs font-sans text-text-tertiary">{project.year}</span>
      </div>
    </Card>
  );
}
