import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EasyLoops - Practice Problems',
  description: 'Learn programming with interactive practice problems',
};

export default function QuestionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
