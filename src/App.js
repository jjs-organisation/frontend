import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from "./pages/index";
import Hosting from "./pages/hosting/hosting";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route exact path='/' element={<Index />}>

              </Route>
              <Route exact path='/hosting' element={<Hosting />}>

              </Route>
              <Route path='*'>

              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
