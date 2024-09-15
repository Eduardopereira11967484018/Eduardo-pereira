import { Ring, RingDatabase } from './ring';

describe('Ring Entity', () => {
    beforeEach(() => {
        // Limpar o banco de dados entre os testes
        (RingDatabase as any).rings = [];
    });

    test('deve criar um anel corretamente', () => {
        const ring = Ring.create('Narya', 'Resistência ao fogo', 'Gandalf', 'Elfos', 'http://example.com/narya.jpg');
        expect(ring.id).toBeDefined();
        expect(ring.nome).toBe('Narya');
        expect(ring.poder).toBe('Resistência ao fogo');
        expect(ring.portador).toBe('Gandalf');
        expect(ring.forjadoPor).toBe('Elfos');
        expect(ring.imagem).toBe('http://example.com/narya.jpg');
    });

    test('deve lançar erro ao criar mais anéis do que o permitido para Elfos', () => {
        RingDatabase.addRing(Ring.create('Ring1', 'Power1', 'Bearer1', 'Elfos', 'http://example.com/ring1.jpg'));
        RingDatabase.addRing(Ring.create('Ring2', 'Power2', 'Bearer2', 'Elfos', 'http://example.com/ring2.jpg'));
        RingDatabase.addRing(Ring.create('Ring3', 'Power3', 'Bearer3', 'Elfos', 'http://example.com/ring3.jpg'));

        expect(() => {
            Ring.create('Ring4', 'Power4', 'Bearer4', 'Elfos', 'http://example.com/ring4.jpg');
        }).toThrow('A criação de anéis foi excedida para Elfos.');
    });

    test('deve listar todos os anéis forjados por Elfos', () => {
        const ring1 = Ring.create('Ring1', 'Power1', 'Bearer1', 'Elfos', 'http://example.com/ring1.jpg');
        const ring2 = Ring.create('Ring2', 'Power2', 'Bearer2', 'Elfos', 'http://example.com/ring2.jpg');

        RingDatabase.addRing(ring1);
        RingDatabase.addRing(ring2);

        const rings = RingDatabase.getRingsByForjador('Elfos');

        expect(rings.length).toBe(2);
        expect(rings[0].forjadoPor).toBe('Elfos');
        expect(rings[1].forjadoPor).toBe('Elfos');
    });

    test('deve atualizar o portador do anel', () => {
        const ring = Ring.create('Ring1', 'Power1', 'Bearer1', 'Elfos', 'http://example.com/ring1.jpg');
        RingDatabase.addRing(ring);

        RingDatabase.updateRing(ring.id, { portador: 'New Bearer' });

        const updatedRing = RingDatabase.getRingById(ring.id);

        expect(updatedRing).not.toBeUndefined();
        expect(updatedRing?.portador).toBe('New Bearer');
    });

    test('deve deletar um anel corretamente', () => {
        const ring = Ring.create('Ring1', 'Power1', 'Bearer1', 'Elfos', 'http://example.com/ring1.jpg');
        RingDatabase.addRing(ring);

        RingDatabase.deleteRing(ring.id);

        const deletedRing = RingDatabase.getRingById(ring.id);

        expect(deletedRing).toBeUndefined();
    });
});