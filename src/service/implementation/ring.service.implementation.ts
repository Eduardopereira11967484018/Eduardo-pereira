import { Ring } from "../../entities/ring"; // Ajuste o caminho conforme a estrutura do seu projeto
import { RingRepository } from "../../repositories/ring.repository"; // Ajuste o caminho conforme a estrutura do seu projeto
import {
    BuyOutputDto,
    CreateOutputDto,
    ListOutputDto,
    RingService,
    SellOutputDto,
} from "../ring.service"; // Ajuste o caminho

export class RingServiceImplementation implements RingService {
    private constructor(private readonly repository: RingRepository) {}

    public static build(repository: RingRepository) {
        return new RingServiceImplementation(repository);
    }

    public async create(
        name: string,
        power: string,
        bearer: string,
        forgedBy: string,
        imageUrl: string
    ): Promise<CreateOutputDto> {
        const aRing = Ring.create(name, power, bearer, forgedBy, imageUrl);
        await this.repository.save(aRing);

        return {
            id: aRing.id,
            quantity: aRing.quantity,
        };
    }

    private async getRing(id: string): Promise<Ring> {
        const aRing = await this.repository.find(id);
        if (!aRing) {
            throw new Error(`Ring with id ${id} not found`);
        }
        return aRing;
    }

    public async sell(id: string, amount: number): Promise<SellOutputDto> {
        const aRing = await this.getRing(id);
        aRing.sell(amount);
        await this.repository.update(aRing);

        return {
            id: aRing.id,
            quantity: aRing.quantity,
            balance: aRing.quantity, // ou balance, dependendo do que você precisa
        };
    }

    public async buy(id: string, amount: number): Promise<BuyOutputDto> {
        const aRing = await this.getRing(id);
        aRing.buy(amount);
        await this.repository.update(aRing);

        return {
            id: aRing.id,
            quantity: aRing.quantity,
            balance: aRing.quantity, // ou balance, dependendo do que você precisa
        };
    }

    public async list(): Promise<ListOutputDto> {
        const aRings = await this.repository.list();
        const rings = aRings.map(r => ({
            id: r.id,
            name: r.name,
            power: r.power,
            bearer: r.bearer,
            forgedBy: r.forgedBy,
            imageUrl: r.imageUrl,
        }));

        return { rings };
    }
}
