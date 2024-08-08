import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/api";
import { dispatch } from "../index";
import { dailyCoinsStateTypes } from "../../types/dailyCoins";

const initialState: dailyCoinsStateTypes = {
    error: null,
    _id: "",
    username: "",
    daily_coins_received_status: {
        day_1: false,
        day_2: false,
        day_3: false,
        day_4: false,
        day_5: false,
        day_6: false,
        day_7: false,
    },
    retweet_status: {
        day: new Date(),
        status: false,
    },
    comment_status: {
        day: new Date(),
        status: false,
    },
    like_status: {
        day: new Date(),
        status: false,
    },
    instagram_status: false,
    youtube_status: false,
    telegram_status: false
};

const dailyCoins = createSlice({
    name: "dailyCoins",
    initialState,
    reducers: {
        hasError(state, action) {
            state.error = action.payload
        },
        getDailyCoinsReceivedStatusSuccess(state, action) {
            state._id = action.payload._id
            state.username = action.payload.username
            state.daily_coins_received_status = action.payload.daily_coins_received_status
            state.retweet_status = action.payload.retweet_status
            state.comment_status = action.payload.comment_status
            state.like_status = action.payload.like_status
            state.instagram_status = action.payload.instagram_status
            state.youtube_status = action.payload.youtube_status
            state.telegram_status = action.payload.telegram_status
        },
        addDailyCoinsReceivedStatusSuccess(state, action) {
            state._id = action.payload._id
            state.username = action.payload.username
            state.daily_coins_received_status = action.payload.daily_coins_received_status
            state.retweet_status = action.payload.retweet_status
            state.comment_status = action.payload.comment_status
            state.like_status = action.payload.like_status
            state.instagram_status = action.payload.instagram_status
            state.youtube_status = action.payload.youtube_status
            state.telegram_status = action.payload.telegram_status
        },
        updateDailyTaskStatusSuccess(state, action) {
            state._id = action.payload._id
            state.username = action.payload.username
            state.daily_coins_received_status = action.payload.daily_coins_received_status
            state.retweet_status = action.payload.retweet_status
            state.comment_status = action.payload.comment_status
            state.like_status = action.payload.like_status
            state.instagram_status = action.payload.instagram_status
            state.youtube_status = action.payload.youtube_status
            state.telegram_status = action.payload.telegram_status
        }
    }
});
export default dailyCoins.reducer;

export function getDailyCoinsReceivedStatus(username: string) {
    return async () => {
        try {
            const response = await axios.post(`/dailyCoins/${username}`);
            dispatch(dailyCoins.actions.getDailyCoinsReceivedStatusSuccess(response.data));
        } catch (error) {
            dispatch(dailyCoins.actions.hasError(error));
        }
    }
}

export function addDailyCoinsReceivedStatus(username: string) {
    return async () => {
        try {
            const response = await axios.post("/dailyCoins/add", { username: username });
            dispatch(dailyCoins.actions.addDailyCoinsReceivedStatusSuccess(response.data));
        } catch (error) {
            dispatch(dailyCoins.actions.hasError(error));
        }
    }
}
export function updateDailyCoinsReceivedStatus(username: string, day: string, day_status: boolean) {
    return async () => {
        try {
            const response = await axios.post(`/dailyCoins/update/${username}`, { day: day, day_status: day_status });
            dispatch(dailyCoins.actions.updateDailyTaskStatusSuccess(response.data));
        } catch (error) {
            dispatch(dailyCoins.actions.hasError(error));
        }
    }
}
export function updateDailyTaskStatus(username: string, task: string, day: moment.Moment, day_status: boolean) {
    return async () => {
        try {
            const response = await axios.post(`/dailyCoins/dailyTask/update/${username}`, { task: task, day: day, day_status: day_status });
            dispatch(dailyCoins.actions.updateDailyTaskStatusSuccess(response.data));
        } catch (error) {
            dispatch(dailyCoins.actions.hasError(error));
        }
    }
}
export function updateTaskListStatus(username: string, task: string, status: boolean){
    return async () => {
        try {
            const response = await axios.post(`/dailyCoins/taskList/update/${username}`, { task: task, status: status });
            dispatch(dailyCoins.actions.updateDailyTaskStatusSuccess(response.data));
        } catch (error) {
            dispatch(dailyCoins.actions.hasError(error));
        }
    }
}