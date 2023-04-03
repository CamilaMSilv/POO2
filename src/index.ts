class Pessoa {
    nome
    cpf
    rg
    rua
    bairro
    telefone

    constructor(nome: string, cpf: string, rg: string,
        rua: string, bairro: string, telefone: string) {
        this.nome = nome;
        if (this.validarCPF(cpf)) {
            this.cpf = cpf;
        } else {
            console.log('CPF inválido, verifique!')
        }
        this.rg = rg;
        this.rua = rua;
        this.bairro = bairro;
        if (this.validaTelefone(telefone)) {
            this.telefone = telefone;
        } else {
            console.log('Telefone inválido, informe apenas números. Ex: 48988887777')
        }
    }

    validarCPF(cpf: string): boolean {
        cpf = cpf.replace(/[^\d]+/g, '');

        if (cpf.length !== 11) {
            return false;
        }

        let sum = 0;
        let rest;

        for (let i = 1; i <= 9; i++) {
            sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }

        rest = (sum * 10) % 11;

        if ((rest === 10) || (rest === 11)) {
            rest = 0;
        }

        if (rest !== parseInt(cpf.substring(9, 10))) {
            return false;
        }

        sum = 0;

        for (let i = 1; i <= 10; i++) {
            sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }

        rest = (sum * 10) % 11;

        if ((rest === 10) || (rest === 11)) {
            rest = 0;
        }

        if (rest !== parseInt(cpf.substring(10, 11))) {
            return false;
        }

        return true;
    }


    validaTelefone(telefone: string): boolean {
        if (telefone.length != 11) {
            return false;
        }
        return true;
    }
}

class Produto {
    nome
    vlrUnit

    constructor(nome: string, vlrUnit: number) {
        if (this.validaNome(nome)) {
            this.nome = nome;
        } else {
            console.log('Nome do produto deve ter no mínimo 2 caracteres.')
        }
        if (this.validaValor(vlrUnit)) {
            this.vlrUnit = vlrUnit;
        } else {
            console.log('Valor Unitário do produto deve ser maior que zero.')
        }
    }

    validaNome(nome: string): boolean {
        if (nome.length < 2) {
            return false;
        }
        return true;
    }
    validaValor(vlrUnit: number): boolean {
        if (vlrUnit <= 0) {
            return false;
        }
        return true;
    }
}

class Vendas {
    cliente
    produto
    dataVenda
    vlrTotal

    constructor(cliente: Pessoa, produto: Produto, dataVenda: Date, vlrTotal: number) {
        this.cliente = cliente;
        this.produto = produto;
        if (this.validaDataVenda(dataVenda)) {
            this.dataVenda = dataVenda;
        } else {
            console.log('Data da venda não pode ser futura, verifique!')
        }
        this.vlrTotal = vlrTotal;
    }

    validaDataVenda(dataVenda: Date) {
        const dataAtual = new Date();
        if (dataVenda > dataAtual) {
            return false;
        }
        return true;
    }
}

var cliente = new Pessoa('Camila', '091.123.456-78', '3.456.789', 'Manoel Franscisco Coelho',
    'Bela Vista', '(48) 99898-4444');

var produto = new Produto('', 10000.0);

var venda = new Vendas(cliente, produto, new Date('2024-03-19'), 10100.0);
