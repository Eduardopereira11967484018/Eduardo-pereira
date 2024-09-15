
// SellOutputDto para anéis
export type SellOutputDto = {
    quantity: any;
    id: string;
    balance: number; // ou quantity, se preferir
};

// BuyOutputDto para anéis
export type BuyOutputDto = {
    quantity: any;
    id: string;
    balance: number; // ou quantity, se preferir
};

// CreateOutputDto para anéis
export type CreateOutputDto = {
    quantity: any;
    id: string;
};

// ListOutputDto para anéis
export type ListOutputDto = {
    rings: {
        id: string;
        name: string;
        power: string;
        bearer: string;
        forgedBy: string;
        imageUrl: string;
    }[];
};
export interface RingService {
    sell(id: string, amount: number): Promise<SellOutputDto>;
    buy(id: string, amount: number): Promise<BuyOutputDto>;
    list(): Promise<ListOutputDto>;
    create(name: string, power: string, bearer: string, forgedBy: string, imageUrl: string): Promise<CreateOutputDto>;
}
