import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Index from "./pages/index";
import Layout from "./layout";
import Services from "./apps/services/services";
import View from "./apps/html-viewer/view";
import EditorMain from "./apps/editor-advanced/editor-main";

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

function App() {

  const  IndexHeader = () => (
      <>
          <a href="/editor"> editor </a>
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

  function Routing() {
      const query = useQuery()
      return (
          <Routes>
              <Route exact path='/' element={
                  <Layout inner={<Index/>}
                          Head={<IndexHeader/>}
              />}/>
              <Route path='/view' element={
                  <View project_id={query.get("content")}
                        project_name={query.get("name")}/>
              }/>
              <Route path='/exceditor' element={<EditorMain />}/>
              <Route path='/services/*' element={<Services/>}/>
              <Route path='*' element={<> not found </>

              }/>}/>
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
