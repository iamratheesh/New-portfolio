import Link from 'next/link';

export function ContactCTASection() {
  return (
    <section className="section cta">
      <div className="container">
        <h2>Let’s Build Something</h2>
        <Link href="/contact" className="btn">
          Get In Touch
        </Link>
      </div>
    </section>
  );
}
