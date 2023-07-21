import './style.css';
import Swal from 'sweetalert2';

const searchButton = document.getElementById('button');
const searchText = document.getElementById('searchText');
let  section = document.getElementById('table');
const tableText = document.getElementById('tableText');
const completeTable = document.getElementById('completeTable');

const getInfo = (coin) => {
    console.log(coin);
    return fetch(`https://api.exchangerate.host/latest?base=${coin}`)
        .then((response)=> response.json());
};

const addTableText = (coinName) => tableText.innerHTML = `Valores referente a 1 ${coinName}`;

const populateSection = (object) => {
    const keyArray = Object.keys(object);
    keyArray.forEach((element) => {
        const newElement = document.createElement('div');
        const newdiv = document.createElement('div');
        const coinIcon = document.createElement('img');
        const coinName = document.createElement('p');
        const coinValue = document.createElement('p');
        coinIcon.src = './src/img/coinIcon.png';
        newdiv.className = 'divIcon';
        newElement.className = 'tableElement';
        coinValue.className = 'coinValue';
        coinName.className = 'coinName';
        coinName.innerHTML = `${element}`;
        coinValue.innerHTML = `${object[element].toFixed(3)}`;
        section.appendChild(newElement);
        newElement.appendChild(newdiv);
        newdiv.appendChild(coinIcon);
        newdiv.appendChild(coinName);
        newElement.appendChild(coinValue);
    });
};

const clearTable = ()=> {
    section.parentNode.removeChild(section);
    section = document.createElement('section');
    section.id = 'table';
    section.style.overflowY = 'scroll';
    completeTable.appendChild(section);
    
};


searchButton.addEventListener('click', ()=> {
    clearTable();
    getInfo(searchText.value)
        .then((response) => {
            const coinArray = Object.keys(response.rates);
            if (coinArray.length != 0 && coinArray.some((item)=> item === searchText.value.toUpperCase())){
                addTableText(searchText.value.toUpperCase());
                populateSection(response.rates);
            }else if (searchText.value.length === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Você precisa passar uma moeda',
                    color:'#dddddd',
                    background: '#191919',
                });
                throw new Error('Nenhuma moeda passada');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Moeda não existente!',
                    color:'#dddddd',
                    background: '#191919',
                });
                throw new Error('Moeda inexistente');}
        });
});

