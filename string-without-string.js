// задачка строки без строк 

function solution1(input = []) {
    const alphabet = [];

    // Получаем список пукв
    for (let i = 10; i < 36; i++) {
        alphabet.push(i.toString(36));
    }

    // Добавляем в массив заглавные буквы 
    alphabet.unshift(...alphabet.map(el => el.toUpperCase()));

    // Создаем список цифр
    let tmpNumberList = [];

    for (let i = 0; i < 10; i++) {
        tmpNumberList.push(i + ([] + []));
    }

    alphabet.unshift(...tmpNumberList);

    // Получаем символ "пробела"
    alphabet.push(([] + []).constructor(Object)[8]);

    let result = [] + [];

    input.forEach(el => {
        result += alphabet[el];
    });

    return result;
}

function solution2(input = []) {
    // Создаем строку
    const stringBase = [] + [];

    // Получаем ссылку на функцию создавшую строку
    const stringPrototype = stringBase.constructor;

    // Получаем массив со всеми свойствами объекта
    const objectProperties = Object.getOwnPropertyNames(stringPrototype);

    // Берем из массива нужное нам свойство
    // На этом этапе я возьму свойство "fromCharCode"
    // Но можно придумать и с другими.
    const resultProperty = objectProperties[3];

    // Получаем из строки "fromCharCode" - функцию.
    const functionResult = stringPrototype[resultProperty];

    const solutionValue = functionResult(...input);

    return solutionValue;
}

// const input1 = [17, 40, 47, 47, 50, 62, 34, 36, 12, 56, 51, 62, 2, 0, 2, 2];

// console.log(solution1(input1));

const input2 = [72, 101, 108, 108, 111, 32, 89, 97, 67, 117, 112, 32, 50, 48, 50, 50];

console.log(solution2(input2));