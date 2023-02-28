import { deletemedicin, putmedicin } from "../../redux/action/medicin.action"
import {  deleteRequest, getRequest, postRequest, putRequest } from "../request"

export const fetachAllmedicineds = () => {
    return getRequest('medicin')
}   

export const AddMedicineds = (data) => {
    return postRequest('medicin', data)
}

export const EditMedicineds = (data) => {
    return putRequest('medicin/', data)
}

export const DeleteMedicineds = (id) => {
    return deleteRequest('medicin/', id)
}