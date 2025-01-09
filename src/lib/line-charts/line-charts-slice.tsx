import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LineChartState {
  data: {
    id: string;
    firstFormData: any;
    secondFormData: any;
    data: any[];
  }[];
  nonPersistentData: {
    id: string;
    firstFormData: any;
    secondFormData: any;
    data: any[];
  }[];
}

const initialState: LineChartState = {
  data: [],
  nonPersistentData: [],
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
      state.nonPersistentData.push(action.payload);
    },
    deleteLineChart(state, action: PayloadAction<string>) {
      const { payload: idToDelete } = action;
      const persistentIndex = state.data.findIndex(
        (singleData) => singleData.id === idToDelete
      );
      if (persistentIndex !== -1) {
        state.data.splice(persistentIndex, 1);
      }

      const nonPersistentIndex = state.nonPersistentData.findIndex(
        (singleData) => singleData.id === idToDelete
      );
      if (nonPersistentIndex !== -1) {
        state.nonPersistentData.splice(nonPersistentIndex, 1);
      }
    },
    moveToPersistant(state, action: PayloadAction<string>) {
      const { payload: idToMove } = action;
      if (state.data.length >= 10) {
      } else {
        const dataToMove = state.nonPersistentData.find(
          (singleData) => singleData.id === idToMove
        );
        if (dataToMove) {
          state.data.push(dataToMove);
          state.nonPersistentData = state.nonPersistentData.filter(
            (singleData) => singleData.id !== idToMove
          );
        }
      }
    },
    moveToNonPersistant(state, action: PayloadAction<string>) {
      const { payload: idToMove } = action;

      const dataToMove = state.data.find(
        (singleData) => singleData.id === idToMove
      );
      if (dataToMove) {
        state.nonPersistentData.push(dataToMove);
        state.data = state.data.filter(
          (singleData) => singleData.id !== idToMove
        );
      }
    },
    clearLineCharts(state) {
      state.data = [];
    },
  },
});

export const {
  addLineChart,
  clearLineCharts,
  deleteLineChart,
  moveToPersistant,
  moveToNonPersistant,
} = lineChartSlice.actions;

export default lineChartSlice.reducer;
