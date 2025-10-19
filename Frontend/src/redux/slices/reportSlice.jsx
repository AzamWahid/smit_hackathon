import { createSlice } from "@reduxjs/toolkit"

const initialState = {

    reports: [],
    reportLoading: false,
    reportError: false,
      pdfModalOpen: false,
    selectedPdf: null, 
}
const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        reportFetchStart: (state) => {
            state.reportLoading = true
            state.reportError = null

        },
        reportFetchSuccess: (state, { payload }) => {
            state.reportLoading = false
            state.reportError = null
            state.reports = payload
        },
        reportFetchFailure: (state, action) => {
            state.reportLoading = false;
            state.reportError = action.payload;
        },
         reportSuccess: (state) => {
            state.reportLoading = false
            state.reportError = null
            
        },
         isPdfModal: (state, action) => {
      state.pdfModalOpen = true;
      state.selectedPdf = action.payload; // 👈 save PDF URL here
    },
    closePdfModal: (state) => {
      state.pdfModalOpen = false;
      state.selectedPdf = null;
    },

    }
})

export const { reportFetchStart, reportFetchSuccess, reportFetchFailure,reportSuccess , isPdfModal,
  closePdfModal,} = reportSlice.actions
export default reportSlice.reducer