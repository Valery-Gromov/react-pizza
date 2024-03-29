import { Routes, Route } from 'react-router-dom';

import '../scss/app.scss';

import Header from './Header';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import NotFoundPage from '../pages/NotFoundPage';

function App() {

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path='/' element={ <Home /> } />
              <Route path='/cart' element={ <Cart /> } />
              <Route path='*' element={ <NotFoundPage /> } />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
