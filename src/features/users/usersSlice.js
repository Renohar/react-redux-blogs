import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'


const initialState = []

export const fetchUsers = createAsyncThunk('users/fetchUsers',
  async () => {
    const response = await axios.get(USERS_URL)
    return response.data
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // You can add reducer functions here if needed
  },
  extraReducers(builder){
    builder.addCase(fetchUsers.fulfilled,(state,action) => {
      return action.payload
    })
  }
});

export const selectAllUsers = (state) => state.users;
export default usersSlice.reducer;

export const selectUserById = (state,userId) => state.users.find(
  user => user.id === userId
)
