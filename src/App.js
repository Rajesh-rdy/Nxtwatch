import {Switch, Route} from 'react-router-dom'
import {useState} from 'react'
import LoginRoute from './components/LoginRoute'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoDetails from './components/VideoDetails'
import NotFound from './components/NotFound'
import './App.css'

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [savedVideosList, setSavedVideosList] = useState([])

  const toggleTheme = () => {
    setIsDarkTheme(prevState => !prevState)
  }

  return (
    <Switch>
      <LoginRoute exact path="/login" component={Login} />
      <ProtectedRoute
        exact
        path="/"
        render={props => (
          <Home
            {...props}
            isDarkTheme={isDarkTheme}
            toggleTheme={toggleTheme}
          />
        )}
      />
      <ProtectedRoute
        exact
        path="/trending"
        render={props => (
          <Trending
            {...props}
            isDarkTheme={isDarkTheme}
            toggleTheme={toggleTheme}
          />
        )}
      />

      <ProtectedRoute exact path="/gaming" render={() => <Gaming />} />

      <ProtectedRoute
        exact
        path="/videos/:id"
        render={props => (
          <VideoDetails
            {...props}
            isDarkTheme={isDarkTheme}
            toggleTheme={toggleTheme}
            savedVideosList={savedVideosList}
            setSavedVideosList={setSavedVideosList}
          />
        )}
      />

      <ProtectedRoute
        exact
        path="/saved-videos"
        render={props => (
          <SavedVideos
            {...props}
            isDarkTheme={isDarkTheme}
            toggleTheme={toggleTheme}
            savedVideosList={savedVideosList}
          />
        )}
      />

      <Route component={NotFound} />
    </Switch>
  )
}

export default App
