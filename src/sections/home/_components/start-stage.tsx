'use client';

import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { GradientButton } from 'src/components/gradient-button';

interface StartStageProps {
  onSubmit: () => void;
}

const MotionBox = m(Box);

export const StartStage = ({ onSubmit }: StartStageProps) => {
  const [step, setStep] = useState<0 | 1>(0);

  return (
    <AnimatePresence mode="wait">
        {step === 0 && (
          <MotionBox
            key="intro"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <Stack spacing={3} alignItems="center">
              <Chip label="ТАНИЛЦУУЛГА" size="small" />

              <Typography variant="h6" textAlign="center" fontWeight={700} lineHeight={1.4}>
                2025 онд та ахисан уу, эсвэл урсгалаараа өнгөрчхөв үү?
              </Typography>

              <Typography textAlign="center" color="text.secondary" lineHeight={1.55}>
                Жилийн тайлангаа аваад эхний 30 хоногт амьдралынхаа суурийг бодитоор хараарай.
              </Typography>

              <GradientButton
                size="large"
                variant="contained"
                gradient="primary"
                onClick={() => setStep(1)}
                sx={{ mt: 0.5, px: 4 }}
              >
                Эхлүүлэх
              </GradientButton>
            </Stack>
          </MotionBox>
        )}

        {step === 1 && (
          <MotionBox
            key="explain"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <Stack spacing={3} alignItems="center">
              <Chip label="САНАМЖ" size="small" color="warning" />

              <Typography variant="h6" textAlign="center" fontWeight={700} lineHeight={1.4}>
                Энэ асуултууд бодит байдлыг шалгана
              </Typography>

              <Typography textAlign="center" color="text.secondary" lineHeight={1.55}>
                Эрч хүч, санхүү, бүтээмж, хувийн өсөлтөө
                <b> сүүлийн 1 жилийн бодит зан төлвөөр</b> үнэлээрэй.
              </Typography>

              <GradientButton
                size="large"
                variant="contained"
                onClick={onSubmit}
                sx={{ mt: 0.5, px: 4 }}
              >
                Ойлголоо
              </GradientButton>
            </Stack>
          </MotionBox>
        )}
      </AnimatePresence>
  );
};
