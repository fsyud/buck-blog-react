import React, { useEffect, useState } from 'react';
import { Col, Row, Card, Divider, Tag } from 'antd';
import sculpture from '@/assets/avatar/cat.png';
import { userinfo } from '@/constant/_common';
import Projects from '@/components/Projects';
import Articles from '@/components/Articles';
import Applications from '@/components/Applications';
import styles from './index.less';

const operationTabList = [
  {
    key: 'articles',
    tab: (
      <span>
        文章 <span style={{ fontSize: 14 }}>(0)</span>
      </span>
    ),
  },
  {
    key: 'applications',
    tab: (
      <span>
        应用 <span style={{ fontSize: 14 }}>(0)</span>
      </span>
    ),
  },
  {
    key: 'projects',
    tab: (
      <span>
        收藏 <span style={{ fontSize: 14 }}>(0)</span>
      </span>
    ),
  },
];

interface AccountCenterProps {
  currentUserLoading: boolean;
}

interface AccountCenterState {
  tabKey?: 'articles' | 'applications' | 'projects';
}

const buckCenter: React.FC<AccountCenterProps> = () => {
  const [tabKey, setTabKey] = useState<AccountCenterState['tabKey']>('articles');

  useEffect(() => {}, []);

  const onTabChange = (key: string) => {
    setTabKey(key as AccountCenterState['tabKey']);
  };

  const renderChildrenByTabKey = (tabKey: AccountCenterState['tabKey']) => {
    if (tabKey === 'projects') {
      return <Projects />;
    }
    if (tabKey === 'applications') {
      return <Applications />;
    }
    if (tabKey === 'articles') {
      return <Articles />;
    }
    return null;
  };

  return (
    <div className={styles.center_user}>
      <Row gutter={24}>
        <Col lg={7} md={24}>
          <Card bordered={true} style={{ marginBottom: 24 }}>
            <div>
              <div className={styles.avatarHolder}>
                <img alt="" src={sculpture} />
                <div className={styles.name}>{userinfo.name}</div>
                <div>{userinfo.signature}</div>
              </div>
            </div>
            <div className={styles.detail}>
              <p>
                <i className={styles.title} />
                {userinfo.title}
              </p>
              <p>
                <i className={styles.address} />
                {userinfo.city}
              </p>
            </div>
            <Divider dashed />
            <div className={styles.tags}>
              <div className={styles.tagsTitle}>标签</div>
              {(userinfo.tags || []).map(item => (
                <Tag key={item.key}>{item.label}</Tag>
              ))}
            </div>
          </Card>
        </Col>
        <Col lg={17} md={24}>
          <Card
            className={styles.tabsCard}
            bordered={true}
            tabList={operationTabList}
            activeTabKey={tabKey}
            onTabChange={onTabChange}
          >
            {renderChildrenByTabKey(tabKey)}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default buckCenter;
