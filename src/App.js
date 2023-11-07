import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from "./pages/index";
import Hosting from "./pages/hosting/hosting";
import Layout from "./layout";
import HostApp from "./apps/host-app/hostapp";
import LayoutHostApp from "./apps/host-app/layout";
import IndexHostApp from "./apps/host-app/app-pages/index-hostapp";
import NotFoundHostApp from "./apps/host-app/app-pages/notfound";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route exact path='/' element={
                   <Layout inner={<Index/>}/>}>
              </Route>
              <Route exact path='/hosting' element={
                   <Layout inner={<Hosting/>}/>}>
              </Route>
              <Route path='/host-app/*' element={<HostApp />} />
              <Route path='*' element={<NotFoundHostApp />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
