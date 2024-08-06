import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/api";
import { dispatch } from "../index";
import { dailyBoostStateTypes } from "../../types/dailyBoost";

const initialState: dailyBoostStateTypes = {
    error: null,
    _id: "",
    username: "",
    daily_refill_energy: {
        refill_energy: 0,
        refill_energy_date: new Date()
    },
    daily_double_points: {
        double_points: 0,
        double_points_date: new Date()
    }
};

const dailyBoost = createSlice({
    name: "dailyBoost",
    initialState,
    reducers: {
        hasError(state, action) {
            state.error = action.payload;
        },

        getDailyBoostSuccess(state, action) {
            state._id = action.payload._id;
            state.username = action.payload.username;
            state.daily_refill_energy = action.payload.daily_refill_energy;
            state.daily_double_points = action.payload.daily_double_points;
        },

        addDailyBoostSuccess(state, action) {
            state._id = action.payload._id;
            state.username = action.payload.username;
            state.daily_refill_energy = action.payload.daily_refill_energy;
            state.daily_double_points = action.payload.daily_double_points;
        },

        updateDailyBoostSuccess(state, action) {
            state._id = action.payload._id;
            state.username = action.payload.username;
            state.daily_refill_energy = action.payload.daily_refill_energy;
            state.daily_double_points = action.payload.daily_double_points;
        },
    },
});
export default dailyBoost.reducer;

export function getDailyBoost(username: string) {
    return async () => {
        try {
            const response = await axios.get(`/dailyBoost/${username}`);
            dispatch(dailyBoost.actions.getDailyBoostSuccess(response.data));
        } catch (error) {
            dispatch(dailyBoost.actions.hasError(error));
        }
    };
}
export function addDailyBoost(username: string) {
    return async () => {
        try {
            const response = await axios.post("/dailyBoost/add", { username: username });
            dispatch(dailyBoost.actions.addDailyBoostSuccess(response.data));
        } catch (error) {
            dispatch(dailyBoost.actions.hasError(error));
        }
    }
}
export function updateRefillEnergy(username: string, refill_energy: number, refill_energy_date: moment.Moment) {
    return async () => {
        try {
            const response = await axios.post("dailyBoost/udpateRefillEnergy", { username: username, refill_energy: refill_energy, refill_energy_date: refill_energy_date });
            dispatch(dailyBoost.actions.updateDailyBoostSuccess(response.data));
        } catch (error) {
            dispatch(dailyBoost.actions.hasError(error));
        }
    }
}
export function updateDoublePoints(username: string, double_points: number, double_points_date: moment.Moment) {
    return async () => {
        try {
            const response = await axios.post("dailyBoost/updateDoublePoints", { username: username, double_points: double_points, double_points_date: double_points_date });
            dispatch(dailyBoost.actions.updateDailyBoostSuccess(response.data));
        } catch (error) {
            dispatch(dailyBoost.actions.hasError(error));
        }
    }
}