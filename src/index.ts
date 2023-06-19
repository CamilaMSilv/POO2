enum TipoPessoa {
    JURIDICA,
    FISICA
}

enum YesNoOption {
    SIM,
    NAO
}

enum Status {
    ATIVO,
    INATIVO
}

class Cliente {
    private _id: number
    private _nome_razaoSocial: string
    private _nomeSocial_nomeFantasia: string
    private _tipoPessoa: TipoPessoa
    private _contribuinteIcms: YesNoOption
    private _cpfCnpj: string
    private _rgIe: string
    private _status: Status
    private _telefone: string
    private _telefone2: string
    private _email: string
    private _cep: string
    private _logradouro: string
    private _numero: Number
    private _bairro: string
    private _complemento: string
    private _cidade: string
    private _uf: string

    constructor(id: number, nome_razaoSocial: string, nomeSocial_nomeFantasia: string, tipoPessoa: TipoPessoa,
        contribuinteIcms: YesNoOption, cpfCnpj: string, rgIe: string, status: Status, telefone: string,
        telefone2: string, email: string, cep: string, logradouro: string, numero: Number, bairro: string,
        complemento: string, cidade: string, uf: string) {

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

    get nomeSocial_nomeFantasia(): string {
        return this._nomeSocial_nomeFantasia;
    }

    set nomeSocial_nomeFantasia(nomeSocial_nomeFantasia: string) {
        this._nomeSocial_nomeFantasia = nomeSocial_nomeFantasia;
    }

    get tipoPessoa(): TipoPessoa {
        return this._tipoPessoa;
    }

    set tipoPessoa(tipoPessoa: TipoPessoa) {
        this._tipoPessoa = tipoPessoa;
    }

    get contribuinteIcms(): YesNoOption {
        return this._contribuinteIcms;
    }

    set contribuinteIcms(contribuinteIcms: YesNoOption) {
        this._contribuinteIcms = contribuinteIcms;
    }

    get cpfCnpj(): string {
        return this._cpfCnpj;
    }

    set cpfCnpj(cpfCnpj: string) {
        this._cpfCnpj = cpfCnpj;
    }

    get rgIe(): string {
        return this._rgIe;
    }

    set rgIe(rgIe: string) {
        this._rgIe = rgIe;
    }

    get status(): Status {
        return this._status;
    }

    set status(status: Status) {
        this._status = status;
    }

    get telefone(): string {
        return this._telefone;
    }

    set telefone(telefone: string) {
        this._telefone = telefone;
    }

    get telefone2(): string {
        return this._telefone2;
    }

    set telefone2(telefone2: string) {
        this._telefone2 = telefone2;
    }

    get email(): string {
        return this._email;
    }

    set email(email: string) {
        this._email = email;
    }

    get cep(): string {
        return this._cep;
    }

    set cep(cep: string) {
        this._cep = cep;
    }

    get logradouro(): string {
        return this._logradouro;
    }

    set logradouro(logradouro: string) {
        this._logradouro = logradouro;
    }

    get numero(): Number {
        return this._numero;
    }

    set numero(numero: Number) {
        this._numero = numero;
    }

    get bairro(): string {
        return this._bairro;
    }

    set bairro(bairro: string) {
        this._bairro = bairro;
    }

    get complemento(): string {
        return this._complemento;
    }

    set complemento(complemento: string) {
        this._complemento = complemento;
    }

    get cidade(): string {
        return this._cidade;
    }

    set cidade(cidade: string) {
        this._cidade = cidade;
    }

    get uf(): string {
        return this._uf;
    }

    set uf(uf: string) {
        this._uf = uf;
    }

    public async consultarCep(): Promise<any> {
        const url = 'https://apphom.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl';
        try {
            var cep = this.cep;
            if (cep.trim() !== '') {
                const soap = require('soap')
                const client = await soap.createClientAsync(url);
                const result = await client.consultaCEPAsync({ cep });
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
        } catch (error) {
            console.log('Erro ao consultar CEP:', error);
        }
        return this;
    }

    private validarCep(cep: string): string {
        cep = cep.replace(/[^\d]+/g, '');
        const cepRegex = /^[0-9]{8}$/;
        if (cepRegex.test(cep)) {
            return cep;
        }
        console.log('Cep inválido!');
        return '';
    }

    private validarDocumento(cpfCnpj: string): string {
        var retorno: boolean = true;
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

        } else if (cpfCnpj.length === 14) {
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

        } else {
            console.log('CPF/CNPJ inválido!');
            return '';
        }
    }

    private validarRgOuInscricaoEstadual(numero: string): string {
        // Remova qualquer formatação indesejada do número
        const numeroLimpo = numero.replace(/[^\d]/g, "");

        // Verifique se o número possui o formato correto
        // const regex = /^[0-9]{8}-?[0-9]{1}$/;
        // if (!regex.test(numeroLimpo)) {
        //   return false;
        // }

        // Verifique o dígito verificador
        const digitos = numeroLimpo.split("");
        const tamanho = digitos.length;

        // Validação para RG
        if (tamanho === 9) {
            const soma = (parseInt(digitos[0]) * 2) +
                (parseInt(digitos[1]) * 3) +
                (parseInt(digitos[2]) * 4) +
                (parseInt(digitos[3]) * 5) +
                (parseInt(digitos[4]) * 6) +
                (parseInt(digitos[5]) * 7) +
                (parseInt(digitos[6]) * 8) +
                (parseInt(digitos[7]) * 9);
            const digitoVerificador = soma % 11 === 10 ? 0 : soma % 11;
            if (digitoVerificador.toString() === digitos[tamanho - 1]) {
                return numeroLimpo;
            }
            console.log('RG inválido!');
        }

        // Validação para Inscrição Estadual
        if (tamanho === 8) {
            let soma = 0;
            for (let i = 0; i < tamanho - 1; i++) {
                soma += parseInt(digitos[i]) * (tamanho - i);
            }
            const digitoVerificador = 11 - (soma % 11);
            if (digitoVerificador.toString() === digitos[tamanho - 1]) {
                return numeroLimpo;
            }
            console.log('Inscrição Estadual inválida!');
        }
        return '';
    }
}

class Produto {
    private _id: number
    private _codigo: string
    private _descricao: string
    private _setores: Setor[]

