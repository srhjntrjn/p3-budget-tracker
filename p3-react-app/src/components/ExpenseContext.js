import React from 'react';

const ExpenseContext = React.createContext();

function ExpenseProvider(props) {
  return <ExpenseContext.Provider value={props.value} {...props} />;
}

function useExpense() {
  const context = React.useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
}

export { ExpenseContext, ExpenseProvider };
