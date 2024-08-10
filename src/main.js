
import { getDomain, createDeal, getFields, getAllDeals, createPerson } from "./pipedrive";
import { getGetFieldByName, getHkeyValueFromOption } from "./helpers"
import { showModal } from "./modal"
let allDealFields = await getFields();
let alldeals = await getAllDeals();
console.log(alldeals)


console.log("Program started")

function createPersonObject() {
    let newPerson = {};
    newPerson['first_name'] = document.getElementById('first-name').value;
    newPerson['last_name'] = document.getElementById('last-name').value;
    newPerson['phone'] = [{ "value": document.getElementById('phone').value }]
    newPerson['email'] = [{ "value": document.getElementById('email').value }]
    newPerson['name'] = newPerson['first_name'] + newPerson['last_name']
    return newPerson;
}
//функция которая собирает Deal из полей формы
function createDealObject() {
    let newDeal = {}
    newDeal['title'] = "some title";

    let jobDescription = getGetFieldByName("Job description", allDealFields)
    newDeal[jobDescription.key] = document.getElementById('job-description').value;

    //Job Type
    let selectedJobType = getHkeyValueFromOption(document.getElementById('job-type').value)
    newDeal[selectedJobType.key] = selectedJobType.value

    //Job Source
    let selectedJobSource = getHkeyValueFromOption(document.getElementById('job-source').value)
    newDeal[selectedJobSource.key] = selectedJobSource.value

    //scheduler
    let scheduleField = getGetFieldByName("Schedule", allDealFields)
    newDeal[scheduleField.key] = document.getElementById('start-date').value;


    let startTimeField = getGetFieldByName("Job start time", allDealFields)
    newDeal[startTimeField.key] = document.getElementById('start-time').value + ":00";
    newDeal[`${startTimeField.key}_timezone_id`] = 151 //руками устанавливаю

    // let endTimeField = getGetFieldByName("Job end time", allDealFields)
    // newDeal[endTimeField.key] = document.getElementById('end-time').value + ":00"; //добавляю секунды тк формат в секундах
    // newDeal[`${endTimeField.key}_timezone_id`] = 151 //руками устанавливаю


    return newDeal
}

async function createJobClick() {
    console.log("lalla")
    let newPerson = createPersonObject()
    let newDeal = createDealObject()
    console.log(newDeal)
    console.log(newPerson)
    let createdPerson = await createPerson(newPerson)
    if (createPerson != undefined) {
        newDeal['person_id'] = createdPerson.data.id
        let createdDeal = await createDeal(newDeal)
        if (createdDeal != undefined) {
            alert(`Deal created succesfully: id=${createdDeal.data.id}`)
        } else {
            alert(`Deal creation failed`)
        }

    } else {
        alert(`Person creation failed`)
    }


}

function buildInputForm() {

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

    // const buttonSave = document.getElementById('btn_create');
    // buttonSave.addEventListener('submit', createJobClick)
    document.getElementById("mainForm").addEventListener('submit', (e) => {
        e.preventDefault()
        createJobClick()
    })

    // var modal = document.getElementById("myModal");
    // var span = document.getElementsByClassName("close")[0];

    // span.onclick = function () {
    //     modal.style.display = "none";
    // }

    // //скрываем если пользователь кликает мимо
    // window.onclick = function (event) {
    //     if (event.target == modal) {
    //         modal.style.display = "none";
    //     }
    // }






}

buildInputForm()