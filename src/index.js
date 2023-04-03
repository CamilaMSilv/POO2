"use strict";
class Fornecedor {
    constructor(id, nome_razaoSocial, cpfCnpj, telefone, endereco) {
        this._id = id;
        this._nome_razaoSocial = nome_razaoSocial;
        this._cpfCnpj = cpfCnpj;
        this._telefone = telefone;
        this._endereco = endereco;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get nome_razaoSocial() {
        return this._nome_razaoSocial;
    }
    set nome_razaoSocial(nome_razaoSocial) {
        this._nome_razaoSocial = nome_razaoSocial;
    }
    get cpfCnpj() {
        return this._cpfCnpj;
    }
    set cpfCnpj(cpfCnpj) {
        this._cpfCnpj = cpfCnpj;
    }
    get telefone() {
        return this._telefone;
    }
    set telefone(telefone) {
        this._telefone = telefone;
    }
    get endereco() {
        return this._endereco;
    }
    set endereco(endereco) {
        this._endereco = endereco;
    }
}
class Produto {
    constructor(id, descricao, fornecedor, vlrUnitario) {
        this._id = id;
        this._descricao = descricao;
        this._fornecedor = fornecedor;
        this._vlrUnitario = this.validaValorUnitario(vlrUnitario) ? vlrUnitario : 1;
    }
    validaValorUnitario(vlrUnitario) {
        if (vlrUnitario <= 0) {
            console.log("Valor Unitário não pode ser menor ou igual a zero.");
            return false;
        }
        return true;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get descricao() {
        return this._descricao;
    }
    set descricao(descricao) {
        this._descricao = descricao;
    }
    get fornecedor() {
        return this._fornecedor;
    }
    set fornecedor(fornecedor) {
        this._fornecedor = fornecedor;
    }
    get vlrUnitario() {
        return this._vlrUnitario;
    }
    set vlrUnitario(vlrUnitario) {
        this._vlrUnitario = vlrUnitario;
    }
}
class Estoque {
    constructor(id, produto, quantidade) {
        this._id = id;
        this._produto = produto;
        this._quantidade = this.validaQuantidade(quantidade) ? quantidade : 0;
    }
    validaQuantidade(qt) {
        if (qt < 0) {
            console.log("Quantidade não pode ser menor que zero.");
            return false;
        }
        return true;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get produto() {
        return this._produto;
    }
    set produto(produto) {
        this._produto = produto;
    }
    get quantidade() {
        return this._quantidade;
    }
    set quantidade(quantidade) {
        this._quantidade = quantidade;
    }
    valorDoProdutoEmEstoque() {
        if (this.quantidade > 0) {
            console.log(`Valor do produto em estoque: ${this.produto.vlrUnitario}.`);
        }
        else {
            console.log("Produto não está em estoque.");
        }
    }
}
var fornecedor = new Fornecedor(1, "DELL COMPUTADORES DO BRASIL LTDA", "72.381.189/0001-10", "(51) 3274-5500", "92.990-000, ELDORADO DO SUL - RS, AV INDUSTRIAL BELGRAF, n° 400");
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
