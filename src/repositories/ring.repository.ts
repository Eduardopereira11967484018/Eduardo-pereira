import { Ring } from "../entities/ring";

export interface RingRepository {
    save(ring: Ring): Promise<void>;
    list(): Promise<Ring[]>;
    update(ring: Ring): Promise<void>;
    find(id: string): Promise<Ring | null>;
}