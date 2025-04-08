document.querySelector('#formulario').addEventListener('submit', function(e) {
    e.preventDefault(); // Impede recarregar a página
    verificarDados();
});

function verificarDados(){
    
    let valor = document.getElementById("valor").value;
    let metodo = document.querySelector('input[name="opcoes_pagamento"]:checked').value;


    if (valor === "" ){
        alert("É obrigatório informar um valor!");
        document.getElementById("valor").focus();
    }

    else{
        if (metodo === "pix"){
            calculoPix(valor);
        }
        else{
            calculoCredito(valor);
        }
    }

    //Com a função abaixo, é gerado o formulário no caso da opção Pix estar selecionada
    function calculoPix(valor){

        let valorNovo= valor-(valor*0.1);

        document.getElementById("segundoForm").innerHTML =`
        <form method="post" id="formulario2" class="text-center mb-1 border border-dark rounded mx-auto" style="max-width:500px;">

            <section>
                <h3 class=titulo>Pix</h3>
                <br>

                <label for=cpf required>CPF</label>  
                <input type=number value="" id="cpf" name="cpf">

                <br>
            </section>

            <p id=valorTotal> Total =  R$ ${valorNovo.toFixed(2)} </p>
            <input type="submit" value="Pagar" class="btn btn-secondary">
        </form>`;

        document.querySelector('#formulario2').addEventListener('submit', function(e) {
            e.preventDefault(); // Impede recarregar a página
            let verificarCpf = document.getElementById("cpf").value;
            
            if(verificarCpf === ""){
                alert("É obrigatório informar seu CPF!");
                document.getElementById("cpf").focus();
            }
            else{
                alert("Pagamento realizado com sucesso!");
            }
        });
            
    }

    //Com a função abaixo, é gerado o formulário no caso da opção Cartão de Crédito estar selecionada
    function calculoCredito(valor){

        document.getElementById("segundoForm").innerHTML = `
        <form method="post" id="formulario2" class="text-center mb-1 border border-dark border border-dark rounded p-5 mx-auto" style="max-width: 500px;">
                
            <section class="text-center">
                <h3 class="titulo mb-4 text-black">Cartão de crédito</h3>
    
                <!-- Número do Cartão -->
                <div class="d-flex align-items-center mb-3">
                    <label for="numeroCartao" class="me-2 text-black" style="width: 120px;">Número:</label>
                    <input type="number" class="form-control me-2" id="numeroCartao" style="flex:1;" required>
                    <div id="img"></div>
                </div>
                <div id="erro" class="text-danger mb-3"></div>
    
                <!-- Titular -->
                <div class="d-flex align-items-center mb-3">
                    <label for="titular" class="me-2 text-black" style="width: 120px;">Titular:</label>
                    <input type="text" class="form-control" id="titular" required>
                </div>
    
                <!-- Código Segurança -->
                <div class="d-flex align-items-center mb-3">
                    <label for="codigoSeguranca" class="me-2 text-black" style="width: 120px;">Cód. Segurança:</label>
                    <input type="number" class="form-control" id="codigoSeguranca" maxlength="5" required>
                </div>
    
                <!-- Vencimento -->
                <div class="d-flex align-items-center mb-3">
                    <label for="vencimento" class="me-2 text-black" style="width: 120px;">Vencimento:</label>
                    <input type="month" class="form-control" id="vencimento" required>
                </div>
    
                <!-- Parcelas -->
                <div class="d-flex align-items-center mb-4">
                    <label for="parcelas" class="me-2 text-black" style="width: 120px;">Parcelas:</label>
                    <select id="parcelas" class="form-select">
                        <option value="1">1x</option>
                        <option value="2">2x</option>
                        <option value="3">3x</option>
                        <option value="4">4x</option>
                        <option value="5">5x</option>
                    </select>
                </div>
    
            </section>
    
            <p id="valorTotal" class="fw-bold text-black">Total = R$ ${Number(valor).toFixed(2)}</p>
            <input type="submit" value="Pagar" class="btn btn-secondary w-50">
    
        </form>`;

        document.querySelector("#parcelas").addEventListener('change',function(e){

            let parcelas = document.getElementById("parcelas").value;
            let novoValor;

            if(parcelas == 4){
                novoValor=valor*1.05;
            }
            else if(parcelas == 5){
                novoValor=valor*1.1;
            }
            else{
                novoValor=valor;
            }

            document.getElementById("valorTotal").innerHTML=`<p>Total = R$ ${Number(novoValor).toFixed(2)}</p>`;
        })

        //Adiciona um event listener para filtrar se o número do cartão é válido ou não, no caso acertivo, é ilustrado o selo da marca do cartão, caso contrário, um texto de erro é apresentado abaixo do campo para digitação.

        document.getElementById('numeroCartao').addEventListener('input',function(e)
        {   
            let numero = document.getElementById("numeroCartao").value;

            if(numero.startsWith("1234")){
                document.getElementById("img").innerHTML = `
                <img src="imagens/seloMastercard.png" alt="Selo Mastercard" style="max-width:5em">
                `
                semErroCartao();

            }else if(numero.startsWith("4321")){
                document.getElementById("img").innerHTML = `
                <img src="imagens/seloVisa.png" alt="Selo Visa" style="max-width:5em">
                `
                semErroCartao();
            }else{
                erroCartao();
            };
            
        });

        function semErroCartao(){
            document.getElementById("erro").innerHTML=``
        };

        function erroCartao(){
            document.getElementById("img").innerHTML= ``
            document.getElementById("erro").innerHTML= `<p> Número de cartão inválido </p>`
        }

        //Impede que a página seja recarregada ao apertar o botão Submit do formulário
        document.querySelector('#formulario2').addEventListener('submit', function(e) {
            e.preventDefault(); // Impede recarregar a página
            alert("Pagamento realizado com sucesso!");
        });
    }

}