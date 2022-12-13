import {
  FETCH_DATA,
  FETCH_DATA_BY_ID,
  ADD_DATA,
  EDIT_DATA,
  DELETE_DATA,
} from "../actions/actionType";

const initialState = {
  results: [],
  result: {},
  updateData: [],
  deleteData: [],
};

function dataReducer(state = initialState, action) {
  if (action.type === FETCH_DATA) {
    return { ...state, results: action.payload };
  } else if (action.type === FETCH_DATA_BY_ID) {
    return { ...state, result: action.payload };
  } else if (action.type === ADD_DATA) {
    return { ...state, results: [...state.results, action.payload] };
  } else if (action.type === EDIT_DATA) {
    return { ...state, updateData: action.payload };
  } else if (action.type === DELETE_DATA) {
    return { ...state, deleteData: action.payload };
  } else {
    return state;
  }
}

export default dataReducer;
