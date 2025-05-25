import type { UserResponse } from "./User";

export interface IDoc {
    id: number;
    name: string;
    tag: string;
    tagColor: string;
    recipient: UserResponse;
    sender: UserResponse;
    created: string;
    status: string;
    statusColor: string;
    modified: string;
    fileName: string;
    fileType: string;
}