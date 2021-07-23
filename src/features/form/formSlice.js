import { createSlice } from '@reduxjs/toolkit';

//AWS Amplify GraphQL libraries
import { API } from 'aws-amplify';
import { updateForm as updateFormMutation } from '../../graphql/mutations';

export const formSlice = createSlice({
  name: 'form',
  initialState: {      
    id: "",
    userId: "",
    screenId: "",
    screenNavigation: "", 
    percentComplete: 0,
    loanAmount: 0,        
    ineligible: false,
    forProfit: true,
    us: true,
    businessEmail: "",
    entityType: "",
    fein: "",
    noFein: false,
    ssn: "",
    tin: "",
    tinExpiration: null,
    jointTaxes: false,
    jointFirst: true,
    jointFirstSsn: "",
    jointFirstTin: "",
    businessTin: "",
    businessTinType: "",
    businessName: "",
    dba: "",
    usesDba: false,
    businessAddressId: "",
    nacis: "",
    agreeLexisNexis: false,
    fullOwner: null,
  },
  reducers: {
    updateForm: (state, action) => {
      console.log('updateForm: action', action)
      state.id = action.payload.id
      state.userId = action.payload.userId
      state.screenId = action.payload.screenId
      state.screenNavigation = action.payload.screenNavigation
      state.percentComplete = action.payload.percentComplete 
      state.loanAmount = action.payload.loanAmount    
      state.ineligible = action.payload.ineligible
      state.forProfit = action.payload.forProfit
      state.us = action.payload.us
      state.businessEmail = action.payload.businessEmail
      state.entityType = action.payload.entityType
      state.fein = action.payload.fein
      state.noFein = action.payload.noFein
      state.ssn = action.payload.ssn
      state.tin = action.payload.tin
      state.tinExpiration = action.payload.tinExpiration
      state.jointTaxes = action.payload.jointTaxes
      state.jointFirst = action.payload.jointFirst
      state.jointFirstSsn = action.payload.jointFirstSsn
      state.jointFirstTin = action.payload.jointFirstTin
      state.businessTin = action.payload.businessTin
      state.businessTinType = action.payload.businessTinType
      state.businessName = action.payload.businessName
      state.dba = action.payload.dba
      state.usesDba = action.payload.usesDba
      state.businessAddressId = action.payload.businessAddressId
      state.nacis = action.payload.nacis
      state.agreeLexisNexis = action.payload.agreeLexisNexis   
      state.fullOwner = action.payload.fullOwner
    },
    updateScreenNavigation: (state, action) => {
      state.screenNavigation = action.payload.screenNavigation
    },
    updateIneligible: (state, action) => {
      state.ineligible = action.payload.ineligible
    },
    updateForProfit: (state, action) => {
      state.forProfit = action.payload.forProfit
    },
    updateUS: (state, action) => {
      state.us = action.payload.us
    },
  },
});

export const { 
  updateForm, 
  updateIneligible,
  updateForProfit,
  updateUS,
} = formSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const updateFormAsync = form => dispatch => {
  console.log('updateFormAsync: form', form)
  API.graphql({ 
      query: updateFormMutation, 
      variables: { 
        input: {
          id: form.id,
          userId: form.userId, 
          screenId: form.screenId,
          screenNavigation: form.screenNavigation,
          loanAmount: form.loanAmount,
          percentComplete: form.percentComplete,
          ineligible: form.ineligible,
          forProfit: form.forProfit,
          us: form.us,
          businessEmail: form.businessEmail,
          entityType: form.entityType,
          fein: form.fein,
          noFein: form.noFein,
          ssn: form.ssn,
          tin: form.tin,
          tinExpiration: form.tinExpiration,
          jointTaxes: form.jointTaxes,
          jointFirst: form.jointFirst,
          jointFirstSsn: form.jointFirstSsn,
          jointFirstTin: form.jointFirstTin,
          businessTin: form.businessTin,
          businessTinType: form.businessTinType,
          businessName: form.businessName,
          dba: form.dba,
          usesDba: form.usesDba,
          businessAddressId: form.businessAddressId,
          nacis: form.nacis,
          agreeLexisNexis: form.agreeLexisNexis,
          fullOwner: form.fullOwner,
        }
      } 
  })    
  dispatch(updateForm(form));
};


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectForm = state => state.form;

export default formSlice.reducer;