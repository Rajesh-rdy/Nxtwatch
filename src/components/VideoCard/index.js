import styled from 'styled-components'
import {Link} from 'react-router-dom'

const Card = styled.div`
  width: 100%;
`

const Thumbnail = styled.img`
  width: 100%;
  display: block;
`

const Title = styled.p`
  font-size: 16px;
  margin: 10px 0;
  color: ${props =>
    props.isDarkTheme ? '#ffffff' : '#000000'};
`

const Details = styled.div`
  display: flex;
  margin-top: 10px;
`

const ChannelLogo = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
`

const VideoInfo = styled.div`
  flex: 1;
`

const ChannelName = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${props =>
    props.isDarkTheme ? '#ffffff' : '#000000'};
`

const VideoMeta = styled.p`
  margin: 6px 0 0;
  font-size: 14px;
  color: ${props =>
    props.isDarkTheme ? '#94a3b8' : '#64748b'};
`

const GamingMeta = styled.p`
  margin: 6px 0;
  font-size: 14px;
  color: ${props =>
    props.isDarkTheme ? '#94a3b8' : '#64748b'};
`

const VideoCard = ({video, isDarkTheme}) => {
  const hasChannel = video.channel !== undefined

  return (
    <Link
      to={`/videos/${video.id}`}
      style={{textDecoration: 'none'}}
    >
      <Card>
        <Thumbnail
          src={video.thumbnail_url}
          alt="video thumbnail"
        />

        <Title isDarkTheme={isDarkTheme}>
          {video.title}
        </Title>

        {hasChannel ? (
          <Details>
            <ChannelLogo
              src={video.channel.profile_image_url}
              alt="channel logo"
            />

            <VideoInfo>
              <ChannelName isDarkTheme={isDarkTheme}>
                {video.channel.name}
              </ChannelName>

              <VideoMeta isDarkTheme={isDarkTheme}>
                {video.view_count}
              </VideoMeta>

              <VideoMeta isDarkTheme={isDarkTheme}>
                {video.published_at}
              </VideoMeta>
            </VideoInfo>
          </Details>
        ) : (
          <GamingMeta isDarkTheme={isDarkTheme}>
            {video.view_count}
          </GamingMeta>
        )}
      </Card>
    </Link>
  )
}

export default VideoCard