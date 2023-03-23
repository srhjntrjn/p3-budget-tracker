import { FoodIcon, GroceriesIcon, HealthIcon, RentIcon, EntertainmentIcon, BillsIcon } from "./importSvg";

const TableExpense = ({ expense, index, formatter }) => {


    return (

        <tr key={index}>

            <td>  {expense.expense} </td>
            <td>
                {expense.category === "Food" && <FoodIcon />}
                {expense.category === "Groceries" && <GroceriesIcon />}
                {expense.category === "Health/Medication" && <HealthIcon />}
                {expense.category === "Rent" && <RentIcon />}
                {expense.category === "Entertainment" && <EntertainmentIcon />}
                {expense.category === "Bills" && <BillsIcon />}
                <br></br>
                {expense.category}
            </td>
            <td>{formatter.format(expense.amount)}</td>
            <td>{expense.date}</td>
        </tr>

    );



};


export default TableExpense;