import React from 'react';
import { json, useLoaderData } from 'react-router-dom';

import Ads from '../components/Ads';

const ProductsPage = () => {
  const data = useLoaderData();
  const ads = Object.values(data)[0];

  return <Ads products={ads} />;
};

export const loader = async () => {
  try {
    const res = await fetch(
      'https://classy-ads-8216b-default-rtdb.firebaseio.com/ads.json'
    );

    if (!res.ok) {
      throw json({ message: 'Could not fetch ads' }, { status: 500 });
    }

    return res;
  } catch (e) {
    throw json({ message: 'Could not fetch ads' }, { status: 500 });
  }
};

export default ProductsPage;
