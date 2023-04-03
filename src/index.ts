class Fornecedor {
    private _id: number
    private _nome_razaoSocial: string
    private _cpfCnpj: string
    private _telefone: string
    private _endereco: string

    constructor(id: number, nome_razaoSocial: string, cpfCnpj: string,
        telefone: string, endereco: string) {
        this._id = id;
        this._nome_razaoSocial = nome_razaoSocial;
        this._cpfCnpj = cpfCnpj;
        this._telefone = telefone;
        this._endereco = endereco;
    }

    get id(): number {
        return this._id;
    }

    set id(id: number) {
        this._id = id;
    }

    get nome_razaoSocial(): string {
        return this._nome_razaoSocial;
    }

    set nome_razaoSocial(nome_razaoSocial: string) {
        this._nome_razaoSocial = nome_razaoSocial;
    }

    get cpfCnpj(): string {
        return this._cpfCnpj;
    }

    set cpfCnpj(cpfCnpj: string) {
        this._cpfCnpj = cpfCnpj;
    }

    get telefone(): string {
        return this._telefone;
    }

    set telefone(telefone: string) {
        this._telefone = telefone;
    }

    get endereco(): string {
        return this._endereco;
    }

    set endereco(endereco: string) {
        this._endereco = endereco;
    }
}

class Produto {
    private _id: number
    private _descricao: string
    protected _fornecedor: Fornecedor
    private _vlrUnitario: number

    constructor(id: number, descricao: string, fornecedor: Fornecedor,
        vlrUnitario: number) {
        this._id = id;
        this._descricao = descricao;
        this._fornecedor = fornecedor;
        this._vlrUnitario = this.validaValorUnitario(vlrUnitario) ? vlrUnitario : 1;
    }

    private validaValorUnitario(vlrUnitario: number): boolean {
        if (vlrUnitario <= 0) {
            console.log("Valor Unitário não pode ser menor ou igual a zero.")
            return false;
        }
        return true;
    }

    get id(): number {
        return this._id;
    }

    set id(id: number) {
        this._id = id;
    }

    get descricao(): string {
        return this._descricao;
    }

    set descricao(descricao: string) {
        this._descricao = descricao;
    }

    get fornecedor(): Fornecedor {
        return this._fornecedor;
    }

    set fornecedor(fornecedor: Fornecedor) {
        this._fornecedor = fornecedor;
    }

    get vlrUnitario(): number {
        return this._vlrUnitario;
    }

    set vlrUnitario(vlrUnitario: number) {
        this._vlrUnitario = vlrUnitario;
    }
}

class Estoque {
    private _id: number
    private _produto: Produto
    private _quantidade: number

    constructor(id: number, produto: Produto, quantidade: number) {
        this._id = id;
        this._produto = produto;
        this._quantidade = this.validaQuantidade(quantidade) ? quantidade : 0;
    }

    private validaQuantidade(qt: number): boolean {
        if (qt < 0) {
            console.log("Quantidade não pode ser menor que zero.")
            return false;
        }
        return true;
    }

    get id(): number {
        return this._id;
    }

    set id(id: number) {
        this._id = id;
    }

    get produto(): Produto {
        return this._produto;
    }

    set produto(produto: Produto) {
        this._produto = produto;
    }

    get quantidade(): number {
        return this._quantidade;
    }

    set quantidade(quantidade: number) {
        this._quantidade = quantidade;
    }

    valorDoProdutoEmEstoque(): void {
        if (this.quantidade > 0) {
            console.log(`Valor do produto em estoque: ${this.produto.vlrUnitario}.`);
        }else{
            console.log("Produto não está em estoque.");
        }
    }
}

var fornecedor = new Fornecedor(1, "DELL COMPUTADORES DO BRASIL LTDA", "72.381.189/0001-10",
    "(51) 3274-5500", "92.990-000, ELDORADO DO SUL - RS, AV INDUSTRIAL BELGRAF, n° 400");

console.log("Fornecedor: " + fornecedor.id + ", Nome/Razão Social: " + fornecedor.nome_razaoSocial
    + ", CPF/CNPJ: " + fornecedor.cpfCnpj + ", Telefone: " + fornecedor.telefone
    + ", Endereço: " + fornecedor.endereco);

var produto = new Produto(1, "Notebook Dell", fornecedor, 12599.00);

console.log("Produto: " + produto.id + ", Descrição: " + produto.descricao
    + ", Fornecedor: " + produto.fornecedor.nome_razaoSocial
    + ", Valor Unitário: " + produto.vlrUnitario);

var estoque = new Estoque(1, produto, 3);
estoque.valorDoProdutoEmEstoque();

var produtoB = new Produto(2, "Monitor Dell P2722H", fornecedor, 0);

var estoqueB = new Estoque(2, produtoB, -1);
estoqueB.valorDoProdutoEmEstoque();