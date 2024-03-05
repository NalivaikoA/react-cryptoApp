import { Layout } from 'antd';
import Typography from 'antd/es/typography/Typography';
import { useCrypto } from '../context/crypto-context';
import { PortfolioChart } from '../PortfolioChart';
import { AssetsTable } from '../AssetsTable';

const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  color: '#fff',
  backgroundColor: '#001529',
  padding: '1rem',
};

export const AppContent = () => {
  const { assets, crypto } = useCrypto();

  const cryptoPriceMap = crypto.reduce((acc, coin) => {
    acc[coin.id] = coin.price;
    return acc;
  }, {});

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{ textAlign: 'left', color: '#fff' }}>
        Portfolio:{' '}
        {assets
          .map(
            // const coin = crypto.find(c => c.id === asset.id);
            // return asset.amount * coin.price; // первый вариант был
            asset => asset.amount * cryptoPriceMap[asset.id],
          )
          .reduce((acc, val) => (acc += val), 0)
          .toFixed(2)}
        $
      </Typography.Title>
      <PortfolioChart />
      <AssetsTable />
    </Layout.Content>
  );
};