    constructor(id: number, codigo: string, descricao: string, setores: Setor[]) {

        this._id = id;
        this._codigo = codigo;
        this._descricao = descricao;
        this._setores = setores;
    }

    get id(): number {
        return this._id;
    }

    set id(id: number) {
        this._id = id;
    }

    get codigo(): string {
        return this._codigo;
    }

    set codigo(codigo: string) {
        this._codigo = codigo;
    }

    get descricao(): string {
        return this._descricao;
    }

    set descricao(descricao: string) {
        this._descricao = descricao;
    }

    get setores(): Setor[] {
        return this._setores;
    }

    set setores(setores: Setor[]) {
        this._setores = setores;
    }
}

class ProdutoModulo {
    private _id: number
    private _descricao: string
    private _produto: Produto

    constructor(id: number, descricao: string, produto: Produto) {

        this._id = id;
        this._descricao = descricao;
        this._produto = produto;
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

    get produto(): Produto {
        return this._produto;
    }

    set produto(produto: Produto) {
        this._produto = produto;
    }
}

class ProdutoVersao {
    private _id: number
    private _numeroVersao: string
    private _dataPrevisao: Date
    private _dataLiberacao: Date | null
    private _produto: Produto

    constructor(id: number, numeroVersao: string, dataPrevisao: Date, dataLiberacao: Date | null, produto: Produto) {

        this._id = id;
        this._numeroVersao = numeroVersao;
        this._dataPrevisao = dataPrevisao;
        this._dataLiberacao = dataLiberacao;
        this._produto = produto;
    }

    get id(): number {
        return this._id;
    }

    set id(id: number) {
        this._id = id;
    }

    get numeroVersao(): string {
        return this._numeroVersao;
    }

    set numeroVersao(numeroVersao: string) {
        this._numeroVersao = numeroVersao;
    }

    get dataPrevisao(): Date {
        return this._dataPrevisao;
    }

    set dataPrevisao(dataPrevisao: Date) {
        this._dataPrevisao = dataPrevisao;
    }

    get dataLiberacao(): Date | null {
        return this._dataLiberacao;
    }

    set dataLiberacao(dataLiberacao: Date | null) {
        this._dataLiberacao = dataLiberacao;
    }

    get produto(): Produto {
        return this._produto;
    }

    set produto(produto: Produto) {
        this._produto = produto;
    }
}

class Setor {
    private _id: number
    private _descricao: string
    private _usuarioResponsavel: Usuario

