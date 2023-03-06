import { AddMedicineds, DeleteMedicineds, EditMedicineds, fetachAllmedicineds } from "../../common/apis/medicines.apis";
import { addDoc, collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore"; 


import * as ActionTypes from "../ActionTypes"
import { db } from "../../firebase";

export const getmedicin = () => async(dispatch) => {
    // console.log("action");
    try {
        // fetch('http://localhost:3004/medicin')
        //     .then((response) => response.json())
        //     .then((data) => dispatch({ type: ActionTypes.MEDICIN_GET, payload: data }));

        // fetachAllmedicineds()
        // .then((response) => dispatch({ type: ActionTypes.MEDICIN_GET, payload: response.data }))
        const querySnapshot = await getDocs(collection(db, "medicin"));
        querySnapshot.forEach((data) => {
            console.log(`${data.id} => ${data.data()}`);
        });



    } catch (error) {

    }
}

export const postmedicin = (data) => async (dispatch) => {
    // console.log("ACTION");
    try {
        // fetch('http://localhost:3004/medicin', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data1),
        // })
        //     .then((response) => response.json())
        //     .then((data) => dispatch({ type: ActionTypes.MEDICIN_ADD, payload: data }))

        // AddMedicineds(data)
        //     .then((response) => dispatch({ type: ActionTypes.MEDICIN_ADD, payload: response.data }))

        const docRef = await addDoc(collection(db, "medicin"), data);
        console.log("Document written with ID: ", docRef.id);


    } catch (error) {

    }
}

export const putmedicin = (data) => (dispatch) => {
    try {
        // fetch('http://localhost:3004/medicin/' + data.id, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        // })
        //     .then((response) => response.json())
        //     .then((data) => dispatch({ type: ActionTypes.MEDICIN_UPDATE, payload: data }))
        EditMedicineds(data)
            .then((response) => dispatch({ type: ActionTypes.MEDICIN_UPDATE, payload: response.data }))
    } catch (error) {

    }
}

export const deletemedicin = (id) => (dispatch) => {
    console.log(id);
    try {
        // fetch('http://localhost:3004/medicin/' + id, {
        //     method: 'DELETE',
        // })

        //     .then((response) => response.json())
        //     .then(() => dispatch({ type: ActionTypes.MEDICIN_DELETE, payload: id }))
        DeleteMedicineds(id)
            .then(() => dispatch({ type: ActionTypes.MEDICIN_DELETE, payload: id }))
    } catch (error) {

    }
}