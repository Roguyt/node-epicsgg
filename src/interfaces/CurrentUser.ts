export interface CurrentUser {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
    balance: number;
    avatar: string;
    ethAddress: string;
    verifiedEmail: boolean;
    verifiedPhone: boolean;
    verifiedEthAddress: boolean;
    steamId: string;
    steamTradeCode: string;
    country: string;
    banned: boolean;
    group: number;
    packPublic: boolean;
    created: Date | null;
    onboarding: boolean;
    steam: {
        steamId: string;
        profileUrl: string;
        personname: string;
        avatar: string;
    } | null;
    twitch: {
        username: string;
        profileUrl: string;
        avatar: string;
    } | null;
    opskins: {} | null;
}
