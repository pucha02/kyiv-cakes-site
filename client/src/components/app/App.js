import ProductList from "../atomic/templates/ProductList/ProductList";
import Header from "../atomic/templates/Header/Header";
import './App.css'

function App() {
  return (
    <div className="App">
      <div className="container">
        <Header/>
        <ProductList />
      </div>

    </div>
  );
}

export default App;
