"use strict";
/*nome: Camila
Sua tarefa e desenvolver um sistema que faça o controle de velocidade de uma
rodovia. O sistema deve atender os seguintes requisitos:
- Ter pelo menos 3 classes.
- O limite de velocidade na rodovia e de 100 km/h.
- A tolerância para infração de é de 5%.
- Utilizar o conceito de herança, encapsulamento e polimorfismo.
- Notificar o motorista sobre a infração.
- O sistema deve funcionar.
*/
class Veiculo {
    constructor(id, placa, proprietario) {
        this._id = id;
        this._placa = placa;
        this._proprietario = proprietario;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get placa() {
        return this._placa;
    }
    set placa(placa) {
        this._placa = placa;
    }
    get proprietario() {
        return this._proprietario;
    }
    set proprietario(proprietario) {
        this._proprietario = proprietario;
    }
}
class Pessoa {
    constructor(id, nome, cpf, cnh) {
        this._id = id;
        this._nome = nome;
        this._cpf = cpf;
        this._cnh = cnh;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get nome() {
        return this._nome;
    }
    set nome(nome) {
        this._nome = nome;
    }
    get cpf() {
        return this._cpf;
    }
    set cpf(cpf) {
        this._cpf = cpf;
    }
    get cnh() {
        return this._cnh;
    }
    set cnh(cnh) {
        this._cnh = cnh;
    }
}
class Registro {
    constructor(id, veiculo, motorista, velocidade, dataHora) {
        this._id = id;
        this._veiculo = veiculo;
        this._motorista = motorista;
        this._velocidade = velocidade;
        this._dataHora = dataHora;
    }
    verificarVelocidade() {
        const limiteVelocidade = 100;
        const tolerancia = 1.05; //+5%
        const velocidadeMaxima = limiteVelocidade * tolerancia;
        if (this.velocidade > velocidadeMaxima) {
            console.log(`O veículo com placa ${this.veiculo.placa} está acima do limite de velocidade.`);
            this.notificarMotorista();
        }
        else {
            console.log(`O veículo com placa ${this.veiculo.placa} está dentro do limite de velocidade.`);
        }
    }
    notificarMotorista() {
        console.log(`Notificação de Infração: Você excedeu o limite de velocidade de 100km/h!\n`
            + ` Placa: ${this.veiculo.placa} Proprietário: ${this.veiculo.proprietario.nome}\n`
            + ` Motorista: ${this.motorista.nome} CPF: ${this.motorista.cpf}\n`
            + ` Data/Hora: ${this.dataHora.toLocaleDateString()} às ${this.dataHora.toLocaleTimeString()} Velocidade: ${this.velocidade}\n`);
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get veiculo() {
        return this._veiculo;
    }
    set veiculo(veiculo) {
        this._veiculo = veiculo;
    }
    get motorista() {
        return this._motorista;
    }
    set motorista(motorista) {
        this._motorista = motorista;
    }
    get velocidade() {
        return this._velocidade;
    }
    set velocidade(velocidade) {
        this._velocidade = velocidade;
    }
    get dataHora() {
        return this._dataHora;
    }
    set dataHora(dataHora) {
        this._dataHora = dataHora;
    }
}
var proprietario = new Pessoa(1, "Márcio José da Silva", "468.435.300-10", "02127708593");
var veiculo = new Veiculo(1, "MGV4472", proprietario);
var motorista = new Pessoa(2, "Camila Martins da Silva", "963.452.790-64", "69965019730");
var registro = new Registro(1, veiculo, motorista, 130, new Date);
registro.verificarVelocidade();
var registro2 = new Registro(2, veiculo, proprietario, 105, new Date);
registro2.verificarVelocidade();
