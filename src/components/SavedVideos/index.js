import styled from 'styled-components'
import Header from '../Header'
import Sidebar from '../Sidebar'
import {Link} from 'react-router-dom'

const SavedVideosContainer = styled.div`
  min-height: 100vh;
  background-color: ${props =>
    props.isDarkTheme ? '#0f0f0f' : '#f9f9f9'};
`

const MainContent = styled.div`
  display: flex;
`

const ContentContainer = styled.main`
  flex: 1;
  padding: 20px 32px;
  overflow-x: hidden;
`

const PageTitle = styled.h1`
  font-size: 28px;
  margin: 0 0 25px;
  color: ${props =>
    props.isDarkTheme ? '#ffffff' : '#181818'};
`

const VideosContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  padding: 0;
  margin: 0;
  list-style-type: none;
`

const VideoListItem = styled.li`
  width: 100%;
`

const VideoLink = styled(Link)`
  display: block;
  text-decoration: none;
`

const Thumbnail = styled.img`
  width: 100%;
  display: block;
`

const VideoTitle = styled.p`
  margin: 10px 0;
  font-size: 16px;
  font-weight: 500;
  color: ${props =>
    props.isDarkTheme ? '#ffffff' : '#181818'};
`

const ChannelContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`

const ChannelLogo = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
`

const ChannelName = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${props =>
    props.isDarkTheme ? '#ffffff' : '#181818'};
`

const VideoMeta = styled.p`
  margin: 6px 0;
  font-size: 14px;
  color: ${props =>
    props.isDarkTheme ? '#94a3b8' : '#64748b'};
`

const EmptyContainer = styled.div`
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const EmptyImage = styled.img`
  width: 350px;
  max-width: 80%;
`

const EmptyHeading = styled.h1`
  font-size: 24px;
  color: ${props =>
    props.isDarkTheme ? '#ffffff' : '#181818'};
`

const EmptyText = styled.p`
  color: ${props =>
    props.isDarkTheme ? '#94a3b8' : '#64748b'};
`

const SavedVideos = ({
  isDarkTheme,
  toggleTheme,
  savedVideosList,
}) => {
  const renderEmptyView = () => (
    <EmptyContainer>
      <EmptyImage
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
      />

      <EmptyHeading isDarkTheme={isDarkTheme}>
        No saved videos found
      </EmptyHeading>

      <EmptyText isDarkTheme={isDarkTheme}>
        You can save your videos while watching them
      </EmptyText>
    </EmptyContainer>
  )

  const renderSavedVideos = () => (
    <VideosContainer>
      {savedVideosList.map(video => (
        <VideoListItem key={video.id}>
          <VideoLink to={`/videos/${video.id}`}>
            <Thumbnail
              src={video.thumbnail_url}
              alt="video thumbnail"
            />

            <VideoTitle isDarkTheme={isDarkTheme}>
              {video.title}
            </VideoTitle>

            {video.channel && (
              <ChannelContainer>
                <ChannelLogo
                  src={video.channel.profile_image_url}
                  alt="channel logo"
                />

                <ChannelName isDarkTheme={isDarkTheme}>
                  {video.channel.name}
                </ChannelName>
              </ChannelContainer>
            )}

            <VideoMeta isDarkTheme={isDarkTheme}>
              {video.view_count}
            </VideoMeta>

            <VideoMeta isDarkTheme={isDarkTheme}>
              {video.published_at}
            </VideoMeta>
          </VideoLink>
        </VideoListItem>
      ))}
    </VideosContainer>
  )

  return (
    <SavedVideosContainer isDarkTheme={isDarkTheme}>
      <Header
        isDarkTheme={isDarkTheme}
        toggleTheme={toggleTheme}
      />

      <MainContent>
        <Sidebar isDarkTheme={isDarkTheme} />

        <ContentContainer>
          <PageTitle isDarkTheme={isDarkTheme}>
            Saved Videos
          </PageTitle>

          {savedVideosList.length === 0
            ? renderEmptyView()
            : renderSavedVideos()}
        </ContentContainer>
      </MainContent>
    </SavedVideosContainer>
  )
}

export default SavedVideos