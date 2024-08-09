import { ApiClient, NewDeal, UsersApi, DealFieldsApi, DealsApi } from 'pipedrive';

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

    let opts = NewDeal.constructFromObject(deal);
    console.log("runnin the api")
    console.log(opts);
    await apiInstance.addDeal(deal).then(
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

//получаем список всех полей которые существуют у Deal
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




// // Создание нового объекта сделки (Deal)
// let opts = Pipedrive.NewDeal.constructFromObject({
//     title: "Bob",
// });


// async function addNewDeal() {
//     try {
//         // Добавление сделки через API
//         let res = await apiInstance.addDeal(opts);
//         console.log('API called successfully. Returned data:', res);
//     } catch (error) {
//         console.error('Error while adding deal:', error);
//     }
// }

// addNewDeal();

// // let res = await apiInstance.addDeal(opts);
// // console.log(res);
// // apiInstance.addDeal(opts).then((data) => {
// //     console.log('API called successfully. Returned data: ' + data);
// // }, (error) => {
// //     console.error(error);
// // });

// // async function addNewDeal() {
// //     try {
// //         console.log("Attempting to add a new deal...");
// //         let res = await apiInstance.addDeal(opts);
// //         console.log("Deal added successfully:", res);
// //     } catch (error) {
// //         console.error("Error occurred during addDeal:", error);
// //     }
// // }




// // async function addNewDeal() {
// //     let apiClient = new Pipedrive.ApiClient();
// //     let api_key = apiClient.authentications['api_key'];
// //     api_key.apiKey = '22674c5639c7c3f5a758d7d659c9536a5189511c';
// //     let apiInstance = new Pipedrive.DealsApi(apiClient);
// //     let opts = Pipedrive.NewDeal.constructFromObject({
// //         title: "Bob",
// //         job_comment: "commenct"

// //     });

// //     apiInstance.addDeal(opts).then((data) => {
// //         console.log('API called successfully. Returned data: ' + data);
// //     }, (error) => {
// //         console.error(error);
// //     });
// // }
// // addNewDeal();