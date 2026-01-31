'use client';

import type { GorestAnswerResponse } from 'src/services/types/Gorest.type';

import CheckIcon from '@mui/icons-material/Check';
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Grid, Link, Paper, Stack, Typography, useMediaQuery } from '@mui/material';

import { GradientButton } from 'src/components/gradient-button';

type PaymentSectionProps = {
  result: GorestAnswerResponse;
  onCheckPayment: () => void;
};

const Bullet = ({ text }: { text: string }) => (
  <Stack direction="row" spacing={1.1} alignItems="flex-start">
    <Box
      sx={(t) => ({
        mt: '2px',
        width: 18,
        height: 18,
        borderRadius: 99,
        display: 'grid',
        placeItems: 'center',
        bgcolor: alpha(t.palette.success.main, 0.18),
        border: `1px solid ${alpha(t.palette.success.main, 0.35)}`,
        flex: '0 0 auto',
      })}
    >
      <CheckIcon sx={{ fontSize: 14 }} />
    </Box>
    <Typography variant="body2" sx={{ lineHeight: 1.55, color: 'text.secondary' }}>
      {text}
    </Typography>
  </Stack>
);

export const PaymentSection = ({ result, onCheckPayment }: PaymentSectionProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const bullets = [
    'Шинжлэх ухаанд суурилсан: Таны нойрыг саатуулж буй үндсэн даавар болон мэдрэлийн үйл ажиллагааны тайлбар.',
    'Хувийн төлөвлөгөө: Зөвхөн танд тусгайлан зориулсан 7 хоногийн “Алхам-алхмаар” төлөвлөгөө.',
    'Буруу ойлголт: Өөрийнхөө талаар буруу бодож явдаг зүйлсийн тань үнэн учрыг тайлбарлаж өгнө.',
  ];

  return (
    <Stack spacing={2} alignItems="center" sx={{ position: 'relative', width: '100%' }}>
      <Stack spacing={1.2} sx={{ width: '100%', maxWidth: 560 }}>
        <Typography variant="h6" fontWeight={980} sx={{ textAlign: 'center', lineHeight: 1.15 }}>
          Төлөөд шууд нээгээрэй
        </Typography>

        <Stack spacing={1.05} sx={{ mt: 0.5 }}>
          {bullets.map((t, i) => (
            <Bullet key={i} text={t} />
          ))}
        </Stack>
      </Stack>

      {isMobile && result.urls?.length ? (
        <Stack spacing={1.5} mt={0.5} width="100%">
          <Typography
            sx={{ textAlign: 'center', color: 'text.secondary' }}
            variant="body2"
            fontWeight={900}
          >
            Банкны аппаараа 10 секундэд төлөөд — дүгнэлтээ шууд нээ
          </Typography>

          <Grid container spacing={2} mt={0.5}>
            {result.urls.map((url, idx) => (
              <Grid size={{ xs: 3 }} key={idx} textAlign="center">
                <Link href={url.link} target="_blank" underline="none">
                  <Box
                    component="img"
                    src={url.logo}
                    alt={url.name}
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      objectFit: 'contain',
                      border: `1px solid ${alpha(theme.palette.common.white, 0.12)}`,
                      bgcolor: alpha(theme.palette.common.white, 0.06),
                      p: 0.6,
                    }}
                  />
                  <Typography
                    variant="caption"
                    component="div"
                    mt={0.5}
                    sx={{ wordBreak: 'break-word', color: 'text.secondary', lineHeight: 1.2 }}
                  >
                    {url.name}
                  </Typography>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Stack>
      ) : null}

      <Typography
        variant="body2"
        fontWeight={900}
        sx={{ color: 'text.secondary', textAlign: 'center', mt: 0.5, lineHeight: 1.55 }}
      >
        QR кодоо уншуулж төлбөрөө хийсний дараа
        <br />
        <Box component="span" sx={{ color: 'text.primary' }}>
          “Дүгнэлтээ нээх”
        </Box>{' '}
        дээр дарна уу — баталгаажмагц дүгнэлт шууд нээгдэнэ.
        <br />
        Хэрвээ олдохгүй байвал и-мэйл хаягийнхаа Inbox болон Spam хавтсыг давхар шалгаарай.
      </Typography>

      <Paper
        variant="outlined"
        sx={{
          mt: 0.5,
          p: 2,
          borderRadius: 3,
          mx: 'auto',
          borderColor: alpha(theme.palette.divider, 0.7),
          bgcolor: alpha(theme.palette.background.paper, 0.55),
          backdropFilter: 'blur(10px)',
        }}
      >
        <Box
          component="img"
          src={`data:image/png;base64,${result.qr_image}`}
          alt="QR төлбөр"
          sx={{ width: 230, height: 230, objectFit: 'contain', display: 'block' }}
        />
      </Paper>

      <Stack alignItems="center" mt={1} sx={{ width: '100%' }}>
        <GradientButton
          variant="contained"
          size="large"
          onClick={onCheckPayment}
          sx={{
            width: '100%',
            maxWidth: 440,
            borderRadius: 999,
            py: 1.35,
            px: 4,
            fontWeight: 980,
            fontSize: '1rem',
            letterSpacing: 0.2,
          }}
        >
          Дүгнэлтээ нээх
        </GradientButton>

        <Typography
          variant="caption"
          sx={{ mt: 0.8, textAlign: 'center', color: alpha(theme.palette.common.white, 0.6) }}
        >
          Secure төлбөр • QPay / Банкны аппууд
        </Typography>
      </Stack>
    </Stack>
  );
};
