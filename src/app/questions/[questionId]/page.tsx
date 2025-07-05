import React, { Suspense } from 'react';
import QuestionPage from './QuestionPage';
import { getAvailableQuestions } from '@/shared/lib';

export default function Page({ params }: { params: { questionId: string } }) {
  return (
    <Suspense fallback={<div>Loading question...</div>}>
      <QuestionPage questionId={params.questionId} />
    </Suspense>
  );
}

export async function generateStaticParams() {
  const questionIds = await getAvailableQuestions();
  return questionIds.map((questionId) => ({ questionId }));
}
