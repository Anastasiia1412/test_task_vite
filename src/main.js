
import { getDomain, createDeal, getFields } from "./pipedrive";
import { getGetFieldByName, getHkeyValueFromOption } from "./helpers"
let allDealFields = await getFields();


console.log("Program started")

//функция которая собирает Deal из полей формы
function createDealObject() {
    let newDeal = {}
    newDeal['title'] = "some title";
    newDeal['status'] = document.getElementById('job-description').value;
    let selectedJobType = getHkeyValueFromOption(document.getElementById('job-type').value)
    newDeal[selectedJobType.key] = selectedJobType.value
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

    //получим значения кастом филд и установим селектор для Job type
    let jobTypeField = getGetFieldByName("Job type", allDealFields)
    const jobTypeSelector = document.getElementById('job-type');
    for (const [option_key, option_value] of Object.entries(jobTypeField.options)) {
        jobTypeSelector.options.add(new Option(option_value.label, JSON.stringify({ key: jobTypeField.key, value: option_value.id })))
    }

    let jobSourceField = getGetFieldByName("Job source", allDealFields)
    const jobSourceSelector = document.getElementById('job-source');
    for (const [option_key, option_value] of Object.entries(jobSourceField.options)) {
        jobSourceSelector.options.add(new Option(option_value.label, JSON.stringify({ key: jobSourceField.key, value: option_value.id })))
    }


}

buildInputForm()