import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import styled from 'styled-components'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Sidebar from '../Sidebar'
import VideoCard from '../VideoCard'

const GamingContainer = styled.div`
  min-height: 100vh;
`

const MainContent = styled.div`
  display: flex;
`

const ContentContainer = styled.div`
  flex: 1;
  padding: 20px 32px;
  overflow-x: hidden;
`

const VideosContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  padding: 20px 0;
`

const StatusContainer = styled.div`
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const FailureImage = styled.img`
  width: 350px;
`

const RetryButton = styled.button`
  background-color: #2563eb;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
`

const Gaming = ({isDarkTheme, toggleTheme}) => {
  const [videos, setVideos] = useState([])
  const [apiStatus, setApiStatus] = useState('INITIAL')

  const getGamingVideos = async () => {
    setApiStatus('LOADING')

    try {
      const jwtToken = Cookies.get('jwt_token')

      const response = await fetch('https://apis.ccbp.in/videos/gaming', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })

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
    getGamingVideos()
  }, [])

  const renderLoadingView = () => (
    <StatusContainer data-testid="loader">
      <Loader type="ThreeDots" color="#4f46e5" height={50} width={50} />
    </StatusContainer>
  )

  const renderFailureView = () => (
    <StatusContainer>
      <FailureImage
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
      />

      <h1>Oops! Something Went Wrong</h1>

      <p>We are having trouble completing your request. Please try again.</p>

      <RetryButton type="button" onClick={getGamingVideos}>
        Retry
      </RetryButton>
    </StatusContainer>
  )

  const renderSuccessView = () => (
    <VideosContainer>
      {videos.map(video => (
        <VideoCard key={video.id} video={video} isDarkTheme={isDarkTheme} />
      ))}
    </VideosContainer>
  )

  const renderGamingView = () => {
    switch (apiStatus) {
      case 'LOADING':
        return renderLoadingView()

      case 'SUCCESS':
        return renderSuccessView()

      case 'FAILURE':
        return renderFailureView()

      default:
        return null
    }
  }

  return (
    <GamingContainer>
      <Header isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />

      <MainContent>
        <Sidebar isDarkTheme={isDarkTheme} />

        <ContentContainer>
          <h1>Gaming</h1>

          {renderGamingView()}
        </ContentContainer>
      </MainContent>
    </GamingContainer>
  )
}

export default Gaming
