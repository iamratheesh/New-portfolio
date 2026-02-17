import Link from 'next/link';
import { siteConfig } from '@/config/site.config';

export function HeroSection() {
  return (
    <section className="section hero">
      <div className="container">
        <h1>{siteConfig.title}</h1>
        <p>{siteConfig.description}</p>

        <div className="hero-actions">
          <Link href="/projects" className="btn">
            View Projects
          </Link>

          <Link href="/contact" className="btn btn-outline">
            Contact Me
          </Link>
        </div>
      </div>
    </section>
  );
}
