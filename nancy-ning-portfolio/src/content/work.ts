export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  url?: string;
  year: string;
}

export const projects: Project[] = [];
