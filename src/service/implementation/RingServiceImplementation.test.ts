import { RingServiceImplementation } from "./ring.service.implementation";
import { RingRepository } from "../../repositories/ring.repository";
import { Ring } from "../../entities/ring";

jest.mock("../../repositories/ring.repository");

describe("RingServiceImplementation", () => {
    let service: RingServiceImplementation;
    let repository: jest.Mocked<RingRepository>;

    beforeEach(() => {
        repository = new RingRepository() as jest.Mocked<RingRepository>;
        service = RingServiceImplementation.build(repository);
    });

    it("deve criar um anel", async () => {
        const mockRing = Ring.create("Test Ring", "Power", "Bearer", "ForgedBy", "imageUrl");

        repository.save.mockResolvedValueOnce();
        
        const result = await service.create(
            "Test Ring",
            "Power",
            "Bearer",
            "ForgedBy",
            "imageUrl"
        );

        expect(repository.save).toHaveBeenCalled();
        expect(result).toEqual({
            id: mockRing.id,
            quantity: mockRing.quantity,
        });
    });

    it("deve listar todos os anéis", async () => {
        const mockRings = [
            Ring.create("Test Ring 1", "Power 1", "Bearer 1", "ForgedBy 1", "imageUrl 1"),
            Ring.create("Test Ring 2", "Power 2", "Bearer 2", "ForgedBy 2", "imageUrl 2")
        ];

        repository.list.mockResolvedValueOnce(mockRings);

        const result = await service.list();

        expect(repository.list).toHaveBeenCalled();
        expect(result.rings.length).toBe(2);
        expect(result.rings[0].name).toBe("Test Ring 1");
    });

    it("deve lançar erro ao tentar vender um anel que não existe", async () => {
        repository.find.mockResolvedValueOnce(null);

        await expect(service.sell("invalid-id", 1)).rejects.toThrow("Ring with id invalid-id not found");
    });

    it("deve vender a quantidade correta de anéis", async () => {
        const mockRing = Ring.create("Test Ring", "Power", "Bearer", "ForgedBy", "imageUrl");
        mockRing.buy(5); // Para garantir que temos estoque suficiente para vender

        repository.find.mockResolvedValueOnce(mockRing);
        repository.update.mockResolvedValueOnce();

        const result = await service.sell(mockRing.id, 2);

        expect(repository.find).toHaveBeenCalledWith(mockRing.id);
        expect(repository.update).toHaveBeenCalledWith(mockRing);
        expect(result.quantity).toBe(3); // 5 - 2
    });
    
    // Outros testes podem ser adicionados para métodos como buy e update
});
