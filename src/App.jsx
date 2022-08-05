import Tabs from "./components/Tabs/Tabs";
import './app.scss';

function App() {
  return (
    <div className="app">
      <h1 className="app__header">
        Блог и соцсети
      </h1>

      <h2 className="app__subtitle">
        Идейные соображения высшего порядка, а также сложившаяся структура организации представляет собой интересный эксперимент проверки направлений прогрессивного развития.
      </h2>

      <Tabs contentLink="https://my-json-server.typicode.com/glebov-g/frontend-fake-db/categories"/>
    </div>
  );
}

export default App;
