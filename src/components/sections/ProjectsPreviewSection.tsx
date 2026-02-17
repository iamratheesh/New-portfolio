import Link from 'next/link';
import { projects } from '@/data/projects';

export function ProjectsPreviewSection() {
  return (
    <section className="section">
      <div className="container">
        <h2>Projects</h2>

        <div className="projects-grid">
          {projects.slice(0, 3).map((project) => (
            <div key={project.id} className="card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          ))}
        </div>

        <Link href="/projects" className="btn btn-outline">
          View All
        </Link>
      </div>
    </section>
  );
}
