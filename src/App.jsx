import React, { useState } from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import { Gallery } from './components/Gallery';
import { MyPhotos } from './components/MyPhotos';
import { getStoredPhotos } from './storage';
import { Header } from './components/Header';

export const App = () => {
  const [pinedPhotos, setPinedPhotos] = useState(getStoredPhotos());

  return (
    <div className="App">
      <Header pinedPhotosLength={pinedPhotos.length} />

      <h1 className="App__title">
        Lorem Picsum
      </h1>

      <Switch>
        <Route exact path="/">
          <Gallery
            pinedPhotos={pinedPhotos}
            pinPhoto={setPinedPhotos}
          />
        </Route>

        <Route path="/my-photos">
          <MyPhotos
            pinedPhotos={pinedPhotos}
            setPinedPhotos={setPinedPhotos}
          />
        </Route>
      </Switch>

      <footer className="App__footer">
        Copyright 2020 · All rights reserved
      </footer>
    </div>
  );
};
