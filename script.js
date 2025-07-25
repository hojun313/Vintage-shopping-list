const itemList = document.getElementById('item-list');
const newItemInput = document.getElementById('new-item-input');
const addItemButton = document.getElementById('add-item-button');

let items = [];

const renderItems = () => {
    itemList.innerHTML = '';
    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = `item ${item.has ? '' : 'no'}`;
        li.innerHTML = `
            <span>${item.name}</span>
            <button class="toggle-button" data-index="${index}">${item.has ? '있음' : '없음'}</button>
        `;
        itemList.appendChild(li);
    });
};

const addItem = () => {
    const name = newItemInput.value.trim();
    if (name) {
        items.push({ name, has: true });
        newItemInput.value = '';
        renderItems();
        saveItems();
    }
};

const toggleItem = (index) => {
    items[index].has = !items[index].has;
    renderItems();
    saveItems();
};

const saveItems = () => {
    localStorage.setItem('shoppingListItems', JSON.stringify(items));
};

const loadItems = () => {
    const savedItems = localStorage.getItem('shoppingListItems');
    if (savedItems) {
        items = JSON.parse(savedItems);
        renderItems();
    }
};

addItemButton.addEventListener('click', addItem);

itemList.addEventListener('click', (event) => {
    if (event.target.classList.contains('toggle-button')) {
        const index = event.target.dataset.index;
        toggleItem(index);
    }
});

loadItems();
