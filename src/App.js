import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Index from "./pages/index";
import Hosting from "./pages/hosting/hosting";
import Layout from "./layout";
import HostApp from "./apps/host-app/hostapp";
import LayoutHostApp from "./apps/host-app/layout";
import IndexHostApp from "./apps/host-app/app-pages/index-hostapp";
import NotFoundHostApp from "./apps/host-app/app-pages/notfound";
import Editor from "./apps/html-editor/editor.tsx";
import {Search} from "react-router";
import Services from "./apps/services/services";
import Profile from "./pages/profile/profile";
import View from "./apps/html-viewer/view";
import Indexapi_ from "./pages/api_page/indexapi_";
import ForumRouting from "./apps/forum/forum-routing";

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

function App() {

  const  IndexHeader = () => (
      <>
          <a href="/dev"> development </a>
          <a href="/api">api</a>
          <a href="#pricing">pricing</a>
          <a href="#contacts">contacts</a>
      </>
  )

  const HostingHeader = () => (
      <>
          <a href="#b12">nodejs api</a>
          <a href="#b5">about</a>
      </>
  )

  const NotFoundHeader = () => (
      <>
          <a href="/"> to main </a>
      </>
  )

  const ProfileHeader = () => (
      <>
          <a href="/"> to main </a>
          <a href="/services/"> to services </a>
      </>
  )

  function Routing() {
      const query = useQuery()
      return (
          <Routes>
              <Route exact path='/' element={
                  <Layout inner={<Index/>}
                          Head={<IndexHeader/>}
                  />}>
              </Route>
              <Route exact path='/api' element={
                  <Layout inner={<Hosting/>}
                          Head={<HostingHeader/>}
                  />}>
              </Route>
              <Route path='/view' element={
                  <View project_id={query.get("content")} project_name={query.get("name")}/>
              }>
              </Route>
              <Route exact path='/profile' element={
                  <Profile Head={<ProfileHeader/>}/>
              }>
              </Route>
              <Route path='/forum/*' element={<ForumRouting />} />
              <Route path='/userapi/*' element={<Indexapi_ />}/>
              <Route path='/editor' element={<Editor/>}/>
              <Route path='/services/*' element={<Services/>}/>
              <Route path='/host-app/*' element={<HostApp/>}/>
              <Route path='*' element={<Layout inner={<NotFoundHostApp/>}
                                               Head={<NotFoundHeader/>}
              />}/>
          </Routes>
      )
  }

  return (
      <BrowserRouter>
          <Routing />
      </BrowserRouter>
  );
}

export default App;
