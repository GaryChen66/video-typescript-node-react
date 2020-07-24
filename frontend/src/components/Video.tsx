import React, { FC, useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { API_URL, MEDIA_URL } from '../constants/url';
import { IVideo } from '../interfaces/video';
import ReactPlayer from 'react-player'
import Col from 'react-bootstrap/Col';
import './Video.scss';
interface Props {

}

interface IResolution {
  path240: string,
  path480: string,
  path720: string,
  path4k: string,

}

const Video: FC<Props> = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState<IVideo | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [resolution, setResolution] = useState<string>('path480');

  function loadVideoUrl() {
    if (video !== null) {
      setVideoUrl(video[resolution as keyof IResolution]);
      console.log('setting')
    }
  }

  async function loadVideo() {
    try {
      const response = await axios.get(`${API_URL}/${videoId}`);
      const { data } = response.data;
      if (data) {
        setVideo(data);
        console.log(data[resolution as keyof IResolution]);
        setVideoUrl(data[resolution as keyof IResolution]);
      } else {
        setVideo(null);
      }
      setLoaded(true);
    } catch (e) {
      setError(e.message);
    }
  }
  console.log(videoUrl);
  useEffect(() => {
    console.log('asdfasdf');
    loadVideo();
  }, []);

  useEffect(() => {
    loadVideoUrl();
  }, [resolution])

  const onChangeResolution = (event: ChangeEvent<HTMLSelectElement>) => {
    setResolution(event.target.value);
  }

  return (
    <Container className="text-xs-center mt-5">
      <Row md={12} lg={10} className="m-5">
        {(loaded && video) && (
          <Col>
            <h1>{video.title}</h1>
            <ReactPlayer
              url={`${MEDIA_URL}/${videoUrl}`}
              width='100%'
              height='100%'
              controls
            />

            <select className='resolution' onChange={onChangeResolution} value={resolution}>
              <option value="path240">240p Video</option>
              <option value="path480">480p Video</option>
              <option value="path720">720p Video</option>
              <option value="path4k">4K Video</option>
            </select>
          </Col>
        )}

        {error && (
          <h3 className="text-danger">{error}</h3>
        )}
      </Row>
    </Container>
  );
}

export default Video;