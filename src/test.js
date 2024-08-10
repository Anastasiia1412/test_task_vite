import { ApiClient, PersonsApi, NewDeal, UsersApi, DealFieldsApi, DealsApi, NewPerson } from 'pipedrive';

let deal = {
    "fdfdf": 123,
    "fdfdf_key_2": 222
}
let opts = NewDeal.constructFromObject(deal);
console.log(opts)