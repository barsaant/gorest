import type { Metadata } from 'next';
// ----------------------------------------------------------------------

import { HomeView } from 'src/sections/home/home-view';

export const metadata: Metadata = {
  title: 'ГҮН НОЙРСОХОД ТАНЬ ТУСЛАХ ХӨТӨЧ',
  description: 'НОЙРОО ЗАСААД ЭРЧ ХҮЧЭЭ ЭРГҮҮЛЖ АВ',
  openGraph: {
    title: 'ГҮН НОЙРСОХОД ТАНЬ ТУСЛАХ ХӨТӨЧ',
    description: 'НОЙРОО ЗАСААД ЭРЧ ХҮЧЭЭ ЭРГҮҮЛЖ АВ',
    url: 'https://gorest.mn',
    type: 'website',
    images: [
      {
        url: 'https://gorest.mn/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Өөрийгөө таниад алдаагаа зас',
      },
    ],
  },
};

export default function Page() {
  return <HomeView />;
}
