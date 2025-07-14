import type { Metadata } from 'next';
import { QuestionsPageClient } from './QuestionsPageClient';

export const metadata: Metadata = {
  title: 'EasyLoops - All Practice Problems',
  description:
    'Browse all interactive programming challenges and practice problems',
  openGraph: {
    title: 'EasyLoops - All Practice Problems',
    description:
      'Browse all interactive programming challenges and practice problems',
  },
};

export default function QuestionsPage() {
  return <QuestionsPageClient />;
}
