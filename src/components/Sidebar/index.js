import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import {AiFillHome, AiFillFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'

const SidebarContainer = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#212121' : '#ffffff')};
  min-height: calc(100vh - 80px);
  width: 220px;
  padding: 20px 0;
`

const NavItemsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`

const SidebarLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 14px 20px;
  text-decoration: none;

  color: ${props => (props.isDarkTheme ? '#ffffff' : '#000000')};

  &.active {
    background-color: ${props => (props.isDarkTheme ? '#383838' : '#ebebeb')};
  }
`

const NavText = styled.p`
  margin: 0;
  font-size: 15px;
  font-weight: 500;
`

const ContactSection = styled.div`
  padding: 30px 20px;
`

const ContactText = styled.p`
  font-weight: 600;
`

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
  margin: 20px 0;

  img {
    width: 30px;
    height: 30px;
  }
`

const Description = styled.p`
  line-height: 1.5;
`

const Sidebar = ({isDarkTheme}) => (
  <SidebarContainer isDarkTheme={isDarkTheme}>
    <NavItemsList>
      <li>
        <SidebarLink exact to="/" isDarkTheme={isDarkTheme}>
          <AiFillHome size={22} />
          <NavText>Home</NavText>
        </SidebarLink>
      </li>

      <li>
        <SidebarLink to="/trending" isDarkTheme={isDarkTheme}>
          <AiFillFire size={22} />
          <NavText>Trending</NavText>
        </SidebarLink>
      </li>

      <li>
        <SidebarLink to="/gaming" isDarkTheme={isDarkTheme}>
          <SiYoutubegaming size={22} />
          <NavText>Gaming</NavText>
        </SidebarLink>
      </li>

      <li>
        <SidebarLink to="/saved-videos" isDarkTheme={isDarkTheme}>
          <BiListPlus size={22} />
          <NavText>Saved Videos</NavText>
        </SidebarLink>
      </li>
    </NavItemsList>

    <ContactSection>
      <ContactText>CONTACT US</ContactText>

      <SocialIcons>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
          alt="facebook logo"
        />

        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
          alt="twitter logo"
        />

        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
          alt="linked in logo"
        />
      </SocialIcons>

      <Description>
        Enjoy! Now to see your channels and recommendations!
      </Description>
    </ContactSection>
  </SidebarContainer>
)

export default Sidebar
