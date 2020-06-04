function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then ( res =>  res.json() ) 
    .then ( states => {

        for( const state of states){
            ufSelect.innerHTML += `<option value = "${state.id}"> ${state.nome}</option>`
        }
    })    
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInpunt = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInpunt.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = " <option value>Selecione a Cidade</option> "
    citySelect.disabled = true

    fetch(url)
    .then ( res =>  res.json() ) 
    .then ( cities => {
       

        for( const city of cities){
            citySelect.innerHTML += `<option value = "${city.nome}"> ${city.nome}</option>`
        }

        citySelect.disabled = false
    })  

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//itens de coleta
//pegar todos os li

const ItensToCollect = document.querySelectorAll(".items-grid li")

for(const item of ItensToCollect){
    item.addEventListener("click", handSelectedItem)
}

const collectedItems = document.querySelector('input[name=items]')
let selectedItems = []

function handSelectedItem(event){
    const itemLi = event.target

    //adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // verificar se existem itens selecionados, se sim
    // pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item === itemId
        return itemFound
      })

    // se já estiver selecionado,
      if(alreadySelected != -1){
        // tirar da seleção
        const filteredItems = selectedItems.filter(item => {
          const itemIsDifferent = item != itemId //false
          return itemIsDifferent
        })
    selectedItems = filteredItems

} else{
    // se não estiver selecionado
    // adicionar a seleção

    selectedItems.push(itemId)

}
   // atualizar o campo escondido como os items selecionados

   collectedItems.value = selectedItems
} 
