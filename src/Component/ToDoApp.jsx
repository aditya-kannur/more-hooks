import React, { useReducer, useRef } from "react";
import TodoItem from "./ToDoItem";

const initialState = [
    {
        data: "rough data",
        isHidden: false
    }
]

function todoReducer(state, action) {
    switch (action.type) {
        case "ADD_ITEM":
            return [...state, {
                data: action.payload,
                isHidden: false
            }]
        case "CHANGE_HIDDEN_VALUE":
            return state.map((ele, i) => {
                return i === action.payload ? { ...ele, isHidden: !ele.isHidden } : ele
            })
        default:
            return state
    }
}

function TodoApp() {
    const [todoData, dispatch] = useReducer(todoReducer, initialState)
    const inputRef = useRef(null);

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); 
            dispatch({ type: "ADD_ITEM", payload: inputRef.current.value });
            inputRef.current.value = ""; 
        }
    };

    return (
        <>
            <input
                type="text"
                placeholder="enter anything here..."
                ref={inputRef}
                onKeyDown={handleKeyPress}
            />
            <div>
                {
                    todoData.map((e, i) => (
                        <TodoItem ele={e} index={i} key={i} dispatch={dispatch} />
                    ))
                }
            </div>
            <button
                onClick={() => {
                    inputRef.current.focus();
                }}
            >Go back to writing</button>
        </>
    )
}

export default TodoApp;
