import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import styled from 'styled-components'
import ReactPlayer from 'react-player'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {BiListPlus} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Sidebar from '../Sidebar'

const VideoDetailsContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f' : '#ffffff')};
`

const MainContent = styled.div`
  display: flex;
`

const ContentContainer = styled.main`
  flex: 1;
  padding: 24px 32px;
  overflow-x: hidden;
`

const PlayerContainer = styled.div`
  width: 100%;
  max-width: 1000px;
`

const VideoTitle = styled.p`
  font-size: 24px;
  margin: 20px 0 10px;
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#181818')};
`

const VideoMetaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`

const ViewsDate = styled.p`
  color: ${props => (props.isDarkTheme ? '#94a3b8' : '#64748b')};
`

const ActionsContainer = styled.div`
  display: flex;
  gap: 20px;
`

const ActionButton = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 16px;

  color: ${props => {
    if (props.isActive) {
      return '#2563eb'
    }

    if (props.isDarkTheme) {
      return '#94a3b8'
    }

    return '#64748b'
  }};
`

const ChannelContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;
  border-top: 1px solid #cbd5e1;
  padding-top: 20px;
`

const ChannelLogo = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
`

const ChannelName = styled.p`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#181818')};
`

const SubscriberCount = styled.p`
  margin: 5px 0 0;
  font-size: 14px;
  color: ${props => (props.isDarkTheme ? '#94a3b8' : '#64748b')};
`

const Description = styled.p`
  margin-top: 25px;
  line-height: 1.6;
  font-size: 15px;
  color: ${props => (props.isDarkTheme ? '#e2e8f0' : '#475569')};
`

const StatusContainer = styled.div`
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const FailureImage = styled.img`
  width: 350px;
  max-width: 80%;
`

const RetryButton = styled.button`
  background-color: #2563eb;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 10px 24px;
  cursor: pointer;
`

const VideoDetails = ({
  match,
  isDarkTheme,
  toggleTheme,
  savedVideosList,
  setSavedVideosList,
}) => {
  const {id} = match.params

  const [videoDetails, setVideoDetails] = useState(null)
  const [apiStatus, setApiStatus] = useState('INITIAL')
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const getVideoDetails = async () => {
    if (!id) {
      return
    }

    setApiStatus('LOADING')

    try {
      const jwtToken = Cookies.get('jwt_token')

      const response = await fetch(`https://apis.ccbp.in/videos/${id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })

      const data = await response.json()

      if (response.ok) {
        const {video_details: video} = data

        setVideoDetails(video)

        // Check App-level saved videos list
        const alreadySaved = savedVideosList.some(
          savedVideo => savedVideo.id === video.id,
        )

        setIsSaved(alreadySaved)
        setApiStatus('SUCCESS')
      } else {
        setApiStatus('FAILURE')
      }
    } catch (error) {
      setApiStatus('FAILURE')
    }
  }

  useEffect(() => {
    getVideoDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  // Keep Save button synchronized with App state
  useEffect(() => {
    if (videoDetails !== null) {
      const alreadySaved = savedVideosList.some(
        savedVideo => savedVideo.id === videoDetails.id,
      )

      setIsSaved(alreadySaved)
    }
  }, [savedVideosList, videoDetails])

  const handleLike = () => {
    setIsLiked(true)
    setIsDisliked(false)
  }

  const handleDislike = () => {
    setIsDisliked(true)
    setIsLiked(false)
  }

  const handleSave = () => {
    if (videoDetails === null) {
      return
    }

    const alreadySaved = savedVideosList.some(
      video => video.id === videoDetails.id,
    )

    if (alreadySaved) {
      // Remove video
      const updatedVideos = savedVideosList.filter(
        video => video.id !== videoDetails.id,
      )

      setSavedVideosList(updatedVideos)
      setIsSaved(false)
    } else {
      // Add video
      const updatedVideos = [...savedVideosList, videoDetails]

      setSavedVideosList(updatedVideos)
      setIsSaved(true)
    }
  }

  const renderLoadingView = () => (
    <StatusContainer data-testid="loader">
      <Loader type="ThreeDots" color="#4f46e5" height={50} width={50} />
    </StatusContainer>
  )

  const renderFailureView = () => {
    const failureImageUrl = isDarkTheme
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

    return (
      <StatusContainer>
        <FailureImage src={failureImageUrl} alt="failure view" />

        <h1>Oops! Something Went Wrong</h1>

        <p>
          We are having some trouble completing your request. Please try again.
        </p>

        <RetryButton type="button" onClick={getVideoDetails}>
          Retry
        </RetryButton>
      </StatusContainer>
    )
  }

  const renderSuccessView = () => (
    <>
      <PlayerContainer>
        <ReactPlayer url={videoDetails.video_url} width="100%" controls />
      </PlayerContainer>

      <VideoTitle isDarkTheme={isDarkTheme}>{videoDetails.title}</VideoTitle>

      <VideoMetaContainer>
        <ViewsDate isDarkTheme={isDarkTheme}>
          {videoDetails.view_count} {videoDetails.published_at}
        </ViewsDate>

        <ActionsContainer>
          <ActionButton
            type="button"
            onClick={handleLike}
            isActive={isLiked}
            isDarkTheme={isDarkTheme}
          >
            <AiOutlineLike size={20} />
            Like
          </ActionButton>

          <ActionButton
            type="button"
            onClick={handleDislike}
            isActive={isDisliked}
            isDarkTheme={isDarkTheme}
          >
            <AiOutlineDislike size={20} />
            Dislike
          </ActionButton>

          <ActionButton
            type="button"
            onClick={handleSave}
            isActive={isSaved}
            isDarkTheme={isDarkTheme}
          >
            <BiListPlus size={22} />
            {isSaved ? 'Saved' : 'Save'}
          </ActionButton>
        </ActionsContainer>
      </VideoMetaContainer>

      <ChannelContainer>
        <ChannelLogo
          src={videoDetails.channel.profile_image_url}
          alt="channel logo"
        />

        <div>
          <ChannelName isDarkTheme={isDarkTheme}>
            {videoDetails.channel.name}
          </ChannelName>

          <SubscriberCount isDarkTheme={isDarkTheme}>
            {videoDetails.channel.subscriber_count}
          </SubscriberCount>
        </div>
      </ChannelContainer>

      <Description isDarkTheme={isDarkTheme}>
        {videoDetails.description}
      </Description>
    </>
  )

  const renderContent = () => {
    if (apiStatus === 'LOADING') {
      return renderLoadingView()
    }

    if (apiStatus === 'SUCCESS') {
      return renderSuccessView()
    }

    if (apiStatus === 'FAILURE') {
      return renderFailureView()
    }

    return null
  }

  return (
    <VideoDetailsContainer isDarkTheme={isDarkTheme}>
      <Header isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />

      <MainContent>
        <Sidebar isDarkTheme={isDarkTheme} />

        <ContentContainer>{renderContent()}</ContentContainer>
      </MainContent>
    </VideoDetailsContainer>
  )
}

export default VideoDetails
