'use client';

import type { DataDoc } from './_components/types';
import type { GorestAnswerResponse } from 'src/services/types/Gorest.type';

import { toast } from 'sonner';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import { eventview } from 'src/utils/fpixel';

import { GorestService } from 'src/services';

import { CircularLoadingBlur } from 'src/components/circular-loading-blur';

import { StylesDataFinder } from './_data/_finder';
import { DataSection } from './_components/data-section';
import { HomeLayout } from '../home/_components/home-layout';
import { PaymentSection } from './_components/payment-section';

export const ResultView = () => {
  const [result, setResult] = useState<GorestAnswerResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [style, setStyle] = useState<DataDoc | null>(null);
  const [hasFiredCheckout, setHasFiredCheckout] = useState(false);
  const [hasFiredPurchase, setHasFiredPurchase] = useState(false);
  const [hasFiredResultViewed, setHasFiredResultViewed] = useState(false);
  const params = useParams<{ _id: string }>();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await GorestService().paymentCheck(params._id.toString());
      setResult(response.data);
      setLoading(false);
      if (response.data.styles) {
        setStyle(StylesDataFinder(response.data.styles));
      }
    } catch (err: any) {
      if (err && err.message) {
        toast.error(err.message);
      } else {
        toast.error('Алдаа гарлаа');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!params._id) return;
    fetchData();
  }, [params._id]);

  useEffect(() => {
    if (!result) return;

    if (result.status === 'pending' && !hasFiredCheckout) {
      eventview(
        'InitiateCheckout',
        {
          value: 4900.0,
          currency: 'MNT',
          num_items: 1,
          contents: [{ id: 'gorest-basic', quantity: 1, item_price: 4900.0 }],
          content_type: 'product',
        },
        { eventID: `checkout-${result._id}` }
      );
      setHasFiredCheckout(true);
    }

    if (result.status === 'paid' && !hasFiredPurchase) {
      eventview(
        'Purchase',
        {
          value: 4900.0,
          currency: 'MNT',
          num_items: 1,
          contents: [{ id: 'gorest-basic', quantity: 1, item_price: 4900.0 }],
          content_type: 'product',
        },
        { eventID: `purchase-${result._id}` }
      );
      setHasFiredPurchase(true);
    }

    if (result.status === 'completed' && !hasFiredResultViewed) {
      eventview('ResultViewed', {}, { eventID: `result-${result._id}` });
      setHasFiredResultViewed(true);
    }
  }, [result, hasFiredCheckout, hasFiredPurchase, hasFiredResultViewed]);

  return (
    <>
      {loading && <CircularLoadingBlur loading={loading} />}

      {!loading && result && result.status === 'pending' && (
        <HomeLayout
          title="ӨГЛӨӨГ БАЙЛДАН ДАГУУЛАХАД ГАНЦХАН АЛХАМ ҮЛДЛЭЭ!"
          description="Үр дүнгүй эм тариа, нэмэлт бүтээгдэхүүнд мөнгөө үрэхээ зогсоо. Та ердөө 4,900₮-өөр (нэг аяга кофены үнэ!) өөрийн нойрыг удирдах цогц дүн шинжилгээг авах болно."
        >
          <PaymentSection result={result} onCheckPayment={fetchData} />
        </HomeLayout>
      )}

      {loading && <CircularLoadingBlur loading={loading} />}

      {/* {!loading &&
        result &&
        (result.status === 'paid' || result.status === 'completed') &&
        general &&
        style && <DataSection />} */}

      {!loading &&
        result &&
        (result.status === 'paid' || result.status === 'completed') &&
        style && (
          <HomeLayout
            title={style.hero.title}
            description={style.hero.subtitle.map((s) => s.v).join('')}
          >
            <DataSection data={style} />
          </HomeLayout>
        )}
    </>
  );
};
