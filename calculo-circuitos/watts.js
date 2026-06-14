function gerarInputs(){
    let qtd = document.getElementById("numResistencias").value
    let container = document.getElementById("containerResistencias")
    container.innerHTML = ``
    container.style.display = "block"

    document.getElementById("erroValorResistencias").innerHTML = ``

    if(qtd > 50){
        document.getElementById("erroResistencias").innerHTML = `Número máximo de resistências: 50`
    }
    else{
        document.getElementById("erroResistencias").innerHTML = ``
        for(let i = 1; i <= qtd; i++){
        container.innerHTML += `<strong>Valor da resistência: ${i}</strong> <input type="number" class="ohms" min="1"> <strong>Ω</strong> <br>`
    }
    }
}

function calcular(){
    let qtd = document.getElementById("numResistencias").value
    let volts = document.getElementById("volts").value
    let inputOhms = document.getElementsByClassName("ohms")
    let tipo = document.querySelector(`input[name="tipo"]:checked`).value
    let resultadosDiv = document.getElementById("resultados")
    
    if(volts <= 0 || isNaN(volts)){
        document.getElementById("erroVoltagem").innerHTML = `O valor da tensão está vazio ou é inválido! Preencha o campo corretamente.`
        return
    }
    else{
        document.getElementById("erroVoltagem").innerHTML = ``
    }
    
    if(qtd <= 0 || isNaN(qtd)){
        document.getElementById("erroResistencias").innerHTML = `O número de resistências está vazio ou é inválido! Preencha o campo corretamente.`
        return
    }
    else{
        document.getElementById("erroResistencias").innerHTML = ``
    }


    if(qtd > 0 && volts > 0){
        let req = 0
        let somaParalelo = 0

        for(let i = 0; i < inputOhms.length; i++){
            let valor = Number(inputOhms[i].value)

            if (valor <= 0 || isNaN(valor)) {
                document.getElementById("erroValorResistencias").innerHTML = `O valor da resistência ${i + 1} está vazio ou é inválido! Preencha todos os campos corretamente.`
                return
            }
            else{
                document.getElementById("erroValorResistencias").innerHTML = ``
            }

            if(tipo == "serie"){
                req = req + valor
            }
            else{
                somaParalelo = somaParalelo + (1 / valor)
            }
        }

        if(tipo == "paralelo"){
            req = 1 / somaParalelo
        }

        let corrente = volts / req
        let watts = volts * corrente
        let kw = watts / 1000

        resultadosDiv.innerHTML = `
            <p><strong>Resistência Equivalente:</strong> ${+req.toFixed(2)} Ω</p>
            <p><strong>Potência:</strong> ${+watts.toFixed(2)} W</p>
            <p><strong>Consumo:</strong> ${+kw.toFixed(4)} kWh</p>
        `
    }
}

function resetar(){
    let volts = document.getElementById("volts")
    let qtd = document.getElementById("numResistencias")
    let inputOhms = document.getElementsByClassName("ohms")
    let resultadosDiv = document.getElementById("resultados")
    let container = document.getElementById("containerResistencias")
    
    container.innerHTML = ``
    volts.value = ``
    qtd.value = ``
    inputOhms.value = ``
    resultadosDiv.innerHTML = ``

    document.getElementById("erroResistencias").innerHTML = ``
    document.getElementById("erroVoltagem").innerHTML = ``
    document.getElementById("erroValorResistencias").innerHTML = ``
}