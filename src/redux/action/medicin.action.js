import { AddMedicineds, DeleteMedicineds, EditMedicineds, fetachAllmedicineds } from "../../common/apis/medicines.apis";
import { addDoc, collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";




import * as ActionTypes from "../ActionTypes"
import { db } from "../../firebase";

export const getmedicin = () => async (dispatch) => {
    // console.log("action");
    try {
        // fetch('http://localhost:3004/medicin')
        //     .then((response) => response.json())
        //     .then((data) => dispatch({ type: ActionTypes.MEDICIN_GET, payload: data }));

        // fetachAllmedicineds()
        // .then((response) => dispatch({ type: ActionTypes.MEDICIN_GET, payload: response.data }))
        const querySnapshot = await getDocs(collection(db, "medicin"));

        let data = []

        querySnapshot.forEach((doc) => {

            data.push({
                id: doc.id,
                ...doc.data()
            })

            dispatch({ type: ActionTypes.MEDICIN_GET, payload: data })
            // console.log(`${doc.id} => ${doc.data()}`);
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

        dispatch({ type: ActionTypes.MEDICIN_ADD, payload: { id: docRef.id, ...data } })

    } catch (error) {

    }
}

export const putmedicin = (data) => async (dispatch) => {
    console.log(data);
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


        // EditMedicineds(data)
        //     .then((response) => dispatch({ type: ActionTypes.MEDICIN_UPDATE, payload: response.data }))

        const washingtonRef = doc(db, "medicin", data.id);  

        await updateDoc(washingtonRef, data);

        dispatch({ type: ActionTypes.MEDICIN_UPDATE, payload:data})

    } catch (error) {

    }
}

export const deletemedicin = (id) => async (dispatch) => {
    console.log(id);
    try {
        // fetch('http://localhost:3004/medicin/' + id, {
        //     method: 'DELETE',
        // })

        //     .then((response) => response.json())
        //     .then(() => dispatch({ type: ActionTypes.MEDICIN_DELETE, payload: id }))


        // DeleteMedicineds(id)
        //     .then(() => dispatch({ type: ActionTypes.MEDICIN_DELETE, payload: id }))



        await deleteDoc(doc(db, "medicin", id));


        dispatch({ type: ActionTypes.MEDICIN_DELETE, payload: id })

    } catch (error) {

    }
}   