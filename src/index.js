"use strict";
class Funcionario {
    constructor(nome, codigo) {
        this.nome = nome;
        this.codigo = codigo;
    }
}
class Ponto {
    constructor(funcionario) {
        this.funcionario = funcionario;
        this.horarioEntrada = null;
        this.horarioSaida = null;
        this.horarioInicioIntervalo = null;
        this.horarioFimIntervalo = null;
    }
    registrarPonto(codigo) {
        console.log("1 " + this.funcionario.codigo);
        console.log("2 " + this.funcionario.codigo);
        console.log("3 " + (this.funcionario.codigo === codigo));
        if (this.funcionario.codigo === codigo) {
            const dataHoraAtual = new Date;
            const hora = dataHoraAtual.getHours();
            const minutos = dataHoraAtual.getMinutes();
            console.log("4 " + hora);
            console.log("5 " + minutos);
            console.log("6 " + dataHoraAtual);
            if (!this.horarioEntrada && (hora < 18 || (hora == 18 && minutos <= 5))) {
                this.horarioEntrada = dataHoraAtual;
                console.log(`Ponto de entrada registrado para o funcionário ${this.funcionario.nome} na data ${dataHoraAtual.toLocaleDateString()} às ${dataHoraAtual.toLocaleTimeString()}`);
            }
            else if (this.horarioEntrada && !this.horarioInicioIntervalo) {
                this.horarioInicioIntervalo = dataHoraAtual;
                console.log(`Ponto de início de intervalo registrado para o funcionário ${this.funcionario.nome} na data ${dataHoraAtual.toLocaleDateString()} às ${dataHoraAtual.toLocaleTimeString()}`);
            }
            else if (this.horarioInicioIntervalo && !this.horarioFimIntervalo
                && (dataHoraAtual.getTime() - this.horarioInicioIntervalo.getTime()) >= 3600000
                && (dataHoraAtual.getTime() - this.horarioInicioIntervalo.getTime()) <= 5400000) {
                //&& (horario.getHours() - this.horarioInicioIntervalo.getHours()) == 1
                //&& (horario.getMinutes() - this.horarioInicioIntervalo.getMinutes()) <= 30) {
                this.horarioFimIntervalo = dataHoraAtual;
                console.log(`Ponto de fim de intervalo registrado para o funcionário ${this.funcionario.nome} na data ${dataHoraAtual.toLocaleDateString()} às ${dataHoraAtual.toLocaleTimeString()}`);
            }
            else if (this.horarioFimIntervalo && !this.horarioSaida &&
                ((hora == 21 && minutos >= 55) || hora > 21)) {
                this.horarioSaida = dataHoraAtual;
                console.log(`Ponto de saída registrado para o funcionário ${this.funcionario.nome} na data ${dataHoraAtual.toLocaleDateString()} às ${dataHoraAtual.toLocaleTimeString()}`);
            }
            else {
                console.log(`Ponto não registrado para o funcionário ${this.funcionario.nome} na data ${dataHoraAtual.toLocaleDateString()} às ${dataHoraAtual.toLocaleTimeString()}`);
            }
        }
    }
    calcularSaldo() {
        if (this.horarioEntrada && this.horarioSaida && this.horarioInicioIntervalo && this.horarioFimIntervalo) {
            const dataHoraAtual = new Date;
            const primeiraHora = this.horarioInicioIntervalo.getTime() - this.horarioEntrada.getTime();
            const segundaHora = this.horarioSaida.getTime() - this.horarioFimIntervalo.getTime();
            const saldoHora = millisToHoursAndMinutes(primeiraHora + segundaHora);
            console.log(`Saldo de horas trabalhadas igual a ${saldoHora} para o funcionário ${this.funcionario.nome} na data ${dataHoraAtual.toLocaleDateString()} às ${dataHoraAtual.toLocaleTimeString()}`);
        }
    }
}
function millisToHoursAndMinutes(millis) {
    const hours = Math.floor(millis / 3600000); // Divide o valor em milissegundos por 3600000 para obter as horas inteiras
    const minutes = Math.floor((millis % 3600000) / 60000); // Obtém o resto da divisão por 3600000 e divide por 60000 para obter os minutos
    return { hours, minutes };
}
var funcionario = new Funcionario("Camila", "000001");
var ponto = new Ponto(funcionario);
ponto.registrarPonto("000001");
ponto.calcularSaldo();
