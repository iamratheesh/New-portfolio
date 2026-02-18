import { skills } from '@/data/skills';

export function SkillsSection() {
  return (
    <section className="section">
      <div className="container">
        <h2>Skills</h2>

        <ul className="skills-grid">
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
