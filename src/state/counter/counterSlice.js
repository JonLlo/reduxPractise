import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"



const initialState = {
    value: 0
};

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload

        },
        reset: (state) => {
            state.value =0

        }
    },
    extraReducers: (builder) => {
        builder.addCase(incrementAsync.fulfilled, (state, action) => {
                console.log("done")
                state.value += action.payload;
            }
            )
        .addCase(incrementAsync.pending, (
            ) => {
                console.log("pending")
           })
    }

})

export const incrementAsync = createAsyncThunk(
    "counter/incrementAsync",
    async (amount) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return amount;
    }
)

export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;

export default counterSlice.reducer


