import {
  baseURL,
  FETCH_DATA,
  FETCH_DATA_BY_ID,
  ADD_DATA,
  EDIT_DATA,
  DELETE_DATA,
} from "./actionType";

export const fetchDataAction = (payload) => {
  return {
    type: FETCH_DATA,
    payload,
  };
};

export const fetchDataByIdAction = (payload) => {
  return {
    type: FETCH_DATA_BY_ID,
    payload,
  };
};

export const addDataAction = (payload) => {
  return {
    type: ADD_DATA,
    payload,
  };
};

export const editDataAction = (payload) => {
  return {
    type: EDIT_DATA,
    payload,
  };
};

export const deleteDataAction = (payload) => {
  return {
    type: DELETE_DATA,
    payload,
  };
};

export const fetchData = () => {
  return (dispatch) => {
    return fetch(`${baseURL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(fetchDataAction(data));
      });
  };
};

export const fetchDataById = (id) => {
  return (dispatch) => {
    return fetch(`${baseURL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(fetchDataByIdAction(data));
      });
  };
};

export const addData = (bodyToAdd) => {
  return (dispatch) => {
    return fetch(`${baseURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyToAdd,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(addDataAction(bodyToAdd));
        return data;
      });
  };
};

export const editData = (bodyToEdit, id) => {
  return (dispatch) => {
    return fetch(`${baseURL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyToEdit,
    })
      .then((response) => {
        if (!response.ok) {
          console.log(id)
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(editDataAction(bodyToEdit));
        return data;
      });
  };
};

export const deleteData = (id) => {
  return (dispatch) => {
    return fetch(`${baseURL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(deleteDataAction(data.data));
        return data;
      });
  };
};
