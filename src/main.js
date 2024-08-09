
import { getDomain, createDeal } from "./pipedrive";

console.log("Program started")

//функция которая собирает Deal из полей формы
function createDealObject() {
    let newDeal = {}
    newDeal['title'] = "some title";
    newDeal['status'] = document.getElementById('job-description').value;
    return newDeal
}

async function createJobClick() {
    console.log("lalla")
    let newDeal = createDealObject()
    await createDeal(newDeal)
}

function buildInputForm() {
    const buttonSave = document.getElementById('btn_create');
    buttonSave.addEventListener('click', createJobClick)

}

buildInputForm()