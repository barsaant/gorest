'use client';

import type { Dispatch, SetStateAction } from 'react';

import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { GradientButton } from 'src/components/gradient-button';

export const EmailStage = ({
  email,
  setEmail,
  onSubmit,
}: {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
}) => {
  const [touched, setTouched] = useState(false);

  const isEmailValid = useMemo(() => {
    const v = (email || '').trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }, [email]);

  const showError = touched && (email || '').trim().length > 0 && !isEmailValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!isEmailValid) return;
    onSubmit();
  };

  return (
    <Stack spacing={2} component="form" onSubmit={handleSubmit}>
      <Stack spacing={1} alignItems="center">
        <Chip label="ДҮГНЭЛТИЙГ ИЛГЭЭХ" size="small" />
        <Typography variant="h6" textAlign="center" fontWeight={800} lineHeight={1.35}>
          Таны дүгнэлтийн холбоосыг и-мэйлээр илгээнэ
        </Typography>
      </Stack>

      <TextField
        label="И-мэйл хаяг"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setTouched(true)}
        error={showError}
        helperText={showError ? 'И-мэйл хаяг буруу байна. Жишээ: name@gmail.com' : ' '}
        fullWidth
        required
        autoFocus
        inputProps={{ inputMode: 'email', autoComplete: 'email' }}
      />

      <GradientButton
        size="large"
        type="submit"
        variant="contained"
        fullWidth
        disabled={!email.trim()}
      >
        Үргэлжлүүлэх
      </GradientButton>

      <Box
        sx={(t) => ({
          mt: 0.5,
          p: 1.25,
          borderRadius: 3,
          bgcolor: alpha(t.palette.text.primary, 0.03),
          border: `1px solid ${alpha(t.palette.divider, 0.7)}`,
        })}
      >
        <Typography variant="body2" textAlign="center" color="text.secondary" lineHeight={1.5}>
          Таны и-мэйл хаягийг зөвхөн дүгнэлт илгээхэд ашиглана. Сурталчилгаа илгээхгүй.
        </Typography>
      </Box>
    </Stack>
  );
};
