import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount, reset, incrementAsync } from "../state/counter/counterSlice";

const Counter = () => {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();
    return (
    <div>
        <h2>{count}</h2>
        <div>
            <button onClick = {() => dispatch(increment())}>increment</button>
            <button onClick = {() => dispatch(decrement())}>decrement</button>
            <button onClick = {() => dispatch(reset())}>reset</button>

            <button onClick = {() => dispatch(incrementAsync(100))}>incrementByAmount</button>


        </div>
    </div>
    )
};
export default Counter;