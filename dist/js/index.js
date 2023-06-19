"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var TipoPessoa;
(function (TipoPessoa) {
    TipoPessoa[TipoPessoa["JURIDICA"] = 0] = "JURIDICA";
    TipoPessoa[TipoPessoa["FISICA"] = 1] = "FISICA";
})(TipoPessoa || (TipoPessoa = {}));
var YesNoOption;
(function (YesNoOption) {
    YesNoOption[YesNoOption["SIM"] = 0] = "SIM";
    YesNoOption[YesNoOption["NAO"] = 1] = "NAO";
})(YesNoOption || (YesNoOption = {}));
var Status;
(function (Status) {
    Status[Status["ATIVO"] = 0] = "ATIVO";
    Status[Status["INATIVO"] = 1] = "INATIVO";
})(Status || (Status = {}));
class Cliente {
    constructor(id, nome_razaoSocial, nomeSocial_nomeFantasia, tipoPessoa, contribuinteIcms, cpfCnpj, rgIe, status, telefone, telefone2, email, cep, logradouro, numero, bairro, complemento, cidade, uf) {
        this._id = id;
        this._nome_razaoSocial = nome_razaoSocial;
        this._nomeSocial_nomeFantasia = nomeSocial_nomeFantasia;
        this._tipoPessoa = tipoPessoa;
        this._contribuinteIcms = contribuinteIcms;
        this._cpfCnpj = this.validarDocumento(cpfCnpj);
        this._rgIe = rgIe;
        this._status = status;
        this._telefone = telefone;
        this._telefone2 = telefone2;
        this._email = validarEmail(email);
        this._cep = this.validarCep(cep);
        this._logradouro = logradouro;
        this._numero = numero;
        this._bairro = bairro;
        this._complemento = complemento;
        this._cidade = cidade;
        this._uf = uf;
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
    get nomeSocial_nomeFantasia() {
        return this._nomeSocial_nomeFantasia;
    }
    set nomeSocial_nomeFantasia(nomeSocial_nomeFantasia) {
        this._nomeSocial_nomeFantasia = nomeSocial_nomeFantasia;
    }
    get tipoPessoa() {
        return this._tipoPessoa;
    }
    set tipoPessoa(tipoPessoa) {
        this._tipoPessoa = tipoPessoa;
    }
    get contribuinteIcms() {
        return this._contribuinteIcms;
    }
    set contribuinteIcms(contribuinteIcms) {
        this._contribuinteIcms = contribuinteIcms;
    }
    get cpfCnpj() {
        return this._cpfCnpj;
    }
    set cpfCnpj(cpfCnpj) {
        this._cpfCnpj = cpfCnpj;
    }
    get rgIe() {
        return this._rgIe;
    }
    set rgIe(rgIe) {
        this._rgIe = rgIe;
    }
    get status() {
        return this._status;
    }
    set status(status) {
        this._status = status;
    }
    get telefone() {
        return this._telefone;
    }
    set telefone(telefone) {
        this._telefone = telefone;
    }
    get telefone2() {
        return this._telefone2;
    }
    set telefone2(telefone2) {
        this._telefone2 = telefone2;
    }
    get email() {
        return this._email;
    }
    set email(email) {
        this._email = email;
    }
    get cep() {
        return this._cep;
    }
    set cep(cep) {
        this._cep = cep;
    }
    get logradouro() {
        return this._logradouro;
    }
    set logradouro(logradouro) {
        this._logradouro = logradouro;
    }
    get numero() {
        return this._numero;
    }
    set numero(numero) {
        this._numero = numero;
    }
    get bairro() {
        return this._bairro;
    }
    set bairro(bairro) {
        this._bairro = bairro;
    }
    get complemento() {
        return this._complemento;
    }
    set complemento(complemento) {
        this._complemento = complemento;
    }
    get cidade() {
        return this._cidade;
    }
    set cidade(cidade) {
        this._cidade = cidade;
    }
    get uf() {
        return this._uf;
    }
    set uf(uf) {
        this._uf = uf;
    }
    consultarCep() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = 'https://apphom.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl';
            try {
                var cep = this.cep;
                if (cep.trim() !== '') {
                    const soap = require('soap');
                    const client = yield soap.createClientAsync(url);
                    const result = yield client.consultaCEPAsync({ cep });
                    const data = result[0].return;
                    if (data !== null) {
                        if (this.logradouro.trim() == '') {
                            this.logradouro = data.end;
                        }
                        if (this.bairro.trim() == '') {
                            this.bairro = data.bairro;
                        }
                        if (this.cidade.trim() == '') {
                            this.cidade = data.cidade;
                        }
                        if (this.uf.trim() == '') {
                            this.uf = data.uf;
                        }
                    }
                }
            }
            catch (error) {
                console.log('Erro ao consultar CEP:', error);
            }
            return this;
        });
    }
    validarCep(cep) {
        cep = cep.replace(/[^\d]+/g, '');
        const cepRegex = /^[0-9]{8}$/;
        if (cepRegex.test(cep)) {
            return cep;
        }
        console.log('Cep inválido!');
        return '';
    }
    validarDocumento(cpfCnpj) {
        var retorno = true;
        cpfCnpj = cpfCnpj.replace(/[^\d]+/g, '');
        if (cpfCnpj.length === 11) {
            let soma = 0;
            let resto;
            for (let i = 1; i <= 9; i++) {
                soma = soma + parseInt(cpfCnpj.substring(i - 1, i)) * (11 - i);
            }
            resto = (soma * 10) % 11;
            if (resto === 10 || resto === 11) {
                resto = 0;
            }
            if (resto !== parseInt(cpfCnpj.substring(9, 10))) {
                retorno = false;
            }
            soma = 0;
            for (let i = 1; i <= 10; i++) {
                soma = soma + parseInt(cpfCnpj.substring(i - 1, i)) * (12 - i);
            }
            resto = (soma * 10) % 11;
            if (resto === 10 || resto === 11) {
                resto = 0;
            }
            if (resto !== parseInt(cpfCnpj.substring(10, 11))) {
                retorno = false;
            }
            if (!retorno) {
                console.log('CPF inválido!');
                return '';
            }
            return cpfCnpj;
        }
        else if (cpfCnpj.length === 14) {
            // Calcular o primeiro dígito verificador
            let sum = 0;
            let weight = 5;
            for (let i = 0; i < 12; i++) {
                sum += parseInt(cpfCnpj.charAt(i)) * weight;
                weight--;
                if (weight < 2) {
                    weight = 9;
                }
            }
            let digit = 11 - (sum % 11);
            if (digit > 9) {
                digit = 0;
            }
            if (parseInt(cpfCnpj.charAt(12)) !== digit) {
                retorno = false;
            }
            // Calcular o segundo dígito verificador
            sum = 0;
            weight = 6;
            for (let i = 0; i < 13; i++) {
                sum += parseInt(cpfCnpj.charAt(i)) * weight;
                weight--;
                if (weight < 2) {
                    weight = 9;
                }
            }
            digit = 11 - (sum % 11);
            if (digit > 9) {
                digit = 0;
            }
            if (parseInt(cpfCnpj.charAt(13)) !== digit) {
                retorno = false;
            }
            if (!retorno) {
                console.log('CNPJ inválido!');
                return '';
            }
            return cpfCnpj;
        }
        else {
            console.log('CPF/CNPJ inválido!');
            return '';
        }
    }
}
class Produto {
    constructor(id, codigo, descricao, setores) {
        this._id = id;
        this._codigo = codigo;
        this._descricao = descricao;
        this._setores = setores;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get codigo() {
        return this._codigo;
    }
    set codigo(codigo) {
        this._codigo = codigo;
    }
    get descricao() {
        return this._descricao;
    }
    set descricao(descricao) {
        this._descricao = descricao;
    }
    get setores() {
        return this._setores;
    }
    set setores(setores) {
        this._setores = setores;
    }
}
class ProdutoModulo {
    constructor(id, descricao, produto) {
        this._id = id;
        this._descricao = descricao;
        this._produto = produto;
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
    get produto() {
        return this._produto;
    }
    set produto(produto) {
        this._produto = produto;
    }
}
class ProdutoVersao {
    constructor(id, numeroVersao, dataPrevisao, dataLiberacao, produto) {
        this._id = id;
        this._numeroVersao = numeroVersao;
        this._dataPrevisao = dataPrevisao;
        this._dataLiberacao = dataLiberacao;
        this._produto = produto;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get numeroVersao() {
        return this._numeroVersao;
    }
    set numeroVersao(numeroVersao) {
        this._numeroVersao = numeroVersao;
    }
    get dataPrevisao() {
        return this._dataPrevisao;
    }
    set dataPrevisao(dataPrevisao) {
        this._dataPrevisao = dataPrevisao;
    }
    get dataLiberacao() {
        return this._dataLiberacao;
    }
    set dataLiberacao(dataLiberacao) {
        this._dataLiberacao = dataLiberacao;
    }
    get produto() {
        return this._produto;
    }
    set produto(produto) {
        this._produto = produto;
    }
}
class Setor {
    constructor(id, descricao, usuarioResponsavel) {
        this._id = id;
        this._descricao = descricao;
        this._usuarioResponsavel = usuarioResponsavel;
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
    get usuarioResponsavel() {
        return this._usuarioResponsavel;
    }
    set usuarioResponsavel(usuarioResponsavel) {
        this._usuarioResponsavel = usuarioResponsavel;
    }
}
class Usuario {
    constructor(id, nome, email, senha) {
        this._id = id;
        this._nome = nome;
        this._email = validarEmail(email);
        this._senha = this.validarSenha(senha);
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
    get email() {
        return this._email;
    }
    set email(email) {
        this._email = email;
    }
    get senha() {
        return this._senha;
    }
    set senha(senha) {
        this._senha = senha;
    }
    validarSenha(senha) {
        const senhaPadrao = 'SenhaPadrao123!';
        // Verificar o tamanho mínimo da senha
        if (senha.length < 8) {
            console.log('A senha deve ter no mínimo 8 caracteres!');
            return senhaPadrao;
        }
        // Verificar se a senha contém letras maiúsculas e minúsculas
        if (!/[a-z]/.test(senha) || !/[A-Z]/.test(senha)) {
            console.log('A senha deve conter pelo menos uma letra maiúscula e uma letra minúscula!');
            return senhaPadrao;
        }
        // Verificar se a senha contém pelo menos um número
        if (!/\d/.test(senha)) {
            console.log('A senha deve conter pelo menos um número!');
            return senhaPadrao;
        }
        // Verificar se a senha contém caracteres especiais
        if (!/[!@#$%^&*()\-=_+[\]{};':"\\|,.<>/?]+/.test(senha)) {
            console.log('A senha deve conter pelo menos um caractere especial!');
            return senhaPadrao;
        }
        // A senha atende a todos os critérios de validação
        return senha;
    }
}
class Administrador extends Usuario {
    constructor(id, nome, email, senha, isAdmin) {
        super(id, nome, email, senha);
        this._isAdmin = isAdmin;
    }
    get isAdmin() {
        return this._isAdmin;
    }
    set isAdmin(isAdmin) {
        this._isAdmin = isAdmin;
    }
}
class Funcionario extends Usuario {
    constructor(id, nome, email, senha, setor) {
        super(id, nome, email, senha);
        this._setor = setor;
    }
    get setor() {
        return this._setor;
    }
    set setor(setor) {
        this._setor = setor;
    }
}
class ClienteUsu extends Usuario {
    constructor(id, nome, email, senha, cliente) {
        super(id, nome, email, senha);
        this._cliente = cliente;
    }
    get cliente() {
        return this._cliente;
    }
    set cliente(cliente) {
        this._cliente = cliente;
    }
}
class Chamado {
    constructor(id, cliente, setor, usuarioLancamento, usuarioSolicitante, assunto, produto, modulo, versao, versaoRealease) {
        this.interacoes = [];
        this._id = id;
        this._cliente = cliente;
        this._setor = setor;
        this._usuarioLancamento = usuarioLancamento;
        this._usuarioSolicitante = usuarioSolicitante;
        this._assunto = assunto;
        this._produto = produto;
        this._modulo = modulo;
        this._versao = versao;
        this._versaoRelease = versaoRealease;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get cliente() {
        return this._cliente;
    }
    set cliente(cliente) {
        this._cliente = cliente;
    }
    get setor() {
        return this._setor;
    }
    set setor(setor) {
        this._setor = setor;
    }
    get usuarioLancamento() {
        return this._usuarioLancamento;
    }
    set usuarioLancamento(usuarioLancamento) {
        this._usuarioLancamento = usuarioLancamento;
    }
    get usuarioSolicitante() {
        return this._usuarioSolicitante;
    }
    set usuarioSolicitante(usuarioSolicitante) {
        this._usuarioSolicitante = usuarioSolicitante;
    }
    get assunto() {
        return this._assunto;
    }
    set assunto(assunto) {
        this._assunto = assunto;
    }
    get produto() {
        return this._produto;
    }
    set produto(produto) {
        this._produto = produto;
    }
    get modulo() {
        return this._modulo;
    }
    set modulo(modulo) {
        this._modulo = modulo;
    }
    get versao() {
        return this._versao;
    }
    set versao(versao) {
        this._versao = versao;
    }
    get versaoRelease() {
        return this._versaoRelease;
    }
    set versaoRelease(versaoRelease) {
        this._versaoRelease = versaoRelease;
    }
    adicionarComentario(usuarioLancamento, comentario) {
        var comentarioChamado = new Comentario(1, this, new Date(), usuarioLancamento, comentario);
        this.interacoes.push(comentarioChamado);
    }
    adicionarEncaminhamento(usuarioLancamento, usuarioResponsavel) {
        var encaminhamentoChamado = new Encaminhamento(2, this, new Date(), usuarioLancamento, usuarioResponsavel);
        this.interacoes.push(encaminhamentoChamado);
    }
}
var SituacaoChamado;
(function (SituacaoChamado) {
    SituacaoChamado[SituacaoChamado["ABERTO"] = 0] = "ABERTO";
    SituacaoChamado[SituacaoChamado["FINALIZADO"] = 1] = "FINALIZADO";
})(SituacaoChamado || (SituacaoChamado = {}));
var TipoChamadoInteracao;
(function (TipoChamadoInteracao) {
    TipoChamadoInteracao[TipoChamadoInteracao["COMENTARIO"] = 0] = "COMENTARIO";
    TipoChamadoInteracao[TipoChamadoInteracao["ENCAMINHAR"] = 1] = "ENCAMINHAR";
})(TipoChamadoInteracao || (TipoChamadoInteracao = {}));
class ChamadoInteracao {
    constructor(id, chamado, dataHora, usuarioLancamento) {
        this._id = id;
        this._chamado = chamado;
        this._dataHora = dataHora;
        this._usuarioLancamento = usuarioLancamento;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get chamado() {
        return this._chamado;
    }
    set chamado(chamado) {
        this._chamado = chamado;
    }
    get dataHora() {
        return this._dataHora;
    }
    set dataHora(dataHora) {
        this._dataHora = dataHora;
    }
    get usuarioLancamento() {
        return this._usuarioLancamento;
    }
    set usuarioLancamento(usuarioLancamento) {
        this._usuarioLancamento = usuarioLancamento;
    }
}
class Comentario extends ChamadoInteracao {
    constructor(id, chamado, dataHora, usuarioLancamento, descricao) {
        super(id, chamado, dataHora, usuarioLancamento);
        this._tipo = TipoChamadoInteracao.COMENTARIO;
        this._descricao = descricao;
    }
    get tipo() {
        return this._tipo;
    }
    set tipo(tipo) {
        this._tipo = tipo;
    }
    get descricao() {
        return this._descricao;
    }
    set descricao(descricao) {
        this._descricao = descricao;
    }
}
class Encaminhamento extends ChamadoInteracao {
    constructor(id, chamado, dataHora, usuarioLancamento, usuarioDestino) {
        super(id, chamado, dataHora, usuarioLancamento);
        this._tipo = TipoChamadoInteracao.ENCAMINHAR;
        this._usuarioDestino = usuarioDestino;
    }
    get tipo() {
        return this._tipo;
    }
    set tipo(tipo) {
        this._tipo = tipo;
    }
    get usuarioDestino() {
        return this._usuarioDestino;
    }
    set usuarioDestino(usuarioDestino) {
        this._usuarioDestino = usuarioDestino;
    }
}
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email)) {
        return email;
    }
    console.log('E-mail inválido!');
    return '';
}
function createNewCliente(id, nome_razaoSocial, nomeSocial_nomeFantasia, tipoPessoa, contribuinteIcms, cpfCnpj, rgIe, status, telefone, telefone2, email, cep, logradouro, numero, bairro, complemento, cidade, uf) {
    return __awaiter(this, void 0, void 0, function* () {
        var cliente = new Cliente(id, nome_razaoSocial, nomeSocial_nomeFantasia, tipoPessoa, contribuinteIcms, cpfCnpj, rgIe, status, telefone, telefone2, email, cep, logradouro, numero, bairro, complemento, cidade, uf);
        return yield cliente.consultarCep();
    });
}
function createNewUsuarioAdministrador(id, nome, email, senha) {
    var administrador = new Administrador(id, nome, email, senha, true);
    return administrador;
}
function createNewUsuarioCliente(id, nome, email, senha, cliente) {
    var clienteUsu = new ClienteUsu(id, nome, email, senha, cliente);
    return clienteUsu;
}
function createNewSetor(id, descricao, usuarioResponsavel) {
    var setor = new Setor(id, descricao, usuarioResponsavel);
    return setor;
}
function createNewUsuarioFuncionario(id, nome, email, senha, setor) {
    var funcionario = new Funcionario(id, nome, email, senha, setor);
    return funcionario;
}
function createNewProduto(id, codigo, descricao, setores) {
    var produto = new Produto(id, codigo, descricao, setores);
    return produto;
}
function createNewModulos(produto, modulos) {
    var modulosPro = [];
    for (let i = 0; i < modulos.length; i++) {
        var modulo = new ProdutoModulo(i + 1, modulos[i], produto);
        modulosPro.push(modulo);
    }
    return modulosPro;
}
function createNewVersoes(produto, versoes, datasPrevisao, datasLiberacao) {
    var versoesPro = [];
    for (let i = 0; i < versoes.length; i++) {
        var versao = new ProdutoVersao(i + 1, versoes[i], new Date(datasPrevisao[i]), versoes[i] !== '' ? new Date(versoes[i]) : null, produto);
        versoesPro.push(versao);
    }
    return versoesPro;
}
function onInit() {
    return __awaiter(this, void 0, void 0, function* () {
        const cliente2 = yield createNewCliente(1, 'NEO SISTEMAS DE INFORMATICA LTDA', 'Neo Sistemas', TipoPessoa.JURIDICA, YesNoOption.NAO, '82130709000176', 'ISENTO', Status.ATIVO, '4836587070', '', 'financeiro@neosistemas.com.br', '88870000', 'José Adélcio da Silva', 77, 'Rio Bonito', 'Edifício', '', '');
        console.log(cliente2);
        const cliente = yield createNewCliente(1, 'NEO SISTEMAS DE INFORMATICA LTDA', 'Neo Sistemas', TipoPessoa.JURIDICA, YesNoOption.NAO, '82130709000176', 'ISENTO', Status.ATIVO, '4836587070', '', 'financeiro@neosistemas.com.br', '88750000', 'José Adélcio da Silva', 77, 'Rio Bonito', 'Edifício', '', '');
        console.log(cliente);
        const administrador = createNewUsuarioAdministrador(1, 'Márcio José da Silva', 'marcio@neosistemas.com.br', 'Abc123467&8');
        console.log(administrador);
        const administrador2 = createNewUsuarioAdministrador(2, 'Alexandre Duarte', 'alexandre@neosistemas.com.br', 'aaaadE0987$');
        console.log(administrador2);
        const administrador3 = createNewUsuarioAdministrador(3, 'Sandro Marcelino', 'sandro@neosistemas.com.br', 'aAa77mnpl7');
        console.log(administrador3);
        const clienteusu = createNewUsuarioCliente(2, 'Gabriela Martins da Silva', 'gabriela@neosistemas.com.br', '01235HHPOMNH', cliente);
        console.log(clienteusu);
        const setor = createNewSetor(1, 'Desenvolvimento', administrador);
        console.log(setor);
        const setor2 = createNewSetor(2, 'Comercial', administrador2);
        console.log(setor2);
        const setor3 = createNewSetor(3, 'Contábil', administrador3);
        console.log(setor3);
        const funcionario = createNewUsuarioFuncionario(3, 'Camila Martins da Silva', 'camila@neosistemas.com.br', 'AAAAAAAAAAA', setor);
        console.log(funcionario);
        const produto = createNewProduto(1, '00001', 'Neocorp Web', [setor, setor2, setor3]);
        console.log(produto);
        const modulos = createNewModulos(produto, ['Financeiro', 'Comercial', 'Custos', 'Exportação', 'Produção', 'Frota', 'Força de Vendas', 'Controle de Grãos']);
        console.log(modulos);
        const versoes = createNewVersoes(produto, ['3.7.7', '3.7.8', '3.7.9', '3.8.0', '3.8.1', '3.8.2'], ['2022-10-10', '2022-11-28', '2023-02-13', '2023-04-10',
            '2023-05-22', '2023-07-10'], ['2022-10-11', '2022-11-30', '2023-02-13', '2023-04-10', '2023-05-23', '']);
        console.log(versoes);
        const chamado = novoChamado(cliente, setor, funcionario, clienteusu, 'Solicitação de melhoria na Nota Entrada', 'Ao selecionar o fornecedor é apresentado somente o nome do mesmo, solicitamos que seja adicionado também o CNPJ/CPF.', produto, modulos[1], versoes[5], '01');
    });
}
function novoChamado(cliente, setor, usuarioLancamento, usuarioSolicitante, assunto, comentario, produto, modulo, versao, realease) {
    var chamado = new Chamado(1, cliente, setor, usuarioLancamento, usuarioSolicitante, assunto, produto, modulo, versao, realease);
    chamado.adicionarComentario(usuarioLancamento, comentario);
    chamado.adicionarEncaminhamento(usuarioLancamento, setor.usuarioResponsavel);
    console.log(chamado);
    return chamado;
}
onInit();
