import { generateMetadata } from '@/lib/seo';
import { HeroSection } from '@/components/sections/HeroSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsPreviewSection } from '@/components/sections/ProjectsPreviewSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ContactCTASection } from '@/components/sections/ContactCTASection';

export const metadata = generateMetadata('Home');

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <SkillsSection />
      <ProjectsPreviewSection />
      <ExperienceSection />
      <ContactCTASection />
    </main>
  );
}
