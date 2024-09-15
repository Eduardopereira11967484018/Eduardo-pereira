import { PrismaClient } from "@prisma/client";
import { RingRepositoryPrisma } from "./ring.repository.prisma";
import { Ring } from "../../entities/ring";

// Mock do PrismaClient
jest.mock("@prisma/client", () => {
  const mPrismaClient = {
    ring: {
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

describe("RingRepositoryPrisma", () => {
  let prisma: PrismaClient;
  let repository: RingRepositoryPrisma;

  const ringMock = Ring.with(
    "1",
    "One Ring",
    "Invisibility",
    "Frodo",
    "Sauron",
    "/images/one-ring.png",
    1
  );

  beforeEach(() => {
    prisma = new PrismaClient();
    repository = RingRepositoryPrisma.build(prisma);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve salvar um novo anel corretamente", async () => {
    await repository.save(ringMock);

    expect(prisma.ring.create).toHaveBeenCalledWith({
      data: {
        id: ringMock.id,
        name: ringMock.name,
        power: ringMock.power,
        portador: ringMock.bearer,
        forjadoPor: ringMock.forgedBy,
        imagem: ringMock.imageUrl,
        quantity: ringMock.quantity,
      },
    });
  });

  it("deve listar todos os anéis", async () => {
    const ringsData = [
      {
        id: "1",
        name: "One Ring",
        power: "Invisibility",
        portador: "Frodo",
        forjadoPor: "Sauron",
        imagem: "/images/one-ring.png",
        quantity: 1,
      },
    ];

    // Mocking the response of findMany
    (prisma.ring.findMany as jest.Mock).mockResolvedValue(ringsData);

    const rings = await repository.list();

    expect(prisma.ring.findMany
