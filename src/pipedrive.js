import { ApiClient, PersonsApi, NewDeal, UsersApi, DealFieldsApi, DealsApi, NewPerson } from 'pipedrive';

// Инициализация API клиента
let apiClient = new ApiClient();
// Настройка API ключа
let api_key = apiClient.authentications['api_key'];
api_key.apiKey = import.meta.env.VITE_PIPEDRIVE_API_KEY; //мой Personal preferences ---> Your personal API token



export async function getDomain() {
    let domain
    let apiInstance = new UsersApi(apiClient);
    await apiInstance.getCurrentUser().then((data) => {
        console.log(data);
        domain = data.data.company_domain
    }, (error) => {
        console.error(error);
    });

    return domain
}

//создаем deal в Pipedrive
export async function createDeal(deal) {
    let res
    let apiInstance = new DealsApi(apiClient);

    console.log("INPUT DEAL")
    console.log(deal)
    let opts = NewDeal.constructFromObject(deal);
    console.log("OUTPUT DEAL")
    console.log(opts)
    await apiInstance.addDeal(opts).then(
        (data) => {
            console.log(data);
            res = data;
        },
        (error) => {
            console.error(error);
        }
    );
    console.log(res)
    return res
}

//получаем список всех полей которые существуют у Deal (https://github.com/pipedrive/client-nodejs/blob/master/docs/DealFieldsApi.md#getDealFields)
export async function getFields() {
    let dealFields
    let apiInstance = new DealFieldsApi(apiClient);
    //хз зачем
    let opts = {
        start: 0, // Number | Pagination start
        limit: 1000, // Number | Items shown per page
    };

    await apiInstance.getDealFields(opts).then(
        (data) => {
            console.log(data);
            dealFields = data.data;
        },
        (error) => {
            console.error(error);
        }
    );
    return dealFields
}

export async function getAllDeals() {
    let apiInstance = new DealsApi(apiClient);

    await apiInstance.getDeals().then(
        (data) => {
            console.log(data);
        },
        (error) => {
            console.error(error);
        }
    );
}

export async function createPerson(person) {
    let res
    let apiInstance = new PersonsApi(apiClient);
    let opts = NewPerson.constructFromObject(person);
    await apiInstance.addPerson(opts).then(
        (data) => {
            console.log(data);
            res = data
        },
        (error) => {
            console.error(error);
        }
    );

    return res
}