    constructor(id: number, descricao: string, usuarioResponsavel: Usuario) {

        this._id = id;
        this._descricao = descricao;
        this._usuarioResponsavel = usuarioResponsavel;
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

    get usuarioResponsavel(): Usuario {
        return this._usuarioResponsavel;
    }

    set usuarioResponsavel(usuarioResponsavel: Usuario) {
        this._usuarioResponsavel = usuarioResponsavel;
    }
}

class Usuario {
    private _id: number
    private _nome: string
    private _email: string
    private _senha: string

    constructor(id: number, nome: string, email: string, senha: string) {

        this._id = id;
        this._nome = nome;
        this._email = validarEmail(email);
        this._senha = this.validarSenha(senha);
    }

    get id(): number {
        return this._id;
    }

    set id(id: number) {
        this._id = id;
    }

    get nome(): string {
        return this._nome;
    }

    set nome(nome: string) {
        this._nome = nome;
    }

    get email(): string {
        return this._email;
    }

    set email(email: string) {
        this._email = email;
    }

    get senha(): string {
        return this._senha;
    }

    set senha(senha: string) {
        this._senha = senha;
    }

    private validarSenha(senha: string): string {
        const senhaPadrao = 'SenhaPadrao123!';
        // Verificar o tamanho mínimo da senha
        if (senha.length < 8) {
            console.log('A senha deve ter no mínimo 8 caracteres!')
            return senhaPadrao;
        }
        // Verificar se a senha contém letras maiúsculas e minúsculas
        if (!/[a-z]/.test(senha) || !/[A-Z]/.test(senha)) {
            console.log('A senha deve conter pelo menos uma letra maiúscula e uma letra minúscula!')
            return senhaPadrao;
        }
        // Verificar se a senha contém pelo menos um número
        if (!/\d/.test(senha)) {
            console.log('A senha deve conter pelo menos um número!')
            return senhaPadrao;
        }
        // Verificar se a senha contém caracteres especiais
        if (!/[!@#$%^&*()\-=_+[\]{};':"\\|,.<>/?]+/.test(senha)) {
            console.log('A senha deve conter pelo menos um caractere especial!')
            return senhaPadrao;
        }
        // A senha atende a todos os critérios de validação
        return senha;
    }
}

class Administrador extends Usuario {
    private _isAdmin: boolean;

    constructor(id: number, nome: string, email: string, senha: string, isAdmin: boolean) {
        super(id, nome, email, senha);
        this._isAdmin = isAdmin;
    }

    get isAdmin(): boolean {
        return this._isAdmin;
    }

    set isAdmin(isAdmin: boolean) {
        this._isAdmin = isAdmin;
    }
}

class Funcionario extends Usuario {
    private _setor: Setor;

    constructor(id: number, nome: string, email: string, senha: string, setor: Setor) {
        super(id, nome, email, senha);
        this._setor = setor;
    }

    get setor(): Setor {
        return this._setor;
    }

    set setor(setor: Setor) {
        this._setor = setor;
    }
}

class ClienteUsu extends Usuario {
    private _cliente: Cliente;

    constructor(id: number, nome: string, email: string, senha: string, cliente: Cliente) {
        super(id, nome, email, senha);
        this._cliente = cliente;
    }

    get cliente(): Cliente {
        return this._cliente;
    }

    set cliente(cliente: Cliente) {
        this._cliente = cliente;
    }
}

class Chamado {
    private _id: number;
    private _cliente: Cliente;
    private _setor: Setor;
    private _usuarioLancamento: Usuario;
    private _usuarioSolicitante: Usuario;
    private _assunto: string;
    private _produto: Produto;
    private _modulo: ProdutoModulo;
    private _versao: ProdutoVersao;
    private _versaoRelease: string;
    public interacoes: Array<ChamadoInteracao> = [];

