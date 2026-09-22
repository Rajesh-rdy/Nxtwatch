import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import styled from 'styled-components'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Sidebar from '../Sidebar'
import VideoCard from '../VideoCard'

const HomeContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => (props.isDarkTheme ? '#181818' : '#f9f9f9')};
`

const MainContent = styled.div`
  display: flex;
`

const ContentContainer = styled.main`
  flex: 1;
  overflow-x: hidden;
`

const Banner = styled.div`
  min-height: 180px;
  padding: 30px;
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  background-position: center;
  position: relative;
`

const BannerLogo = styled.img`
  width: 150px;
`

const BannerText = styled.p`
  font-size: 18px;
  max-width: 400px;
  color: #181818;
  line-height: 1.5;
`

const GetItNowButton = styled.button`
  background-color: transparent;
  border: 1px solid #181818;
  color: #181818;
  padding: 10px 18px;
  cursor: pointer;
  font-weight: 500;
`

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  border: none;
  background-color: transparent;
  font-size: 24px;
  cursor: pointer;
  color: #181818;
`

const ContentBody = styled.div`
  padding: 20px 32px;
`

const SearchContainer = styled.div`
  display: flex;
  width: 70%;
  max-width: 600px;
  margin-bottom: 20px;
`

const SearchInput = styled.input`
  flex: 1;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #cbd5e1;
  outline: none;
  background-color: ${props => (props.isDarkTheme ? '#181818' : '#ffffff')};
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#000000')};
`

const SearchButton = styled.button`
  width: 50px;
  height: 40px;
  border: 1px solid #cbd5e1;
  background-color: ${props => (props.isDarkTheme ? '#383838' : '#f1f1f1')};
  cursor: pointer;
`

const VideosContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  padding: 20px 0;
  margin: 0;
  list-style-type: none;
`

const StatusContainer = styled.div`
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`

const FailureImage = styled.img`
  width: 350px;
`

const NoVideosImage = styled.img`
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

const Home = ({isDarkTheme, toggleTheme}) => {
  const [videos, setVideos] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [apiStatus, setApiStatus] = useState('INITIAL')
  const [showBanner, setShowBanner] = useState(true)

  const getVideos = async () => {
    setApiStatus('LOADING')

    try {
      const jwtToken = Cookies.get('jwt_token')

      const response = await fetch(
        `https://apis.ccbp.in/videos/all?search=${searchInput}`,
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
    getVideos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChangeSearchInput = event => {
    setSearchInput(event.target.value)
  }

  const onClickSearch = () => {
    getVideos()
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

        <RetryButton type="button" onClick={getVideos}>
          Retry
        </RetryButton>
      </StatusContainer>
    )
  }

  const renderNoVideosView = () => (
    <StatusContainer>
      <NoVideosImage
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
      />

      <h1>No Search Results Found</h1>

      <p>Try different key words or remove search filter</p>

      <RetryButton type="button" onClick={getVideos}>
        Retry
      </RetryButton>
    </StatusContainer>
  )

  const renderSuccessView = () => {
    if (videos.length === 0) {
      return renderNoVideosView()
    }

    return (
      <VideosContainer>
        {videos.map(video => (
          <li key={video.id}>
            <VideoCard video={video} isDarkTheme={isDarkTheme} />
          </li>
        ))}
      </VideosContainer>
    )
  }

  const renderHomeView = () => {
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
    <HomeContainer data-testid="home" isDarkTheme={isDarkTheme}>
      <Header isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />

      {showBanner && (
        <Banner data-testid="banner">
          <BannerLogo
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="nxt watch logo"
          />

          <BannerText>Buy Nxt Watch Premium prepaid plans</BannerText>

          <GetItNowButton type="button">GET IT NOW</GetItNowButton>

          <CloseButton
            type="button"
            data-testid="close"
            onClick={() => setShowBanner(false)}
          >
            ×
          </CloseButton>
        </Banner>
      )}

      <MainContent>
        <Sidebar isDarkTheme={isDarkTheme} />

        <ContentContainer>
          <ContentBody>
            <SearchContainer>
              <SearchInput
                type="search"
                value={searchInput}
                onChange={onChangeSearchInput}
                placeholder="Search"
                isDarkTheme={isDarkTheme}
              />

              <SearchButton
                type="button"
                data-testid="searchButton"
                onClick={onClickSearch}
                isDarkTheme={isDarkTheme}
              >
                🔍
              </SearchButton>
            </SearchContainer>

            {renderHomeView()}
          </ContentBody>
        </ContentContainer>
      </MainContent>
    </HomeContainer>
  )
}

export default Home
