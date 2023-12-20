import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $Services from "../../network/Services";

const initialState = {
    homeTypeList: [],
    livingTypeList: [],
    sharingTypeList: [],
    priceRangeList: [],
    propertyList:[],
    status: 'idle',
}
    
export const fetchHomeType = createAsyncThunk('master/fetchHomeType', async () => {
  const response = await $Services.getHomeType();
  return response.data;
});

export const fetchLivingType = createAsyncThunk('master/fetchLivingType', async () => {
  const response = await $Services.getLivingType();
  return response.data;
});

export const fetchSharingType = createAsyncThunk('master/fetchSharingType', async () => {
  const response = await $Services.getSharingType();
  return response.data;
});

export const fetchPriceType = createAsyncThunk('master/fetchPriceType', async () => {
  const response = await $Services.getPriceType();
  return response.data;
});

export const fetchPropertyList = createAsyncThunk('property/get', async () => {
  console.log('callapicallapi')
  const response = await $Services.getPropertyList();
  console.log('response of get property ',response)
  return response.data;
});


export const masterApiSlice = createSlice({
    name: 'master',
    initialState,
    extraReducers: (builder) => {
        builder
          .addCase(fetchHomeType.fulfilled, (state, action) => {
              console.log('actionsactions',action)
              state.homeTypeList = action.payload;
            })
            .addCase(fetchLivingType.fulfilled, (state, action) => {
                console.log('actionsactions',action)
                state.livingTypeList = action.payload;
            })
            .addCase(fetchSharingType.fulfilled, (state, action) => {
              console.log('actionsactions',action)
              state.sharingTypeList = action.payload;
            })
            .addCase(fetchPriceType.fulfilled, (state, action) => {
              console.log('actionsactions',action)
            state.priceRangeList = action.payload;
          }).addCase(fetchPropertyList.fulfilled, (state, action) => {
            console.log('actionsactions',action)
            state.propertyList = action.payload;
        });
      },
})
export const {setHomeTypeList,setLivingTypeList,setSharingTypeList,setPriceRangeList}=masterApiSlice.actions
export default masterApiSlice.reducer