import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    hcp_name: "",
    interaction_type: "",
    interaction_date: "",
    interaction_time: "",
    attendees: [],
    topics_discussed: [],
    materials_shared: [],
    sentiment: "",
    follow_up_actions: []
}

const interactionSlice = createSlice({
    name: "interaction",
    initialState,

    reducers: {

        setInteractionData: (state, action) => {

            return {
                ...state,
                ...action.payload
            }
        }
    }
})

export const { setInteractionData } = interactionSlice.actions

export default interactionSlice.reducer