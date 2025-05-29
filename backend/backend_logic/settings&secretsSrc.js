import SecretModel from '../models/const&secretsModel.js';

const getOrderConfig = async () => {
  const config = await SecretModel.findOne({ name: 'order_config' });
  return config.key;
};

const getDiscountByRank = async (rank) => {
  try {
    const doc = await SecretModel.findOne({ name: 'discounts_by_rank' });
    if (!doc || !doc.key) return 0;

    return doc.key[rank] ?? 0;
  } catch (error) {
    console.error('Error fetching discount:', error);
    return 0;
  }
};

const getSecretKey = async (name) => {
  const secretDoc = await SecretModel.findOne({ name });

  if (!secretDoc) {
    throw new Error('Secret not found');
  }

  const secretKey = secretDoc.key;

  console.log('Loaded secret key:', secretKey);

  return secretKey;
};

  
const calculateRank = async (moneyspent) => {
  try {
    const secret = await Secret.findOne({ name: 'rank_thresholds' });
    if (!secret) throw new Error('Rank thresholds not found');

    const { rank1, rank2, rank3 } = secret.key;

    if (moneyspent > rank1) return 1;
    if (moneyspent > rank2) return 2;
    if (moneyspent > rank3) return 3;
    return 4;

  } catch (err) {
    console.error('Error calculating rank:', err.message);
    return 4;
  }
};

export { getOrderConfig, getDiscountByRank, calculateRank, getSecretKey };

