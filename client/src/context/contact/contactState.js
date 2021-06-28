import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
    GET_CONTACT,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    CONTACT_ERROR,
    FILTER_CONTACT,
    CLEAR_CONTACT,
    CLEAR_FILTER,
} from '../types';


const ContactState = props => {
    const initialState = {
        contacts: null
        // {
        //     "id": 1,
        //     "name": "John Doe",
        //     "email": "jdoe@gmail.com",
        //     "phone": "111-111-1111",
        //     "type": "personal"
        // },
        // {
        //     "id": 2,
        //     "name": "Sara Smite",
        //     "email": "ssmite@gmail.com",
        //     "phone": "123-123-1234",
        //     "type": "personal"
        // },
        // {
        //     "id": 3,
        //     "name": "Alan White",
        //     "email": "alan@gmail.com",
        //     "phone": "222-222-2222",
        //     "type": "professional"
        // }
        ,
        current: null,
        filtered: null,
        error: null,
        loading: false
    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    //Get Contact
    const getContacts = async () => {

        try {
            const res = await axios.get('api/contacts');
            dispatch({
                type: GET_CONTACT,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }
    }

    //Add Contact
    const addContact = async contact => {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('api/contacts', contact, config);
            dispatch({ type: ADD_CONTACT, payload: res.data });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }
    }

    //Delete Contact

    const deleteContact = async id => {
        try {
            await axios.delete(`api/contacts/${id}`);
            dispatch({ type: DELETE_CONTACT, payload: id });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }

    }

    //Update Contact
    const updateContact = async contact => {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.put(`api/contacts/${contact._id}`, contact, config);
            dispatch({ type: UPDATE_CONTACT, payload: res.contact });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }
        dispatch({ type: UPDATE_CONTACT, payload: contact });
    }

    // Clear Contact

    const clearContext = () => {
        dispatch({ type: CLEAR_CONTACT });
    }

    //Set Current Contact

    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact });
    }


    //Clear Current Contact

    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    }


    //Filter Contact
    const filterContact = contact => {
        dispatch({ type: FILTER_CONTACT, payload: contact });
    }

    //Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    }

    return (<ContactContext.Provider value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getContacts,
        addContact,
        deleteContact,
        clearContext,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContact,
        clearFilter
    }}>
        {props.children}
    </ContactContext.Provider>);
};

export default ContactState;

