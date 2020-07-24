import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { API_URL, MEDIA_URL } from '../constants/url';
import { IVideo } from '../interfaces/video';

interface Props {

}


const Videos: FC<Props> = () => {
  const [videos, setVideos] = useState<Array<IVideo>>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function loadVideos() {
    try {
      const response = await axios.get(API_URL);
      const { data } = response.data;
      if (data) {
        setVideos(data);
      } else {
        setVideos([]);
      }
      setLoaded(true);
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    loadVideos();
  }, []);

  const renderCards = () => {
    if (videos.length === 0) {
      return (<h3>No videos found!</h3>);
    }

    return videos.map((video: IVideo) => (
      <Col key={video.id} xs={12} sm={6} md={4} lg={3} className="p-2">
        <Link to={`/${video.id}`}>
          <Card className="text-xs-center">
            <Card.Img variant="top" src={`${MEDIA_URL}/${video.thumbnail}`} />
            <Card.Body>
              <Card.Title>
                {video.title}
              </Card.Title>
            </Card.Body>
          </Card>
        </Link>
        
      </Col>
    ));
  }
  return (
    <Container className="text-xs-center mt-5">
      <h1>All Videos</h1>
      <Row md={12} lg={10} className="m-5">
        {(loaded && !!!error) && renderCards()}
        {error && (
          <h3 className="text-danger">{error}</h3>
        )}
      </Row>
    </Container>
  );
}

export default Videos;