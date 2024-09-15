import request from 'supertest';
import express, { Express } from 'express';
import { RingController } from './ring.controller'; // Ajuste o caminho conforme sua estrutura de pastas
import { prisma } from '../../../util/prisma.util'; // Se precisar simular prisma, pode usar jest.mock()
import { RingServiceImplementation } from '../../../service/implementation/ring.service.implementation';
import { RingRepositoryPrisma } from '../../../repositories/prisma/ring.repository.prisma';

jest.mock('../../../repositories/prisma/ring.repository.prisma');
jest.mock('../../../service/implementation/ring.service.implementation');
jest.mock('../../../util/prisma.util'); // Mocka o prisma para evitar chamadas reais ao banco durante os testes

describe('RingController', () => {
    let app: Express;

    beforeEach(() => {
        app = express();
        app.use(express.json());
        const ringController = RingController.build();

        // Simula as rotas
        app.post('/rings', (req, res) => ringController.create(req, res));
        app.get('/rings', (req, res) => ringController.list(req, res));
        app.post('/rings/:id/buy', (req, res) => ringController.buy(req, res));
        app.post('/rings/:id/sell', (req, res) => ringController.sell(req, res));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('deve criar um anel com sucesso', async () => {
        const mockCreateResponse = { id: '1', quantity: 10 };

        // Mock da implementação de serviço
        (RingServiceImplementation.prototype.create as jest.Mock).mockResolvedValueOnce(mockCreateResponse);

        const response = await request(app)
            .post('/rings')
            .send({
                name: 'Ring of Power',
                power: 'Invisibility',
                bearer: 'Frodo',
                forgedBy: 'Sauron',
                imageUrl: 'http://example.com/ring.jpg',
            });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            id: '1',
            name: 'Ring of Power',
            power: 'Invisibility',
            bearer: 'Frodo',
            forgedBy: 'Sauron',
            imageUrl: 'http://example.com/ring.jpg',
            balance: 10,
        });
    });

    it('deve listar todos os anéis', async () => {
        const mockListResponse = {
            rings: [
                {
                    id: '1',
                    name: 'Ring of Power',
                    power: 'Invisibility',
                    bearer: 'Frodo',
                    forgedBy: 'Sauron',
                    imageUrl: 'http://example.com/ring.jpg',
                },
            ],
        };

        (RingServiceImplementation.prototype.list as jest.Mock).mockResolvedValueOnce(mockListResponse);

        const response = await request(app).get('/rings');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockListResponse);
    });

    it('deve comprar um anel com sucesso', async () => {
        const mockBuyResponse = { id: '1', quantity: 15 };

        (RingServiceImplementation.prototype.buy as jest.Mock).mockResolvedValueOnce(mockBuyResponse);

        const response = await request(app)
            .post('/rings/1/buy')
            .send({ amount: 5 });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: '1',
            balance: 15,
        });
    });

    it('deve retornar erro ao tentar comprar com quantidade inválida', async () => {
        const response = await request(app)
            .post('/rings/1/buy')
            .send({ amount: -5 });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Dados inválidos' });
    });

    it('deve vender um anel com sucesso', async () => {
        const mockSellResponse = { id: '1', quantity: 5 };

        (RingServiceImplementation.prototype.sell as jest.Mock).mockResolvedValueOnce(mockSellResponse);

        const response = await request(app)
            .post('/rings/1/sell')
            .send({ amount: 5 });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: '1',
            balance: 5,
        });
    });

    it('deve retornar erro ao tentar vender com quantidade inválida', async () => {
        const response = await request(app)
            .post('/rings/1/sell')
            .send({ amount: -5 });

        expect(response.status).toBe(400);
       
