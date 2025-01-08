import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LineChartState {
  data: {
    id: string;
    firstFormData: any;
    secondFormData: any;
    data: any[];
  }[];
  error: string | null;
}

const initialState: LineChartState = {
  data: [],
  error: null,
};

const lineChartSlice = createSlice({
  name: "lineCharts",
  initialState,
  reducers: {
    addLineChart(
      state,
      action: PayloadAction<{
        id: string;
        firstFormData: any;
        secondFormData: any;
        data: any[];
      }>
    ) {
      if (state.data.length >= 10) {
        state.error = "You can only save up to 10 charts.";
      }
      state.data.push(action.payload);
    },
    clearLineCharts(state) {
      state.data = [];
    },
  },
});

export const { addLineChart, clearLineCharts } = lineChartSlice.actions;

export default lineChartSlice.reducer;
