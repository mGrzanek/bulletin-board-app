const initialState = {
  status: localStorage.getItem("status") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  ads: JSON.parse(localStorage.getItem("ads")) || [],
};

export default initialState;
