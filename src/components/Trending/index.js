import {useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import styled from 'styled-components'
import Header from '../Header'
import Sidebar from '../Sidebar'
import VideoCard from '../VideoCard'

const TrendingContainer = styled.div`
  min-height: 100vh;
  background-color: ${props =>
    props.isDarkTheme ? '#0f0f0f' : '#ffffff'};
  color: ${props =>
    props.isDarkTheme ? '#ffffff' : '#000000'};
`

const MainContent = styled.div`
  display: flex;
`

const ContentContainer = styled.main`
  flex: 1;
  overflow-x: hidden;
`

const PageHeading = styled.h1`
  font-size: 28px;
  margin: 25px 20px;
`

/* Important:
   Trending videos must be displayed inside a UL */
const VideosContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  padding: 20px;
  margin: 0;

  list-style-type: none;
`

const VideoListItem = styled.li`
  width: 100%;
`

const LoaderContainer = styled.li`
  grid-column: 1 / -1;

  display: flex;
  justify-content: center;
  align-items: center;

  min-height: 60vh;

  list-style-type: none;
`

const FailureContainer = styled.li`
  grid-column: 1 / -1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-height: 60vh;

  text-align: center;

  list-style-type: none;
`

const FailureImage = styled.img`
  width: 300px;
  max-width: 80%;
`

const FailureTitle = styled.h1`
  font-size: 24px;
`

const FailureText = styled.p`
  color: #64748b;
`

const RetryButton = styled.button`
  background-color: #2563eb;
  color: #ffffff;

  border: none;
  padding: 10px 24px;

  border-radius: 4px;

  cursor: pointer;
`

const Trending = ({isDarkTheme, toggleTheme}) => {
  const [videos, setVideos] = useState([])
  const [apiStatus, setApiStatus] = useState('INITIAL')

  const getTrendingVideos = async () => {
    setApiStatus('LOADING')

    try {
      const jwtToken = Cookies.get('jwt_token')

      const response = await fetch(
        'https://apis.ccbp.in/videos/trending',
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      )

      const data = await response.json()

      if (response.ok) {
        setVideos(data.videos)
        setApiStatus('SUCCESS')
      } else {
        setApiStatus('FAILURE')
      }
    } catch (error) {
      setApiStatus('FAILURE')
    }
  }

  useEffect(() => {
    getTrendingVideos()
  }, [])

  const renderLoadingView = () => (
    <LoaderContainer data-testid="loader">
      <Loader
        type="ThreeDots"
        color="#2563eb"
        height={50}
        width={50}
      />
    </LoaderContainer>
  )

  const renderFailureView = () => (
    <FailureContainer>
      <FailureImage
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
      />

      <FailureTitle>
        Oops! Something Went Wrong
      </FailureTitle>

      <FailureText>
        We are having some trouble to complete your request.
        Please try again.
      </FailureText>

      <RetryButton
        type="button"
        onClick={getTrendingVideos}
      >
        Retry
      </RetryButton>
    </FailureContainer>
  )

  const renderSuccessView = () => (
    <>
      {videos.map(video => (
        <VideoListItem key={video.id}>
          <VideoCard
            video={video}
            isDarkTheme={isDarkTheme}
          />
        </VideoListItem>
      ))}
    </>
  )

  const renderTrendingView = () => {
    switch (apiStatus) {
      case 'LOADING':
        return renderLoadingView()

      case 'FAILURE':
        return renderFailureView()

      case 'SUCCESS':
        return renderSuccessView()

      default:
        return null
    }
  }

  return (
    <TrendingContainer isDarkTheme={isDarkTheme}>
      <Header
        isDarkTheme={isDarkTheme}
        toggleTheme={toggleTheme}
      />

      <MainContent>
        <Sidebar isDarkTheme={isDarkTheme} />

        <ContentContainer>
          <PageHeading>
            Trending
          </PageHeading>

          <VideosContainer>
            {renderTrendingView()}
          </VideosContainer>
        </ContentContainer>
      </MainContent>
    </TrendingContainer>
  )
}

export default Trending