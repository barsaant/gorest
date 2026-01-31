'use client';

import type { Dispatch, SetStateAction } from 'react';
import type { QuizState } from './types';

import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import { QUESTIONS } from 'src/utils/questions';

import { GradientButton } from 'src/components/gradient-button';

import { Likert } from './likert';

type QuizStateProps = {
  quiz: QuizState;
  setQuiz: Dispatch<SetStateAction<QuizState>>;
  onSubmit: () => void;
};

export const QuizStage = ({ quiz, setQuiz, onSubmit }: QuizStateProps) => {
  const total = QUESTIONS.length;

  const [inlineError, setInlineError] = useState<string>('');

  const ensureAnswersLen = (arr: number[]) => {
    const next = (arr || []).slice(0, total);
    while (next.length < total) next.push(0);
    return next;
  };

  const answers = useMemo(() => ensureAnswersLen(quiz.answers || []), [quiz.answers, total]);

  const isValid = (v: number) => Number.isFinite(v) && v >= 1 && v <= 5;

  const answeredCount = answers.reduce((acc, v) => (isValid(v) ? acc + 1 : acc), 0);

  const progress = total ? Math.round((answeredCount / total) * 100) : 0;

  const setAnswer = (index: number, v: number) => {
    setInlineError('');
    const value = Math.max(0, Math.min(5, Math.round(Number(v) || 0)));

    setQuiz((q) => {
      const nextAnswers = ensureAnswersLen(q.answers || []);
      nextAnswers[index] = value;
      return { ...q, answers: nextAnswers };
    });
  };

  const handleFinish = () => {
    setInlineError('');

    const ok = answers.every((v) => isValid(v));
    if (!ok) {
      setInlineError('Бүх асуултад заавал хариулна уу.');
      return;
    }

    setQuiz((q) => ({ ...q, answers: ensureAnswersLen(q.answers || []) }));
    onSubmit();
  };

  const handleReset = () => {
    setInlineError('');
    setQuiz((q) => ({ ...q, answers: ensureAnswersLen([]) }));
  };

  return (
    <Stack spacing={2.25}>
      <Box display="flex" alignItems="center" justifyContent="space-between" gap={1}>
        <Box>
          <Typography
            variant="overline"
            sx={{ letterSpacing: 1.2, opacity: 0.85, fontWeight: 900 }}
          >
            GOREST
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: -0.25 }}>
            Бүх асуултад хариулаад дуусгана уу
          </Typography>
        </Box>

        <Chip
          size="small"
          label={`${answeredCount} / ${total}`}
          sx={(t) => ({
            fontWeight: 950,
            borderRadius: 99,
            border: `1px solid ${alpha(t.palette.primary.main, 0.22)}`,
            bgcolor: alpha(t.palette.primary.main, 0.08),
            px: 0.75,
          })}
        />
      </Box>

      {inlineError ? (
        <Alert
          severity="warning"
          sx={(t) => ({
            borderRadius: 3,
            border: `1px solid ${alpha(t.palette.warning.main, 0.28)}`,
            bgcolor: alpha(t.palette.warning.main, 0.08),
            '& .MuiAlert-message': { fontWeight: 900 },
          })}
        >
          {inlineError}
        </Alert>
      ) : null}

      <Box
        sx={(t) => ({
          borderRadius: 3,
          p: 1.25,
          border: `1px solid ${alpha(t.palette.divider, 0.16)}`,
          bgcolor: alpha(t.palette.background.paper, 0.06),
        })}
      >
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={(t) => ({
            height: 10,
            borderRadius: 99,
            bgcolor: alpha(t.palette.common.white, 0.06),
            '& .MuiLinearProgress-bar': {
              borderRadius: 99,
              backgroundColor: `rgb(${t.vars.palette.button.mainChannel})`,
            },
          })}
        />
        <Box mt={0.9} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="caption" color="text.secondary">
            Явц
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 900 }}>
            {progress}%
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ opacity: 0.5 }} />

      <Stack spacing={2}>
        {QUESTIONS.map((q, i) => {
          const done = isValid(answers[i]);

          return (
            <Box
              key={q.id ?? i}
              sx={(t) => ({
                borderRadius: 3.25,
                border: `1px solid ${alpha(t.palette.divider, 0.18)}`,
                bgcolor: alpha(t.palette.background.paper, 0.06),
                p: { xs: 1.5, sm: 2 },
                position: 'relative',
                overflow: 'hidden',
                boxShadow: done ? `0 10px 26px ${alpha(t.palette.accent.main, 0.12)}` : 'none',
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  background: `radial-gradient(900px circle at 20% 0%, ${alpha(t.palette.accent.main, 0.16)}, transparent 55%)`,

                  pointerEvents: 'none',
                },
              })}
            >
              <Box position="relative">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  gap={1}
                  mb={1.1}
                >
                  <Typography variant="caption" sx={{ opacity: 0.75, fontWeight: 950 }}>
                    {i + 1} / {total}
                  </Typography>

                  <Chip
                    size="small"
                    label={done ? 'Бөглөгдсөн' : 'Бөглөөрэй'}
                    sx={(t) => ({
                      height: 24,
                      fontWeight: 950,
                      borderRadius: 99,
                      border: `1px solid ${alpha(done ? t.palette.button.main : t.palette.secondary.main, 0.22)}`,
                      bgcolor: alpha(done ? t.palette.button.main : t.palette.secondary.main, 0.1),
                    })}
                  />
                </Box>

                <Typography
                  variant="subtitle1"
                  sx={(t) => ({
                    mb: 1.6,
                    lineHeight: 1.25,
                    fontWeight: 800,
                    textAlign: 'center',
                    color: t.vars.palette.text.primary,
                  })}
                >
                  {q.question}
                </Typography>

                <Likert value={answers[i] || 0} onChange={(v) => setAnswer(i, v)} />

                {i !== total - 1 && <Divider sx={{ mt: 1.6, opacity: 0.5 }} />}
              </Box>
            </Box>
          );
        })}
      </Stack>

      <Box
        sx={(t) => ({
          position: 'sticky',
          bottom: 0,
          pt: 1,
          pb: 0.5,
          background:
            t.palette.mode === 'dark'
              ? `linear-gradient(180deg, ${alpha(t.palette.background.default, 0)} 0%, ${alpha(
                  t.palette.background.default,
                  0.92
                )} 35%, ${alpha(t.palette.background.default, 1)} 100%)`
              : `linear-gradient(180deg, ${alpha(t.palette.background.default, 0)} 0%, ${alpha(
                  t.palette.background.default,
                  0.86
                )} 35%, ${alpha(t.palette.background.default, 1)} 100%)`,
          backdropFilter: 'blur(10px)',
        })}
      >
        <GradientButton
          fullWidth
          variant="contained"
          onClick={handleFinish}
          sx={(t) => ({
            borderRadius: 3,
            py: 1.25,
            fontWeight: 950,
            textTransform: 'none',
            boxShadow: `0 16px 35px ${alpha(t.palette.primary.main, 0.28)}`,
          })}
        >
          Үр дүн харах
        </GradientButton>
      </Box>
    </Stack>
  );
};
