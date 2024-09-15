import { Ring, RingDatabase } from '../entities/ring';
import { RingService } from './ring.service';

describe('RingService', () => {
    let service: RingService;

    beforeEach(() => {
        service = new RingService();
        // Limpa o banco de dados em memória antes de cada teste
        RingDatabase.clear(); 
    });

    test('deve criar um anel corretamente', async () => {
        const result = await service.create('Ring1', 0); // O valor do preço é irrelevante no contexto atual
        expect(result.id).toBeDefined();
        expect(result.balance).toBe(0);

        const ring = RingDatabase.getRingById(result.id);
        expect(ring).not.toBeNull();
        if (ring) {
            expect(ring.nome).toBe('Ring1');
            expect(ring.poder).toBe('Poder Desconhecido');
            expect(ring.portador).toBe('Portador Desconhecido');
            expect(ring.forjadoPor).toBe('Elfos');
            expect(ring.imagem).toBe('URL-da-imagem');
        }
    });

    test('deve listar todos os anéis corretamente', async () => {
        await service.create('Ring1', 0);
        await service.create('Ring2', 0);

        const result = await service.list();
        expect(result.products.length).toBe(2);
        expect(result.products[0].name).toBe('Ring1');
        expect(result.products[1].name).toBe('Ring2');
    });

    test('deve lançar erro ao tentar comprar um anel que não existe', async () => {
        await expect(service.buy('non-existent-id', 10)).rejects.toThrow('Anel não encontrado');
    });

    test('deve lançar erro ao tentar vender um anel que não existe', async () => {
        await expect(service.sell('non-existent-id', 10)).rejects.toThrow('Anel não encontrado');
    });

    test('deve lançar erro ao tentar vender mais do que o disponível (saldo fictício)', async () => {
        const result = await service.create('Ring1', 0);

        await expect(service.sell(result.id, 10)).rejects.toThrow('Saldo insuficiente para a venda');
    });

    test('deve retornar o balance correto após a compra', async () => {
        const result = await service.create('Ring1', 0);

        const buyResult = await service.buy(result.id, 10);
        expect(buyResult.id).toBe(result.id);
        expect(buyResult.balance).toBe(10);
    });

    test('deve retornar o balance correto após a venda', async () => {
        const result = await service.create('Ring1', 0);

        await service.buy(result.id, 20); // Primeiro compramos para garantir que há saldo
        const sellResult = await service.sell(result.id, 10);
        expect(sellResult.id).toBe(result.id);
        expect(sellResult.balance).toBe(10);
    });
});
