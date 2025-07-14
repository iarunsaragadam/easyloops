import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ questionId: string }>;
}): Promise<Metadata> {
  const { questionId } = await params;

  return {
    title: `EasyLoops - Practice Problems`,
    description: 'Learn programming with interactive practice problems',
    alternates: {
      canonical: `/questions/${questionId}`,
    },
    openGraph: {
      url: `https://easyloops.app/questions/${questionId}`,
      title: `EasyLoops - Practice Problems`,
      description: 'Learn programming with interactive practice problems',
    },
  };
}

export default function QuestionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
