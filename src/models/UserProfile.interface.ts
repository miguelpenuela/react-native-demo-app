export interface UserProfile {
    id: string;
    name: string;
    bio: string;
    avatarUrl: string;
    stats: {
        posts: number;
        followers: number;
        following: number;
    }
}