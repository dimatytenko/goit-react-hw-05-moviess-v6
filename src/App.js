import { Route, Switch } from "react-router-dom";
import Container from "./components/Container";
import Appbar from "./components/AppBar";
import "./App.css";

function App() {
  return (
    <Container>
      <Appbar />

      <Switch>
        <Route path="/" exact>
          <h1>hello</h1>
        </Route>

        <Route path="/movies">
          <h2>wckwbjckw</h2>
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