    constructor(id: number, cliente: Cliente, setor: Setor, usuarioLancamento: Usuario, usuarioSolicitante: Usuario,
        assunto: string, produto: Produto, modulo: ProdutoModulo, versao: ProdutoVersao, versaoRealease: string) {
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

    get id(): number {
        return this._id;
    }

    set id(id: number) {
        this._id = id;
    }

    get cliente(): Cliente {
        return this._cliente;
    }

    set cliente(cliente: Cliente) {
        this._cliente = cliente;
    }

    get setor(): Setor {
        return this._setor;
    }

    set setor(setor: Setor) {
        this._setor = setor;
    }

    get usuarioLancamento(): Usuario {
        return this._usuarioLancamento;
    }

    set usuarioLancamento(usuarioLancamento: Usuario) {
        this._usuarioLancamento = usuarioLancamento;
    }

    get usuarioSolicitante(): Usuario {
        return this._usuarioSolicitante;
    }

    set usuarioSolicitante(usuarioSolicitante: Usuario) {
        this._usuarioSolicitante = usuarioSolicitante;
    }

    get assunto(): string {
        return this._assunto;
    }

    set assunto(assunto: string) {
        this._assunto = assunto;
    }

    get produto(): Produto {
        return this._produto;
    }

    set produto(produto: Produto) {
        this._produto = produto;
    }

    get modulo(): ProdutoModulo {
        return this._modulo;
    }

    set modulo(modulo: ProdutoModulo) {
        this._modulo = modulo;
    }

    get versao(): ProdutoVersao {
        return this._versao;
    }

    set versao(versao: ProdutoVersao) {
        this._versao = versao;
    }

    get versaoRelease(): string {
        return this._versaoRelease;
    }

    set versaoRelease(versaoRelease: string) {
        this._versaoRelease = versaoRelease;
    }

    adicionarComentario(usuarioLancamento: Usuario, comentario: string) {
        var comentarioChamado = new Comentario(1, this, new Date(), usuarioLancamento, comentario);
        this.interacoes.push(comentarioChamado);
    }

    adicionarEncaminhamento(usuarioLancamento: Usuario, usuarioResponsavel: Usuario) {
        var encaminhamentoChamado = new Encaminhamento(2, this, new Date(), usuarioLancamento, usuarioResponsavel);
        this.interacoes.push(encaminhamentoChamado);
    }
}

enum SituacaoChamado {
    ABERTO,
    FINALIZADO
}

enum TipoChamadoInteracao {
    COMENTARIO,
    ENCAMINHAR
}

class ChamadoInteracao {
    private _id: number;
    private _chamado: Chamado;
    private _dataHora: Date;
    private _usuarioLancamento: Usuario;

    constructor(id: number, chamado: Chamado, dataHora: Date, usuarioLancamento: Usuario) {
        this._id = id;
        this._chamado = chamado;
        this._dataHora = dataHora;
        this._usuarioLancamento = usuarioLancamento;
    }

    get id(): number {
        return this._id;
    }

    set id(id: number) {
        this._id = id;
    }

    get chamado(): Chamado {
        return this._chamado;
    }

    set chamado(chamado: Chamado) {
        this._chamado = chamado;
    }

    get dataHora(): Date {
        return this._dataHora;
    }

    set dataHora(dataHora: Date) {
        this._dataHora = dataHora;
    }

    get usuarioLancamento(): Usuario {
        return this._usuarioLancamento;
    }

    set usuarioLancamento(usuarioLancamento: Usuario) {
        this._usuarioLancamento = usuarioLancamento;
    }
}

class Comentario extends ChamadoInteracao {
    private _tipo: TipoChamadoInteracao;
    private _descricao: string;

    constructor(id: number, chamado: Chamado, dataHora: Date, usuarioLancamento: Usuario, descricao: string) {
        super(id, chamado, dataHora, usuarioLancamento);
        this._tipo = TipoChamadoInteracao.COMENTARIO;
        this._descricao = descricao;
    }

    get tipo(): TipoChamadoInteracao {
        return this._tipo;
    }

    set tipo(tipo: TipoChamadoInteracao) {
        this._tipo = tipo;
    }

    get descricao(): string {
        return this._descricao;
    }

    set descricao(descricao: string) {
        this._descricao = descricao;
    }
}

class Encaminhamento extends ChamadoInteracao {
    private _tipo: TipoChamadoInteracao;
    private _usuarioDestino: Usuario;

    constructor(id: number, chamado: Chamado, dataHora: Date, usuarioLancamento: Usuario, usuarioDestino: Usuario) {
        super(id, chamado, dataHora, usuarioLancamento);
        this._tipo = TipoChamadoInteracao.ENCAMINHAR;
        this._usuarioDestino = usuarioDestino;
    }

    get tipo(): TipoChamadoInteracao {
        return this._tipo;
    }

    set tipo(tipo: TipoChamadoInteracao) {
        this._tipo = tipo;
    }

