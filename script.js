document.addEventListener('DOMContentLoaded', () => {
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
                <div>
                    <span>현재:</span>
                    <button class="toggle-button" data-index="${index}">${item.has ? '있음' : '없음'}</button>
                    <button class="delete-button" data-index="${index}">X</button>
                </div>
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

    const deleteItem = (index) => {
        items.splice(index, 1);
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
        } else {
            // 기본 항목 설정
            items = [
                { name: '우유', has: true },
                { name: '계란', has: true },
                { name: '휴지', has: false },
                { name: '샴푸 & 바디워시', has: true },
                { name: '폼클렌징', has: true },
                { name: '키친타올', has: true },
                { name: '주방 세제', has: true },
                { name: '수세미', has: true },
                { name: '쓰레기봉투', has: true },
                { name: '생수', has: true },
                { name: '세탁 세제', has: true },
                { name: '건전지', has: true }
            ];
            saveItems(); // 기본 항목 저장
        }
        renderItems();
    };

    addItemButton.addEventListener('click', addItem);

    itemList.addEventListener('click', (event) => {
        if (event.target.classList.contains('toggle-button')) {
            const index = event.target.dataset.index;
            toggleItem(index);
        } else if (event.target.classList.contains('delete-button')) {
            const index = event.target.dataset.index;
            deleteItem(index);
        }
    });

    // Modal functionality
    const modal = document.getElementById('modal');
    const inspirationLink = document.getElementById('inspiration-link');
    const closeButton = document.querySelector('.close-button');

    inspirationLink.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        modal.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    loadItems();
});
