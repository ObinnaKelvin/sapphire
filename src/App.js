import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './View/pages/home/Home';
import AboutUs from './View/pages/about/AboutUs';
import Blog from './View/pages/blog/Blog';
// import Gallery from './View/pages/gallery/Gallery'
// import Contact from './View/pages/contact/Contact'
// import BookPage from './View/pages/bookPage/BookPage'
import './App.scss'

function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about-us' element={<AboutUs />}/>
          <Route path='/blog' element={<Blog />}/>
          {/* <Route path='/gallery' element={<Gallery />}/>
          <Route path='/contact-us' element={<Contact />}/>
          <Route path='/book-appointment' element={<BookPage />}/> */}
        </Routes>
    </Router>
  );
}

export default App;
