import Link from 'next/link';
import style from './home.style.module.scss';
export function ContactCTASection() {
  return (
    <section className={style.cta}>
      <div className="container">
        <h2>Let’s Build Something</h2>
        <Link href="/contact" className="btn">
          Get In Touch
        </Link>
      </div>
    </section>
  );
}
