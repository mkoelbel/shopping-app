import React, { createContext, useReducer } from 'react';

// 5. reducer - updates the state based on the action
export const AppReducer = (state, action) => {
    let new_expenses = [];
    switch(action.type) {
        case 'ADD_QUANTITY':
            let updated_qty = false;
            state.expenses.map((expense) => {
                if(expense.name === action.payload.name) {
                    expense.quantity = expense.quantity + action.payload.quantity;
                    updated_qty = true;
                }
                new_expenses.push(expense);
                return true;
            })
            state.expenses = new_expenses;
            action.type = 'DONE';
            return {
                ...state,
            };

        case 'REDUCE_QUANTITY':
            state.expenses.map((expense) => {
                if(expense.name === action.payload.name) {
                    expense.quantity = expense.quantity - action.payload.quantity;
                }
                expense.quantity = expense.quantity < 0 ? 0 : expense.quantity;
                new_expenses.push(expense);
                return true;
            })
            state.expenses = new_expenses;
            action.type = 'DONE';
            return {
                ...state,
            };

        case 'DELETE_ITEM':
            state.expenses.map((expense) => {
                if(expense.name === action.payload.name) {
                    expense.quantity = 0;
                }
                new_expenses.push(expense);
                return true;
            })
            state.expenses = new_expenses;
            action.type = 'DONE';
            return {
                ...state,
            };

        case 'CHANGE_LOCATION':
            action.type = 'DONE';
            state.location = action.payload;
            return {
                ...state,
            };

        default:
            return state;

    }
};

// 1. initial state - when the app loads
const initialState = {
    expenses: [
        { id: 'shirt', name: 'Shirt', quantity: 0, unitPrice: 24 },
        { id: 'jeans', name: 'Jeans', quantity: 0, unitPrice: 24 },
        { id: 'dress', name: 'Dress', quantity: 0, unitPrice: 42 },
        { id: 'dinner_set', name: 'Dinner Set', quantity: 0, unitPrice: 60 },
        { id: 'bag', name: 'Bag', quantity: 0, unitPrice: 12 }
    ],
    location: '$'
};

// 2. context - imported by components to get the state
export const AppContext = createContext();

// 3. provider - wraps the components which need access to the state
// accepts children (nested/wrapped components)
export const AppProvider = (props) => {
    // 4. app state - takes reducer and initial state
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const totalExpenses = state.expenses.reduce((total, item) => {
        return (total = total + (item.unitPrice * item.quantity));
    }, 0);
    state.CartValue = totalExpenses;

    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                CartValue: state.CartValue,
                dispatch,
                location: state.location
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};