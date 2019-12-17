const clickDateType = "CLICK_DATE";
const getSerialsType = "GET_SERIALS";
const initialState = {serials: ''}; 

export const actionCreators = {   
    
    clickDate: (value) => async (dispatch, getState) => {          
        dispatch({type: clickDateType, payload: value});
    },

    getSerials: (data) => async dispatch=> { 
       dispatch({ type: getSerialsType, payload: data });
    },
}
 
export const reducer = (state, action) => {
  state = state || initialState;

  switch (action.type) {

    case clickDateType:
        return {...state, selectDate: action.payload}

    case getSerialsType:
        return{...state, serials: action.payload}

    default:
        return state;
    }
};

