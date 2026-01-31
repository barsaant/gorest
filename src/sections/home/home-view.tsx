'use client';

import type { QuizState } from './_components/types';

import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { getFbp } from 'src/utils/getFbp';
import { eventview } from 'src/utils/fpixel';
import { QUESTIONS } from 'src/utils/questions';

import { GorestService } from 'src/services';

import { QuizStage } from './_components/slider-quiz';
import { HomeLayout } from './_components/home-layout';
import { EmailStage } from './_components/email-stage';

export const HomeView = () => {
  const router = useRouter();

  const [stage, setStage] = useState<'quiz' | 'email'>('quiz');
  const [email, setEmail] = useState('');
  const qs = useSearchParams();

  const [quiz, setQuiz] = useState<QuizState>({
    current: 0,
    value: 0,
    answers: Array(QUESTIONS.length).fill(0),
  });

  const handleQuiz = () => {
    setQuiz((q) => ({ ...q }));
    setStage('email');
  };

  const handleFinal = async () => {
    const fbclid = qs.get('fbclid') || undefined;
    const fbp = getFbp();
    try {
      const res = await GorestService().answers({ email, answers: quiz.answers, fbclid, fbp });
      router.push(`/${res.data._id}`);
    } catch (err: any) {
      if (err && err.message) {
        toast.error(err.message);
      } else {
        toast.error('Алдаа гарлаа');
      }
    }
  };

  useEffect(() => {
    if (stage === 'quiz') {
      eventview('ViewContent');
    } else if (stage === 'email') {
      eventview('Lead');
    }
  }, [stage]);

  return (
    <HomeLayout
      title="Өглөө бүр ядарч сэрээд байна уу?"
      description="Яагаад гэдгийг нь 2 минутын дотор тодруулъя."
    >
      {stage === 'quiz' && <QuizStage quiz={quiz} setQuiz={setQuiz} onSubmit={handleQuiz} />}

      {stage === 'email' && <EmailStage email={email} setEmail={setEmail} onSubmit={handleFinal} />}
    </HomeLayout>
  );
};
