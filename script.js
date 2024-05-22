function consultaCEP(cep) {
    cep = cep.replace(/\D/g, '');//expressao regular -> regex
    if (cep != "") {

        const padraoCep = /^[0-9]{8}$; // regex 
        if (padraoCep.test(cep)) {
            document.querySelector('#bairro').setAttribute('readonly','');
            document.querySelector('#cidade').setAttribute('readonly','');
            document.querySelector('#logradouro').setAttribute('readonly','');


            const requisicao = new Request(`https://viacep.com.br/ws/${cep}/json`, {
                "method": "GET",
                "headers": {
                    "Content-type": "application/json"
                }
            });
            fetch(requisicao)
                .then(resposta => resposta.json())
                .then(resposta  => {
                    if(!("erro" in resposta)){
                    document.querySelector('#logradouro').value = resposta.logradouro;
                    document.querySelector('#bairro').value = resposta.bairro;
                    document.querySelector('#cidade').value = resposta.localidade;
                    document.querySelector('#uf').value = resposta.uf;

                 } else{
                    limpaForm();
                    window.alert('CEP nao localizado');
                    document.querySelector('#bairro').removeAttribute('readyonly')
                    document.querySelector('#logradouro').removeAttribute('readyonly')
                    document.querySelector('#cidade').removeAttribute('readyonly')
                    document.querySelector('#uf').removeAttribute('readyonly') 

                
                 }
                })

                 } else {
            limpaForm();
            window.alert('O formato do CEP é invalido')

        }
     } else {
        limpaForm();
        window.alert('Digite um CEP!');

    } 
}

    function limpaForm(){
        document.querySelectorAll('input;not (:first-of-type)').forEach(input => {
            input.value = '';
        })

    }