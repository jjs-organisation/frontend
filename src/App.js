import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from "./pages/index";
import Hosting from "./pages/hosting/hosting";
import Layout from "./layout";
import HostApp from "./apps/host-app/hostapp";
import LayoutHostApp from "./apps/host-app/layout";
import IndexHostApp from "./apps/host-app/app-pages/index-hostapp";
import NotFoundHostApp from "./apps/host-app/app-pages/notfound";
import Editor from "./apps/html-editor/editor.tsx";

function App() {
  const  IndexHeader = () => (
      <>
          <a href="/dev"> development </a>
          <a href="/hosting">hosting</a>
          <a href="#pricing">pricing</a>
          <a href="#contacts">contacts</a>
      </>
  )
  const HostingHeader = () => (
      <>
          <a href="#b12">api</a>
          <a href="#b5">about</a>
      </>
  )

  const NotFoundHeader = () => (
      <>
          <a href="/"> to main </a>
      </>
  )

  return (
      <BrowserRouter>
          <Routes>
              <Route exact path='/' element={
                   <Layout inner={<Index/>}
                           Head={<IndexHeader />}
                   />}>
              </Route>
              <Route exact path='/hosting' element={
                   <Layout inner={<Hosting/>}
                           Head={<HostingHeader />}
                   />}>
              </Route>
              <Route path='/editor' element={<Editor />}/>
              <Route path='/host-app/*' element={<HostApp />} />
              <Route path='*' element={<Layout inner={<NotFoundHostApp />}
                  Head={<NotFoundHeader />}
              />}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
