export function setData(payload) {
  return {
    type: "REGISTER_USER",
    payload,
  }
}

export function companyList() {
  return (dispatch) => {
    const company = [
      "Brewed Delight",
      "Noah's Coffee",
      "Royal Coffee",
      "Cup of Magic",
    ]

    dispatch({ type: "REGISTER_BUILDER", payload: company })
  }
}

export function applyPosition() {
  return (dispatch) => {
    const position = [
      "Check All",
      "Backend Developer",
      "Frontend Developer",
      "Quality Assurance",
      "Devops",
    ]

    dispatch({ type: "REGISTER_POSITION", payload: position })
  }
}

export function dispatchData(payload) {
  return (dispatch) => {
    dispatch(setData(payload))
  }
}
