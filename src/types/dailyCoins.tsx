export interface dailyReceivedTypes {
    day_1: boolean;
    day_2: boolean;
    day_3: boolean;
    day_4: boolean;
    day_5: boolean;
    day_6: boolean;
    day_7: boolean;
}
export interface dailyCoinsStateTypes{
    _id: string;
    username: string;
    daily_coins: dailyReceivedTypes;
    error: object | string | null;
}
