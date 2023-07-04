import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../actions';

export default function Counter() {
    const dispatch = useDispatch();

    const counter = useSelector(state => state.counter);

    React.useEffect(() => {
        // Выполняется только на клиенте
        console.log('Client-side rendering');

        // Получаем данные из глобальной переменной
        const data = window.__INITIAL_STATE__;

        // Если есть данные, диспатчим экшен
        if (data) {
            dispatch({ type: 'SET_DATA', payload: data });
        }
    }, []);

    const handleIncrement = () => {
        dispatch(increment());
    };

    const handleDecrement = () => {
        dispatch(decrement());
    };

    return (
        <div>
            <h1>Counter: {counter.counter}</h1>
            <button onClick={handleIncrement}>Increment</button>
            <button onClick={handleDecrement}>Decrement</button>
        </div>
    );
}
