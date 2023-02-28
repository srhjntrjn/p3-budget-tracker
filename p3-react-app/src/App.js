import React, { useReducer } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ExpenseProvider } from './context/ExpenseContext';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Navigation from './components/Navigation';

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return { ...state, expenses: [...state.expenses, action.payload] };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, { expenses: [] });

  return (
    <ExpenseProvider value={{ state, dispatch }}>
      <Router>
        <div className="container">
          <Navigation />
          <Routes>
            <Route exact path="/" component={ExpenseList} />
            <Route path="/add" component={ExpenseForm} />
          </Routes>
        </div>
      </Router>
    </ExpenseProvider>
  );
}

export default App;
