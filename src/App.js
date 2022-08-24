import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cart from './components/Cart';
import Header from './components/Header';
import Home from './components/Home';
import Context from './Context/Context';
import ToggleColorMode from './Context/Theme';

function App() {
  return (
      <ToggleColorMode>
        <Context>
          <BrowserRouter>
            <Header />
            <div className="App">
              <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/cart' exact element={<Cart />} />
              </Routes>
            </div>
          </BrowserRouter>
        </Context>
      </ToggleColorMode>
  );
}

export default App;
