//ring.repository.prisma
import { PrismaClient } from "@prisma/client";
import { Ring } from "../../entities/ring";
import { RingRepository } from "../ring.repository";

export class RingRepositoryPrisma implements RingRepository {
    private constructor(readonly prisma: PrismaClient) {}

    public static build(prisma: PrismaClient) {
        return new RingRepositoryPrisma(prisma);
    }

    public async save(ring: Ring): Promise<void> {
        const data = {
            id: ring.id,
            name: ring.name,
            power: ring.power,
            portador: ring.bearer, // Mapeando corretamente o campo `bearer` para `portador`
            forjadoPor: ring.forgedBy, // Mapeando `forgedBy` para `forjadoPor`
            imagem: ring.imageUrl, // Mapeando `imageUrl` para `imagem`
            quantity: ring.quantity, // Adicionando `quantity`
        };

        await this.prisma.ring.create({
            data,
        });
    }

    public async list(): Promise<Ring[]> {
        const aRings = await this.prisma.ring.findMany();

        const rings: Ring[] = aRings.map((r) => {
            const { id, name, power, portador, forjadoPor, imagem, quantity } = r;
            return Ring.with(id, name, power, portador, forjadoPor, imagem, quantity); // Certificando-se de passar o quantity
        });

        return rings;
    }

    public async update(ring: Ring): Promise<void> {
        const data = {
            id: ring.id,
            name: ring.name,
            power: ring.power,
            portador: ring.bearer, // Mapeando corretamente
            forjadoPor: ring.forgedBy, // Mapeando corretamente
            imagem: ring.imageUrl, // Mapeando corretamente
            quantity: ring.quantity, // Adicionando o `quantity`
        };

        await this.prisma.ring.update({
            where: {
                id: ring.id,
            },
            data,
        });
    }

    public async find(id: string): Promise<Ring | null> {
        const aRing = await this.prisma.ring.findUnique({
            where: { id },
        });

        if (!aRing) {
            return null;
        }

        const { name, power, portador, forjadoPor, imagem, quantity } = aRing;
        return Ring.with(id, name, power, portador, forjadoPor, imagem, quantity); // Certifique-se de passar o quantity
    }
}
