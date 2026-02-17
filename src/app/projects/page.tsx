import { projects } from '@/data/projects';

export default function ProjectsPage() {
  return (
    <div>
      {projects.map((project) => (
        <div key={project.id}>{project.title}</div>
      ))}
    </div>
  );
}
