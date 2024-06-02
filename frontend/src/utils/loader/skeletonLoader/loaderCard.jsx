import { Card, Skeleton } from 'antd';

const CardLoader = () => (
  <Card hoverable style={{ width: '100%' }}>
    <div style={{ height: '200px', overflow: 'hidden' }}>
      <Skeleton.Image style={{ width: '100%', height: '100%' }} />
    </div>
    <Skeleton loading={true} active>
      <div
        style={{
          marginTop: 16,
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <Skeleton.Button active style={{ width: '150px', height: '50px' }} />
        <Skeleton.Button active style={{ width: '150px', height: '50px' }} />
      </div>
    </Skeleton>
  </Card>
);

export default CardLoader;
