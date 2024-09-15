import { Request, Response } from "express";
import { RingRepositoryPrisma } from "../../../repositories/prisma/ring.repository.prisma";
import { RingServiceImplementation } from "../../../service/implementation/ring.service.implementation";
import { prisma } from "../../../util/prisma.util";

export class RingController {
    private constructor() {}

    public static build() {
        return new RingController();
    }

    public async create(request: Request, response: Response) {
        try {
            const { name, power, bearer, forgedBy, imageUrl } = request.body;

            // Verificação simples dos dados recebidos
            if (!name || !power || !bearer || !forgedBy || !imageUrl) {
                return response.status(400).json({ error: 'Todos os campos são obrigatórios' });
            }

            // Instancia o repositório e o serviço
            const aRepository = RingRepositoryPrisma.build(prisma);
            const aService = RingServiceImplementation.build(aRepository);

            // Chama o serviço para criar o anel
            const output = await aService.create(name, power, bearer, forgedBy, imageUrl);

            // Prepara e envia a resposta
            const data = {
                id: output.id,
                name,
                power,
                bearer,
                forgedBy,
                imageUrl,
                balance: output.quantity,
            };

            response.status(201).json(data);
        } catch (error) {
            console.error('Error in create:', error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async list(request: Request, response: Response) {
        try {
            // Instancia o repositório e o serviço
            const aRepository = RingRepositoryPrisma.build(prisma);
            const aService = RingServiceImplementation.build(aRepository);

            // Chama o serviço para listar os anéis
            const output = await aService.list();

            // Prepara e envia a resposta
            const data = {
                rings: output.rings,
            };

            response.status(200).json(data);
        } catch (error) {
            console.error('Error in list:', error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async buy(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { amount } = request.body;

            // Validação dos dados recebidos
            if (!id || typeof amount !== 'number' || amount <= 0) {
                return response.status(400).json({ error: 'Dados inválidos' });
            }

            // Instancia o repositório e o serviço
            const aRepository = RingRepositoryPrisma.build(prisma);
            const aService = RingServiceImplementation.build(aRepository);

            // Chama o serviço para comprar o anel
            const output = await aService.buy(id, amount);

            // Prepara e envia a resposta
            const data = {
                id: output.id,
                balance: output.quantity,
            };

            response.status(200).json(data);
        } catch (error) {
            console.error('Error in buy:', error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async sell(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { amount } = request.body;

            // Validação dos dados recebidos
            if (!id || typeof amount !== 'number' || amount <= 0) {
                return response.status(400).json({ error: 'Dados inválidos' });
            }

            // Instancia o repositório e o serviço
            const aRepository = RingRepositoryPrisma.build(prisma);
            const aService = RingServiceImplementation.build(aRepository);

            // Chama o serviço para vender o anel
            const output = await aService.sell(id, amount);

            // Prepara e envia a resposta
            const data = {
                id: output.id,
                balance: output.quantity,
            };

            response.status(200).json(data);
        } catch (error) {
            console.error('Error in sell:', error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
