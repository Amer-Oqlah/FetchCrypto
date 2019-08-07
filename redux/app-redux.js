import {createStore,applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';




const initialState = {
    crypto: []
 
};
///////////////// initial 

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "fetch": 
            return { ...state, crypto: action.crypto };

        default:
            return state;
    };
}
///////////////////////////////////// reducer

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export { store };
/////////////////////////////////////// store
const fetchdata = (data) => {
    return {
        type: "fetch",
        crypto: data,
    };
}
////////////////////////////////// Action creator 
export {fetchdata};