import React, { Suspense } from 'react';
import QuestionPage from './QuestionPage';
import { getAvailableQuestions } from '@/shared/lib';

export default async function Page({
  params,
}: {
  params: Promise<{ questionId: string }>;
}) {
  const { questionId } = await params;

  return (
    <Suspense fallback={<div>Loading question...</div>}>
      <QuestionPage questionId={questionId} />
    </Suspense>
  );
}

export async function generateStaticParams() {
  const questionIds = await getAvailableQuestions();
  return questionIds.map((questionId) => ({ questionId }));
}
