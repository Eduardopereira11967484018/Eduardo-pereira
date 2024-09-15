import crypto from 'crypto';

// Definindo o tipo para as propriedades do anel
export type RingProps = {
    id: string;
    name: string;
    power: string;
    bearer: string;
    forgedBy: string;
    imageUrl: string;
    quantity: number; // Sempre será um número
};

// Definindo as regras de quantidade máxima de anéis por forjador
const MAX_RINGS_BY_FORGER: { [key: string]: number } = {
    Elfos: 3,
    Anões: 7,
    Homens: 9,
    Sauron: 1,
};

export class Ring {
    private static ringsByForgedBy: { [key: string]: number } = {}; // Simulando armazenamento em memória
    
    private static validateForgedBy(forgedBy: string): void {
        if (!Object.keys(MAX_RINGS_BY_FORGER).includes(forgedBy)) {
            throw new Error(`Forjador ${forgedBy} não é válido.`);
        }
    }

    private constructor(readonly props: RingProps) {
        // Verifica se o número máximo de anéis foi excedido
        if (Ring.ringsByForgedBy[this.props.forgedBy] >= MAX_RINGS_BY_FORGER[this.props.forgedBy]) {
            throw new Error(`O limite de anéis para ${this.props.forgedBy} foi excedido.`);
        }

        // Atualiza a contagem de anéis por forjador
        Ring.ringsByForgedBy[this.props.forgedBy] = (Ring.ringsByForgedBy[this.props.forgedBy] || 0) + 1;
    }

    public static create(
        name: string,
        power: string,
        bearer: string,
        forgedBy: string,
        imageUrl: string
    ): Ring {
        Ring.validateForgedBy(forgedBy); // Valida o forjador

        return new Ring({
            id: crypto.randomUUID(), // Gera um UUID sem converter para string
            name,
            power,
            bearer,
            forgedBy,
            imageUrl,
            quantity: 0,  // Inicializando `quantity` como 0
        });
    }

    public static with(
        id: string,
        name: string,
        power: string,
        bearer: string,
        forgedBy: string,
        imageUrl: string,
        quantity: number
    ): Ring {
        Ring.validateForgedBy(forgedBy); // Valida o forjador

        return new Ring({
            id,
            name,
            power,
            bearer,
            forgedBy,
            imageUrl,
            quantity,
        });
    }

    public buy(amount: number) {
        if (amount <= 0) {
            throw new Error("A quantidade a ser comprada deve ser positiva.");
        }
        this.props.quantity += amount;
    }

    public sell(amount: number) {
        if (amount <= 0) {
            throw new Error("A quantidade a ser vendida deve ser positiva.");
        }
        if (this.props.quantity < amount) {
            throw new Error("Quantidade insuficiente de anéis para venda.");
        }
        this.props.quantity -= amount;
    }

    public get id() {
        return this.props.id;
    }

    public get name() {
        return this.props.name;
    }

    public get power() {
        return this.props.power;
    }

    public get bearer() {
        return this.props.bearer;
    }

    public get forgedBy() {
        return this.props.forgedBy;
    }

    public get imageUrl() {
        return this.props.imageUrl;
    }

    public get quantity() {
        return this.props.quantity;
    }
}
