//функции помощники для работы с объектами
//получая информацию из Pipdrive надо уметь найти hkey созданного поля. Будем делать это через поиск по имени

export function getGetFieldByName(name, dealFields) {
    let tmp;
    for (let index = 0; index < dealFields.length; index++) {
        const element = dealFields[index];
        if (element.name == name) {
            tmp = element;
            break;
        }
    }
    return tmp;
}

export function getHkeyValueFromOption(selector_option) {
    try {
        let tmp = JSON.parse(selector_option)
        return tmp

    } catch (error) {
        console.error("Не могу распарить опцию")
    }
}