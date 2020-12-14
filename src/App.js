import './App.css';
import MainPage from './components/MainPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Navbar } from 'react-bootstrap';
import DetalhesJogador from './components/jogador/DetalhesJogador';
import DetalhesTime from './components/time/DetalhesTime';
import DetalhesJogo from './components/jogo/DetalhesJogo';

function App() {
  return (

    <main>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="/logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
                    Minha Partida FC
                </Navbar.Brand>
      </Navbar>
      <section>
        <BrowserRouter>
          <Switch>
            <Route exact path="/jogador/:id" component={DetalhesJogador} />
            <Route exact path="/time/:id" component={DetalhesTime} />
            <Route exact path="/jogo/:id" component={DetalhesJogo} />
            <Route path='/'>
              <MainPage></MainPage>
            </Route>
          </Switch>
        </BrowserRouter>
      </section>
    </main>
  );
}

export default App;
