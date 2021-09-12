import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import { DataProvider } from './DataProvider';
import DataContext from './DataContext';

// https://reactrouter.com/web/guides/quick-start

function App() {
  return (
    // <DataProvider>
      <div className="App">
        <body className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <DataContext.Consumer>
            {context => (
              <span>{context.Name}</span>
            )}
          </DataContext.Consumer>
        </body>
      </div>
    // </DataProvider>
  );
}

export default App;
