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

    // Preset functionality
    const presetMainButton = document.getElementById('preset-main-button');
    const presetOptions = document.getElementById('preset-options');

    const presets = {
        'default': ['우유', '계란', '휴지', '샴푸 & 바디워시', '폼클렌징', '키친타올', '주방 세제', '수세미', '쓰레기봉투', '생수', '세탁 세제', '건전지'],
        'living-alone': ['즉석밥', '라면', '파스타면', '3분 카레', '물티슈', '쓰레기 봉투'],
        'cooking': ['양파', '대파', '마늘', '계란', '우유', '케첩', '마요네즈', '파스타면'],
        'pets': ['사료', '간식', '배변패드/모래', '배변 봉투', '전용 샴푸']
    };

    const applyPreset = (presetName) => {
        const presetItems = presets[presetName];
        if (!presetItems) return;

        items = presetItems.map(name => ({ name, has: false }));
        renderItems();
        saveItems();
        presetOptions.style.display = 'none';
    };

    presetMainButton.addEventListener('click', (event) => {
        event.stopPropagation();
        presetOptions.style.display = presetOptions.style.display === 'block' ? 'none' : 'block';
    });

    presetOptions.addEventListener('click', (event) => {
        if (event.target.classList.contains('preset-option-button')) {
            const presetName = event.target.dataset.preset;
            applyPreset(presetName);
        }
    });

    // Close preset options if clicking outside
    window.addEventListener('click', (event) => {
        if (event.target !== presetMainButton) {
            presetOptions.style.display = 'none';
        }
    });

    loadItems();
});
