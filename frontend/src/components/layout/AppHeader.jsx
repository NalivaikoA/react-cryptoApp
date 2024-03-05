import { Button, Drawer, Layout, Modal, Select, Space } from 'antd';
import { useCrypto } from '../context/crypto-context';
import { useEffect, useState } from 'react';
import { CoinInfoModal } from '../CoinInfoModal';
import { AddAssetForm } from '../AddAssetForm';

const headerStyle = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const AppHeader = () => {
  const [select, setSelect] = useState(false);
  const [coin, setCoin] = useState(null);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const { crypto } = useCrypto();

  useEffect(() => {
    const keypress = event => {
      if (event.key === '/') {
        setSelect(prev => !prev);
      }
    };
    document.addEventListener('keypress', keypress);
    return () => document.removeEventListener('keypress', keypress);
  }, []);

  const handleSelect = value => {
    setCoin(crypto.find(c => c.id === value));
    setModal(true);
  };

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{
          width: 250,
        }}
        open={select}
        onSelect={handleSelect}
        onClick={() => {
          setSelect(prev => !prev);
        }}
        value="press / to open"
        options={crypto.map(coin => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={option => (
          <Space>
            <img
              style={{ width: '20px' }}
              src={option.data.icon}
              alt={option.data.label}
            />
            {option.data.label}
          </Space>
        )}
      />
      <Button
        type="primary"
        onClick={() => {
          setDrawer(true);
        }}
      >
        Add asset
      </Button>

      <Modal
        footer={null}
        open={modal}
        onOk={() => {
          setModal(false);
        }}
        onCancel={() => {
          setModal(false);
        }}
      >
        <CoinInfoModal coin={coin} />
      </Modal>

      <Drawer
        width={600}
        title="Add asset"
        onClose={() => {
          setDrawer(false);
        }}
        open={drawer}
        destroyOnClose
      >
        <AddAssetForm
          onClose={() => {
            setDrawer(false);
          }}
        />
      </Drawer>
    </Layout.Header>
  );
};
