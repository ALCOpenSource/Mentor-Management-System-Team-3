import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState, useAppSelector } from "../Store";
import { selectCurrentUserToken } from "./current-user-slice";
import {
  ActiveProgram,
  ProgramOverview,
  ReportsOverview,
  TasksOverview,
} from "../types/dashboard-types";
import {
  fetchDashboardActiveProgramsApiAsync,
  fetchDashboardProgramsOverviewApiAsync,
  fetchDashboardReportsOverviewApiAsync,
  fetchDashboardTasksApiAsync,
} from "../../axios/api-services/dashboard";

interface CurrentDashboardState {
  activePrograms: ActiveProgram[];
  programOverviews: ProgramOverview[];
  reportsOverviews: ReportsOverview[];
  tasks: TasksOverview[];
}

function getEmptyDashboards(): CurrentDashboardState {
  return {
    activePrograms: [],
    programOverviews: [],
    reportsOverviews: [],
    tasks: [],
  };
}

const initialState: CurrentDashboardState = getEmptyDashboards();
export const fetchActivePrograms = createAsyncThunk(
  "current-dashboard/fetch-all-active-programs",
  async (thunkAPI) => {
    return await fetchDashboardActiveProgramsApiAsync(
      useAppSelector(selectCurrentUserToken)
    );
  }
);

export const fetchProgramsOverview = createAsyncThunk(
  "current-dashboard/fetch-all-programs-overview",
  async (thunkAPI) => {
    return await fetchDashboardProgramsOverviewApiAsync(
      useAppSelector(selectCurrentUserToken)
    );
  }
);

export const fetchReportsOverview = createAsyncThunk(
  "current-dashboard/fetch-all-reports-overview",
  async (thunkAPI) => {
    return await fetchDashboardReportsOverviewApiAsync(
      useAppSelector(selectCurrentUserToken)
    );
  }
);

export const fetchTasks = createAsyncThunk(
  "current-dashboard/fetch-all-tasks",
  async (thunkAPI) => {
    return await fetchDashboardTasksApiAsync(
      useAppSelector(selectCurrentUserToken)
    );
  }
);

export const DashboardSlice = createSlice({
  name: "current-dashboard",
  initialState,
  reducers: {
    updateDashboardActiveProgramsAction: (
      state,
      action: PayloadAction<ActiveProgram[] | undefined>
    ) => {
      state.activePrograms = action.payload ?? [];
    },
    updateDashboardProgramsOverviewAction: (
      state,
      action: PayloadAction<ProgramOverview[] | undefined>
    ) => {
      state.programOverviews = action.payload ?? [];
    },
    updateDashboardReportsOverviewAction: (
      state,
      action: PayloadAction<ReportsOverview[] | undefined>
    ) => {
      state.reportsOverviews = action.payload ?? [];
    },
    updateDashboardTasksAction: (
      state,
      action: PayloadAction<TasksOverview[] | undefined>
    ) => {
      state.tasks = action.payload ?? [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchActivePrograms.fulfilled, (state, action) => {
      state.activePrograms = action.payload ?? [];
    });

    builder.addCase(fetchActivePrograms.rejected, (state, action) => {
      throw action.error;
    });

    builder.addCase(fetchProgramsOverview.fulfilled, (state, action) => {
      state.programOverviews = action.payload ?? [];
    });

    builder.addCase(fetchProgramsOverview.rejected, (state, action) => {
      throw action.error;
    });

    builder.addCase(fetchReportsOverview.fulfilled, (state, action) => {
      state.reportsOverviews = action.payload ?? [];
    });

    builder.addCase(fetchReportsOverview.rejected, (state, action) => {
      throw action.error;
    });

    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload ?? [];
    });

    builder.addCase(fetchTasks.rejected, (state, action) => {
      throw action.error;
    });
  },
});

const selectSelf = (state: RootState) => state.dashboard;

export const selectCurrentDashboardActivePrograms = createSelector(
  [selectSelf],
  (notification): ActiveProgram[] => notification.activePrograms
);

export const selectCurrentDashboardProgramOverviews = createSelector(
  [selectSelf],
  (notification): ProgramOverview[] => notification.programOverviews
);

export const selectCurrentDashboardReportOverviews = createSelector(
  [selectSelf],
  (notification): ReportsOverview[] => notification.reportsOverviews
);

export const selectCurrentDashboardTasks = createSelector(
  [selectSelf],
  (notification): TasksOverview[] => notification.tasks
);

export default DashboardSlice.reducer;
export const {
  updateDashboardActiveProgramsAction,
  updateDashboardReportsOverviewAction,
  updateDashboardTasksAction,
  updateDashboardProgramsOverviewAction,
} = DashboardSlice.actions;
