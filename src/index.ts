class ContaBancaria {
    public numero: number; /*O atributo numero é público, ou seja, pode ser acessado de fora da classe*/
    private saldo: number; /*O atributo saldo é privado, ou seja, só pode ser acessado dentro da própria classe*/
    protected limite: number; /*O atributo limite é protegido, ou seja, pode ser acessado dentro da própria classe e também por suas subclasses*/
  
    constructor(numero: number, saldo: number, limite: number) {
      this.numero = numero;
      this.saldo = saldo;
      this.limite = limite;
    }
   
  public depositar(valor: number): void {
      this.saldo += valor;
    } /*No método depositar, estamos adicionando um valor ao saldo da conta, que é um atributo privado, mas pode ser acessado livremente pelo método público*/
  
    public sacar(valor: number): void {
      if (valor <= this.saldo + this.limite) {
        this.saldo -= valor;
        console.log(`Saque de R$ ${valor} realizado com sucesso.`);
      } else {
        console.log('Saldo insuficiente.');
      }
    } /*No método sacar, estamos verificando se o valor solicitado está dentro do limite disponível na conta, que é um atributo protegido, e depois subtraindo esse valor do saldo*/
  
    public consultarSaldo(): void {
      console.log(`Saldo: R$ ${this.saldo}.`);
    } /*No método consultarSaldo, estamos apenas exibindo o saldo atual, que é um atributo privado*/
  
    private verificarLimite(): void {
      console.log(`Limite: R$ ${this.limite}.`);
    }
  }
  
  const minhaConta = new ContaBancaria(123456, 1000, 500);
  
  // Acesso público
  minhaConta.depositar(500);
  minhaConta.consultarSaldo();
  
  // Acesso privado
  // minhaConta.verificarLimite(); // Erro: Property 'verificarLimite' is private
  
  // Acesso protegido
  // console.log(minhaConta.limite); // Erro: Property 'limite' is protected
  
  /*Por fim, tentamos acessar o método verificarLimite e o atributo limite diretamente fora da classe ContaBancaria, mas como eles são privados e protegidos, respectivamente, essas operações geram erros*/
  