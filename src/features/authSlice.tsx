import { createSlice } from "@reduxjs/toolkit";
interface auth {
  user: string | null,
  isAuthenticated: boolean,
  token: string | null
}

const initialState: auth = {
  token: localStorage.getItem('token'),
  user: localStorage.getItem('userData'),
  isAuthenticated: !!localStorage.getItem('token')
}
export const authSlice = createSlice({
  name: "authslice",
  initialState,
  reducers: {
    storeData: (state, action) => {
      const { data } = action.payload;
      state.token = data.token;
      state.user = JSON.stringify(data);
      state.isAuthenticated = !!data.token;
      localStorage.setItem("userData", JSON.stringify(data));
      localStorage.setItem("token", data.token);
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      console.clear();
    }
  }
})
export const { storeData, logout } = authSlice.actions;
export default authSlice.reducer;