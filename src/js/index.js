/* Преобразование json файла в объект */
let objData = JSON.parse(data)
/* Создание пустого массива ингридиентов, заполнение его ингридиентами из лбъекта и удаление повторяющихся */
let arrIngridients = [];

for (let i = 0; i < objData.length; i++) {
    let ingridients = objData[i].ingredients
    arrIngridients.push(ingridients)
}
let allIngridients = arrIngridients.flat();
const makeUniq = (arr) => [...new Set(arr)]
let uniqIngridients = makeUniq(allIngridients)
/* Отображение элементов массива ввиде чекбоксов на странице */
let containerIngridients = document.querySelector('.ingridients')
let count = 0
for (let i = 0; i < uniqIngridients.length; i++) {
    let ingridient = document.createElement('div')
    ingridient.className = "ingridients__check"
    containerIngridients.append(ingridient)
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = uniqIngridients[i];
    checkbox.name = uniqIngridients[i];
    checkbox.value = uniqIngridients[i];
    ingridient.append(checkbox)
    let label = document.createElement('label')
    label.htmlFor = uniqIngridients[i];
    label.appendChild(document.createTextNode(uniqIngridients[i]));
    ingridient.append(label)
}
    /* Создание массива, который включает в себя все выбранные ингридиенты в чекбоксах */
    let chosenIngridients=[]
    let form = document.querySelector('.checkForm')
    form.onsubmit = chooseIngridients;
    function chooseIngridients() {
    let array = [...form.querySelectorAll(":checked")],
        chosenIngridient; 
    if (array.length)
        chosenIngridient = array.map(e => e.nextElementSibling.textContent);
    else
        chosenIngridient = "Ингридиенты не выбраны";
    chosenIngridients.push(chosenIngridient)
    showCofee(chosenIngridients, objData)
    count++
    showCofeeCard()
    return false;
    }

    let title
    let description
    let urlImage
    /* Сравнение списка выбранных ингридиентов, с ингридиентами в различных рецептах, и при совпадение, возвращение названия, описания и картинки */
    function showCofee(chosenIngridient, objData) {
        for (let i = 0; i < objData.length; i++) {
            if (JSON.stringify(chosenIngridients[count]) == JSON.stringify(objData[i].ingredients)) {
                title = (objData[i].title)
                description = (objData[i].description)
                urlImage =  (objData[i].image)
                break
            } else {
            title = 'Кофе не найден'
            description = 'Выберите другие ингридиенты'
            urlImage ='https://thumbs.dreamstime.com/b/%D1%87%D0%B0%D1%88%D0%BA%D0%B0-%D0%BA%D0%BE%D1%84%D0%B5-%D1%81-%D0%B2%D0%BE%D0%BF%D1%80%D0%BE%D1%81%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%BC-%D0%B7%D0%BD%D0%B0%D0%BA%D0%BE%D0%BC-%D0%BD%D0%B0-%D0%BF%D0%B5%D0%BD%D0%B5-%D1%8F-%D0%BB%D1%8E%D0%B1%D0%BB%D1%8E-%D0%BF%D0%B5%D1%80%D0%B5%D1%80%D1%8B%D0%B2-%D1%87%D0%B0%D1%88%D0%BA%D1%83-123415136.jpg'
            }
        }
        return title
    }
    /* Отображение карточки получившегося кофе */
    function showCofeeCard() {
        let containerCard = document.querySelector('.cofee')
        containerCard.innerHTML = ''
        let imgCofee = document.createElement('img')
        imgCofee.src=urlImage
        containerCard.append(imgCofee)
        let titleCofee = document.createElement('h1')
        titleCofee.textContent=title
        containerCard.append(titleCofee)
        let descriptionCofee = document.createElement('p')
        descriptionCofee.textContent=description
        containerCard.append(descriptionCofee)
    }


