import {Link, useHistory} from 'react-router-dom'
import {FiMoon, FiSun} from 'react-icons/fi'
import styled from 'styled-components'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 25px;
  background-color: ${props =>
    props.isDarkTheme ? '#212121' : '#ffffff'};
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
`

const ThemeButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${props =>
    props.isDarkTheme ? '#ffffff' : '#000000'};
  font-size: 24px;
  cursor: pointer;
`

const LogoutButton = styled.button`
  background-color: transparent;
  border: 1px solid #2563eb;
  color: #2563eb;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
`

const LogoutPopup = styled.div`
  background-color: ${props =>
    props.isDarkTheme ? '#212121' : '#ffffff'};
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  min-width: 320px;
`

const PopupText = styled.p`
  color: ${props =>
    props.isDarkTheme ? '#ffffff' : '#181818'};
  font-size: 16px;
  margin-bottom: 25px;
`

const PopupButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`

const CancelButton = styled.button`
  background-color: transparent;
  border: 1px solid #64748b;
  color: #64748b;
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
`

const ConfirmButton = styled.button`
  background-color: #2563eb;
  border: none;
  color: #ffffff;
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
`

const Header = ({isDarkTheme, toggleTheme}) => {
  const history = useHistory()

  const handleLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <HeaderContainer isDarkTheme={isDarkTheme}>
      <Link to="/">
        <img
          src={
            isDarkTheme
              ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
              : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          }
          alt="website logo"
        />
      </Link>

      <RightSection>
        <ThemeButton
          type="button"
          data-testid="theme"
          isDarkTheme={isDarkTheme}
          onClick={toggleTheme}
        >
          {isDarkTheme ? <FiSun /> : <FiMoon />}
        </ThemeButton>

        <ProfileImage
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
          alt="profile"
        />

        <Popup
          modal
          trigger={
            <LogoutButton type="button">
              Logout
            </LogoutButton>
          }
        >
          {close => (
            <LogoutPopup isDarkTheme={isDarkTheme}>
              <PopupText isDarkTheme={isDarkTheme}>
                Are you sure, you want to logout
              </PopupText>

              <PopupButtons>
                <CancelButton
                  type="button"
                  onClick={close}
                >
                  Cancel
                </CancelButton>

                <ConfirmButton
                  type="button"
                  onClick={handleLogout}
                >
                  Confirm
                </ConfirmButton>
              </PopupButtons>
            </LogoutPopup>
          )}
        </Popup>
      </RightSection>
    </HeaderContainer>
  )
}

export default Header