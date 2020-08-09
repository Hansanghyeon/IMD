import React from "react";
import logo from "./logo.svg";
import "./App.css";

const api2 = async (url, timeout = 50000, info = {}) => {
  let id = -1;
  const v = await Promise.race([
    new Promise((res) => (id = window.setTimeout((_) => res(), timeout))),
    fetch(new Request(url, info)),
  ]);
  if (v instanceof Response) {
    clearTimeout(id);
    if (v.status === 404) throw new Error("404");
    return await v.json();
  } else throw new Error("timeout");
};

const infinity = async function* (cat) {
  let page = -1;
  do {
    try {
      const { nextPage, items } = await api2(
        `http://localhost:8080/list/${cat}/${page === -1 ? "" : page}`
      );
      page = nextPage;
      yield items;
    } catch (error) {
      return;
    }
  } while (page !== -1);
};
const notice = infinity("notice");
(async () => {
  const { value, done } = await notice.next();
  if (!done) console.log(value);
})();

function App() {
  const hendleClick = async () => {
    const { value, done } = await notice.next();
    if (!done) console.log(value);
    else console.log(value, done);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <ul></ul>
        <button onClick={hendleClick}>lead more</button>
      </header>
    </div>
  );
}

export default App;
