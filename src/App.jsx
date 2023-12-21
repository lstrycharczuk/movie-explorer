import {Provider} from 'react-redux'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css'
import MovieList from './MovieList'
import SingleMovie from './single-movie/SingleMovie'
import store from './store'

const router = createBrowserRouter([
 {
    path: '/',
    element: <MovieList />
 },
 {
    path: '/movie/:title',
    element: <SingleMovie />
 },

])

function App() {
 return (
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
 )
}

export default App