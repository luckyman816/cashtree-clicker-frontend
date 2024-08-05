export interface dailyRefillStateTypes {
    refill_energy: number,
    refill_energy_date: Date
}
export interface dailyDoublePointsStateTypes {
    double_points: number,
    double_points_date: Date
}
export interface dailyBoostStateTypes {
    _id: string,
    username: string,
    daily_refill_energy: dailyRefillStateTypes
    daily_double_points: dailyDoublePointsStateTypes
    error: object | string | null
}