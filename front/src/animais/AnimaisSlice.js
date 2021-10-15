import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
  } from "@reduxjs/toolkit";
  import { httpGet, httpPost, httpDelete, httpPut } from "../utils";
  import { baseUrl } from "../baseUrl";
  
  const animaisAdapter = createEntityAdapter();
  
  const initialState = animaisAdapter.getInitialState({
    status: "not_loaded",
    error: null,
  });
  
  export const fetchAnimais = createAsyncThunk(
    "database/fetchAnimais",
    async () => {
      const result = await httpGet(`${baseUrl}/animais`);
      console.log(result);
      return result;
    }
  );
  
  export const deleteAnimaisServer = createAsyncThunk(
    "database/deleteAnimaisServer",
    async (idAnimal) => {
      await httpDelete(`${baseUrl}/animais/${idAnimal}`);
      return idAnimal;
    }
  );
  
  export const addAnimaisServer = createAsyncThunk(
    "database/addAnimaisServer",
    async (animal) => {
      return await httpPost(`${baseUrl}/animais`, animal);
    }
  );
  
  export const updateAnimaisServer = createAsyncThunk(
    "database/updateAnimaisServer",
    async (animal) => {
      return await httpPut(`${baseUrl}/animais/${animal.id}`, animal);
    }
  );
  
  export const animaisSlice = createSlice({
    name: "animais",
    initialState: initialState,
    extraReducers: {
      [fetchAnimais.pending]: (state, action) => {
        state.status = "loading";
      },
      [fetchAnimais.fulfilled]: (state, action) => {
        state.status = "loaded";
        animaisAdapter.setAll(state, action.payload);
      },
      [fetchAnimais.rejected]: (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      },
      [deleteAnimaisServer.pending]: (state) => {
        state.status = "loading";
      },
      [addAnimaisServer.pending]: (state, action) => {
        state.status = "loading";
      },
      [updateAnimaisServer.pending]: (state, action) => {
        state.status = "loading";
      },
      [deleteAnimaisServer.fulfilled]: (state, { payload: id }) => {
        state.status = "deleted";
        animaisAdapter.removeOne(state, id);
      },
      [addAnimaisServer.fulfilled]: (state, action) => {
        state.status = "saved";
        animaisAdapter.addOne(state, action.payload);
      },
      [updateAnimaisServer.fulfilled]: (state, action) => {
        state.status = "saved";
        animaisAdapter.upsertOne(state, action.payload);
      },
    },
  });
  
  export default animaisSlice.reducer;
  
  export const {
    selectAll: selectAllAnimais,
    selectById: selectAnimaisById,
    selectIds: selectAnimaisIds,
  } = animaisAdapter.getSelectors((state) => state.animais);