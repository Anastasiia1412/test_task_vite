
import { getDomain, createDeal, getFields, getAllDeals } from "./pipedrive";
import { getGetFieldByName, getHkeyValueFromOption } from "./helpers"
let allDealFields = await getFields();
let alldeals = await getAllDeals();
console.log(alldeals)


console.log("Program started")

//функция которая собирает Deal из полей формы
function createDealObject() {
    let newDeal = {}
    newDeal['title'] = "some title";
    newDeal['status'] = document.getElementById('job-description').value;
    let selectedJobType = getHkeyValueFromOption(document.getElementById('job-type').value)
    newDeal[selectedJobType.key] = selectedJobType.value

    //scheduler
    let scheduleField = getGetFieldByName("Schedule", allDealFields)
    newDeal[scheduleField.key] = document.getElementById('start-date').value;

    //start-time
    let startTimeField = getGetFieldByName("Job start time", allDealFields)
    newDeal[startTimeField.key] = document.getElementById('start-time').value + ":00";
    newDeal[`${startTimeField.key}_timezone_id`] = 151 //руками устанавливаю

    let endTimeField = getGetFieldByName("Job end time", allDealFields)
    newDeal[endTimeField.key] = document.getElementById('end-time').value + ":00"; //добавляю секунды тк формат в секундах
    newDeal[`${endTimeField.key}_timezone_id`] = 151 //руками устанавливаю


    return newDeal
}

async function createJobClick() {
    console.log("lalla")
    let newDeal = createDealObject()
    console.log(newDeal)
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