import styled from 'styled-components'

const NotFoundContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`

const NotFoundImage = styled.img`
  width: 350px;
`

const Heading = styled.h1`
  font-size: 28px;
`

const Description = styled.p`
  color: #64748b;
`

const NotFound = () => (
  <NotFoundContainer>
    <NotFoundImage
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
      alt="not found"
    />

    <Heading>Page Not Found</Heading>

    <Description>
      We are sorry, the page you requested could not be found.
    </Description>
  </NotFoundContainer>
)

export default NotFound