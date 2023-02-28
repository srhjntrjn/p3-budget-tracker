import React, { useContext } from 'react';
import { ExpenseContext } from './ExpenseContext';

const ExpenseList = () => {
  const { expenses, dispatch } = useContext(ExpenseContext);

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_EXPENSE', payload: { id } });
  };

  return (
    <div>
      <h2>Expense List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.name}</td>
              <td>{expense.amount}</td>
              <td>
                <button onClick={() => handleDelete(expense.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
