import { generateMetadata } from '@/lib/seo';
import HomePage from './home/page';

export const metadata = generateMetadata('Home');

export default function Home() {
  return (
    <main>
      <HomePage />
    </main>
  );
}
