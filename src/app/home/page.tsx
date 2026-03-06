import { HeroSection } from '@/features/home/HeroSection';
import { SkillsSection } from '@/features/home/SkillsSection';
import { ProjectsPreviewSection } from '@/features/home/ProjectsPreviewSection';
import { ExperienceSection } from '@/features/home/ExperienceSection';
import { ContactCTASection } from '@/features/home/ContactCTASection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProjectsPreviewSection />
      {/* <SkillsSection />
      <ExperienceSection />
      <ContactCTASection /> */}
    </main>
  );
}
