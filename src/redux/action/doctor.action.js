import * as ActionTypes from "../ActionTypes"

export const getdoctor = () => (dispatch) => {
    console.log("action");
    try {
        fetch('http://localhost:3004/doctor/')
            .then((response) => response.json())
            .then((data) => dispatch({ type: ActionTypes.DOCTOR_GET, payload: data }));
    } catch (error) {

    }
}

export const postdoctor = (data1) => (dispatch) => {
    try{
        fetch('http://localhost:3004/doctor/',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(data1),
        })

            .then((response) => response.json())
            .then((data) => dispatch({type: ActionTypes.DOCTOR_ADD, payload: data }))
    } catch (error) {

    }
}


export const putdoctor = (data2) => (dispatch) => {
    try{
        fetch('http://localhost:3004/doctor/' + data2.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data2),
        })

            .then((response => response.json()))
            .then((data) => dispatch({ type: ActionTypes.DOCTOR_UPDATE, payload: data}))
    } catch (error) {

    }
}

export const deletedoctor = (id) => (dispatch) => {
    try{
        fetch('http://localhost:3004/doctor/' + id, {
            method: 'DELETE',
        })

            .then((response) => response.json())
            .then(dispatch({ type: ActionTypes.DOCTOR_DELETE, payload: id}))
    } catch (error) {

    }
}