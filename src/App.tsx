import React from 'react';
import './App.css';
import Leftboard from './comp/Leftboard';
import Rightboard from './comp/Rightboard';
import Header from './comp/Header';
import Footer from './comp/Footer';


const pers : Person  = { 
  firstName: 'ala',
    lastName: 'Makota',
    age: 4,
}

function App() {

  

  return (
    <div className= "App">
      <header>
          <Header />
      </header>
      <main>
        <Leftboard />
        <Rightboard />
        <Footer />
      </main>
      
    </div>
  );
}

export default App;
