import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tools: {3: 5, 4: 3, 5: 4, 6: 8, 7: 2},
    selected: -1
}

const gameToolsSlice = createSlice({
    name: "tool_list",
    initialState: initialState,
    reducers: {
        setInitialTools: (state) => {
            state.tools = initialState.tools
            state.selected = initialState.selected
        },
        setTools: (state, action) => {
            state.tools[action.payload.toolInd] = action.payload.value
        },
        setSelected: (state, action) => {
            state.selected = action.payload
            console.log(action.payload)
        }
    }
})

export const selectTools = (state) => state.game_tools.tools
export const selectSelectedToolInd = (state) => state.game_tools.selected
export const {setTools, setSelected, setInitialTools} = gameToolsSlice.actions
export const gameToolsReducer = gameToolsSlice.reducer