    get usuarioDestino(): Usuario {
        return this._usuarioDestino;
    }

    set usuarioDestino(usuarioDestino: Usuario) {
        this._usuarioDestino = usuarioDestino;
    }
}

function validarEmail(email: string): string {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email)) {
        return email;
    }
    console.log('E-mail inválido!')
    return '';
}


async function createNewCliente(id: number, nome_razaoSocial: string, nomeSocial_nomeFantasia: string,
    tipoPessoa: TipoPessoa, contribuinteIcms: YesNoOption, cpfCnpj: string, rgIe: string, status: Status,
    telefone: string, telefone2: string, email: string, cep: string, logradouro: string, numero: Number,
    bairro: string, complemento: string, cidade: string, uf: string): Promise<Cliente> {

    var cliente = new Cliente(id, nome_razaoSocial, nomeSocial_nomeFantasia, tipoPessoa, contribuinteIcms, cpfCnpj, rgIe, status, telefone,
        telefone2, email, cep, logradouro, numero, bairro, complemento, cidade, uf);

    return await cliente.consultarCep();
}

function createNewUsuarioAdministrador(id: number, nome: string, email: string, senha: string): Administrador {
    var administrador = new Administrador(id, nome, email, senha, true);
    return administrador;
}

function createNewUsuarioCliente(id: number, nome: string, email: string, senha: string, cliente: Cliente): ClienteUsu {
    var clienteUsu = new ClienteUsu(id, nome, email, senha, cliente);
    return clienteUsu;
}

function createNewSetor(id: number, descricao: string, usuarioResponsavel: Usuario): Setor {
    var setor = new Setor(id, descricao, usuarioResponsavel);
    return setor;
}

function createNewUsuarioFuncionario(id: number, nome: string, email: string, senha: string, setor: Setor): Funcionario {
    var funcionario = new Funcionario(id, nome, email, senha, setor);
    return funcionario;
}

function createNewProduto(id: number, codigo: string, descricao: string, setores: Setor[]): Produto {
    var produto = new Produto(id, codigo, descricao, setores);
    return produto;
}

function createNewModulos(produto: Produto, modulos: string[]): ProdutoModulo[] {
    var modulosPro: ProdutoModulo[] = [];
    for (let i = 0; i < modulos.length; i++) {
        var modulo = new ProdutoModulo(i + 1, modulos[i], produto);
        modulosPro.push(modulo);
    }
    return modulosPro;
}

function createNewVersoes(produto: Produto, versoes: string[], datasPrevisao: string[], datasLiberacao: string[]): ProdutoVersao[] {
    var versoesPro: ProdutoVersao[] = [];
    for (let i = 0; i < versoes.length; i++) {
        var versao = new ProdutoVersao(i + 1, versoes[i], new Date(datasPrevisao[i]),
            versoes[i] !== '' ? new Date(versoes[i]) : null, produto);
        versoesPro.push(versao);
    }
    return versoesPro;
}

async function onInit() {

    const cliente = await createNewCliente(1, 'NEO SISTEMAS DE INFORMATICA LTDA', 'Neo Sistemas', TipoPessoa.JURIDICA, YesNoOption.NAO,
        '82130709000176', 'ISENTO', Status.ATIVO, '4836587070', '', 'financeiro@neosistemas.com.br', '88750000', 'José Adélcio da Silva',
        77, 'Rio Bonito', 'Edifício', '', '');
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

    const chamado = novoChamado(cliente, setor, funcionario, clienteusu, 'Solicitação de melhoria na Nota Entrada',
        'Ao selecionar o fornecedor é apresentado somente o nome do mesmo, solicitamos que seja adicionado também o CNPJ/CPF.',
        produto, modulos[1], versoes[5], '01');
}

function novoChamado(cliente: Cliente, setor: Setor, usuarioLancamento: Usuario, usuarioSolicitante: Usuario, assunto: string,
    comentario: string, produto: Produto, modulo: ProdutoModulo, versao: ProdutoVersao, realease: string): Chamado {

    var chamado = new Chamado(1, cliente, setor, usuarioLancamento, usuarioSolicitante, assunto, produto, modulo, versao, realease);
    chamado.adicionarComentario(usuarioLancamento, comentario);
    chamado.adicionarEncaminhamento(usuarioLancamento, setor.usuarioResponsavel);
    console.log(chamado);
    return chamado;
}

onInit();