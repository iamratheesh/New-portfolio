import { experience } from '@/data/experience';

export function ExperienceSection() {
  return (
    <section className="section">
      <div className="container">
        <h2>Experience</h2>

        {experience.map((exp, index) => (
          <div key={index} className="experience-item">
            <h3>{exp.role}</h3>
            <p>{exp.company}</p>
            <span>{exp.period}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
