import type { Metadata } from 'next';

import { ResultView } from 'src/sections/result/result-view';

export const metadata: Metadata = {
  title: 'Амьдралаа өөрчлөхөд тань туслах цахим хөтөч',
  description: 'Өөрийгөө таниад алдаагаа зас',
  openGraph: {
    title: 'Амьдралаа өөрчлөхөд тань туслах цахим хөтөч',
    description: 'Өөрийгөө таниад алдаагаа зас',
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

export default function ResultPage() {
  return <ResultView />;
}
