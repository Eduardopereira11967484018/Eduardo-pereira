import { Ring, RingDatabase } from '../entities/ring'; // Ajuste o caminho se necessário
import { InMemoryRingRepository } from '../repositories/ring.repository'; // Ajuste o caminho se necessário

describe('InMemoryRingRepository', () => {
    let repository: InMemoryRingRepository;

    beforeEach(() => {
        repository = new InMemoryRingRepository();
    });

    test('deve salvar um novo anel corretamente', async () => {
        const ring = Ring.create('Ring1', 'Power1', 'Bearer1', 'Elfos', 'http://example.com/ring1.jpg');
        await repository.save(ring);

        const rings = await repository.list();
        expect(rings.length).toBe(1);
        expect(rings[0].id).toBe(ring.id);
        expect(rings[0].nome).toBe('Ring1');
    });

    test('deve listar todos os anéis corretamente', async () => {
        const ring1 = Ring.create('Ring1', 'Power1', 'Bearer1', 'Elfos', 'http://example.com/ring1.jpg');
        const ring2 = Ring.create('Ring2', 'Power2', 'Bearer2', 'Anões', 'http://example.com/ring2.jpg');
        await repository.save(ring1);
        await repository.save(ring2);

        const rings = await repository.list();
        expect(rings.length).toBe(2);
        expect(rings.find(r => r.id === ring1.id)).toBeDefined();
        expect(rings.find(r => r.id === ring2.id)).toBeDefined();
    });

    test('deve atualizar um anel corretamente', async () => {
        const ring = Ring.create('Ring1', 'Power1', 'Bearer1', 'Elfos', 'http://example.com/ring1.jpg');
        await repository.save(ring);

        const updatedRing = Ring.with(ring.id, 'Ring1 Updated', 'Power1 Updated', 'Bearer1 Updated', 'Elfos', 'http://example.com/ring1-updated.jpg');
        await repository.update(updatedRing);

        const foundRing = await repository.find(ring.id);
        expect(foundRing).not.toBeNull();
        if (foundRing) {
            expect(foundRing.nome).toBe('Ring1 Updated');
            expect(foundRing.poder).toBe('Power1 Updated');
            expect(foundRing.portador).toBe('Bearer1 Updated');
            expect(foundRing.imagem).toBe('http://example.com/ring1-updated.jpg');
        }
    });

    test('deve encontrar um anel por ID', async () => {
        const ring = Ring.create('Ring1', 'Power1', 'Bearer1', 'Elfos', 'http://example.com/ring1.jpg');
        await repository.save(ring);

        const foundRing = await repository.find(ring.id);
        expect(foundRing).not.toBeNull();
        if (foundRing) {
            expect(foundRing.id).toBe(ring.id);
            expect(foundRing.nome).toBe('Ring1');
        }
    });

    test('deve retornar null ao buscar um anel que não existe', async () => {
        const foundRing = await repository.find('non-existent-id');
        expect(foundRing).toBeNull();
    });
});
