export interface walletProfile {
    _id: string;
    username: string;
    balance: number;
    energy: number;
    full_energy: number;
    tap: number;
    limit: number;
    daily_coins: Date;
}
export interface walletStateProps {
    user: walletProfile;
    users: walletProfile[];
    friend: boolean;
    error: object | string | null;
}