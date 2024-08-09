
import { getDomain, createDeal, getFields } from "./pipedrive";
import { getGetFieldByName } from "./helpers"
let allDealFields = await getFields();
let custom_hkey = getGetFieldByName("Job type", allDealFields)
console.log(custom_hkey)

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