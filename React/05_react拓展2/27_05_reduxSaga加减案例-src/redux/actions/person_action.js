import { ADD_PERSON } from "../constant"

export const addPerson = (person) => ({ type: ADD_PERSON, data: person })