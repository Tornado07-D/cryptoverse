import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import Loader from './Loader';

const { Title, Text } = Typography;

const News = ({ simplified }) => {
  const { data, isFetching } = useGetCryptoNewsQuery();

  if (isFetching) return <Loader />;
  if (!data?.results?.length) return <Text>No news available</Text>;

  const cleanNews = data.results
    .filter(
      (news) =>
        news.title &&
        !news.title.toLowerCase().includes('presale') &&
        !news.title.toLowerCase().includes('whitelist')
    )
    .slice(0, simplified ? 6 : 12);

  return (
    <Row gutter={[24, 24]}>
      {cleanNews.map((news, index) => (
        <Col xs={24} sm={12} lg={8} key={index}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <Title level={4}>{news.title}</Title>
              <Text type="secondary">{news.source?.title}</Text>
              <br />
              <Text type="secondary">
                {moment(news.published_at).fromNow()}
              </Text>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
