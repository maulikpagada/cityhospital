import * as ActionTypes from "../ActionTypes"

const initialState = {
    isLoading: false,
    doctor: [],
    error: null,
}


export const doctorReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case ActionTypes.DOCTOR_GET:
            return {
                ...state,
                doctor: action.payload
            }

        case ActionTypes.DOCTOR_ADD:
            return {
                ...state,
                doctor: state.doctor.concat(action.payload)
            }

        case ActionTypes.DOCTOR_UPDATE:
            let uData = state.doctor.map((a) => {
                if (a.id === action.payload.id) {
                    return action.payload
                } else {
                    return a;
                }
            })
            return {
                ...state,
                doctor: uData
            }

        case ActionTypes.DOCTOR_DELETE:
            let dData = state.doctor.filter((m) => m.id !== action.payload)

            return {
                ...state,
                doctor: dData
            }

        default:
            return state
    }
}