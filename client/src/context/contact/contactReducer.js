import {
    GET_CONTACT,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    CONTACT_ERROR,
    FILTER_CONTACT,
    CLEAR_FILTER,
    CLEAR_CONTACT,
} from '../types';

const ContactReducer = (state, action) => {
    switch (action.type) {
        case GET_CONTACT:
            return {
                ...state,
                contacts: action.payload,
                loading: false
            };
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [action.payload, ...state.contacts],
                loading: false
            };
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(
                    contact => contact._id !== action.payload
                ),
                loading: false
            };
        case CLEAR_CONTACT:
            return {
                ...state,
                contacts: null,
                filter: null,
                error: null,
                current: null
            }
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact =>
                    contact._id === action.payload._id ? action.payload : contact),
                loading: false
            };
        case CONTACT_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            };
        case FILTER_CONTACT:
            return {
                ...state,
                filtered: state.contacts.filter(contact => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return contact.name.match(regex) || contact.email.match(regex);
                })
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            };
        default:
            return state;
    };
}

export default ContactReducer;