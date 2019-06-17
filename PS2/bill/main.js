// Parameters for filling the table!
const GOODS = [
    {
        category: 'furniture',
        name: 'Chair',
        amount: 1,
        price: 20
    },
    {
        category: 'supplies',
        name: 'Gel Pen',
        amount: 20,
        price: 2
    },
    {
        category: 'other',
        name: 'Trash Bin',
        amount: 1,
        price: 5
    },
    {
        category: 'furniture',
        name: 'Sofa',
        amount: 1,
        price: 50
    },
    {
        category: 'supplies',
        name: 'Notebook',
        amount: 3,
        price: 3
    },
    {
        category: 'other',
        name: 'Calendar 2019',
        amount: 1,
        price: 3
    }
];

// Flags for displaying a table.
let sortByCategoryFlag = true;
let sortByNameFlag = true;
let compareBy = "";
let filterType = "";

// Parameter to search by column name
let regex = new RegExp("");

// After loading the page display the table.
window.onload = () => displayTable();

/**
 * Display the table in accordance with the flags.
 */
const body = document.getElementById("tableBody");
displayTable = () => {
    clearChild(body);
    let total = 0;
    for (let i = 0; i < GOODS.length; i++) {
        if ((!filterType || filterType === GOODS[i].category) && regex.test(GOODS[i].name.toLowerCase())) {
            let tr = document.createElement("tr");
            let row = GOODS[i];
            let rowResult = "";
            for (let key in row) {
                rowResult += `<td>${row[key]}</td>`;
            }
            tr.innerHTML = rowResult;
            body.appendChild(tr);
            total += GOODS[i].price * GOODS[i].amount;
        }
    }
    const result = document.getElementById("totalResult");
    result.innerText = `${total}$`;
};
// Sort button by category.
const sortByCategory = document.getElementById("sortByCategory");
/**
 * We remove the sort flag by name. Add a sorting flag by category. Display the table again.
 */
sortByCategory.addEventListener('click', () => {
    compareBy = "category";
    GOODS.sort(compare);
    sortByCategoryFlag = !sortByCategoryFlag;
    if(sortByCategoryFlag){
        GOODS.reverse();
    }
    displayTable();
});

// Compare two items.
compare = (firstElement, secondElement) => {
    return  firstElement[compareBy] < secondElement[compareBy] ? -1 : firstElement[compareBy] > secondElement[compareBy] ? 1 : 0;
};

// Sort button by name.
const sortByName = document.getElementById("sortByName");
/**
 * Add a sort flag by name. We remove the sorting flag by category.
 */
sortByName.addEventListener('click', () => {
    compareBy = "name";
    GOODS.sort(compare);
    sortByNameFlag = !sortByNameFlag;
    if(sortByNameFlag){
        GOODS.reverse();
    }
    displayTable();
});

/**
 * Remove all child elements.
 * @param parent Parent element.
 */
clearChild = (parent) => {
    parent.innerHTML = '';
};

// Filter selection field.
const select = document.getElementById("selectFilter");
/**
 * If a filter is selected, changes the filter.
 * Prints a new table.
 */
select.onchange = () => {
    let option = select.querySelectorAll('option')[select.selectedIndex];
    filterType = option.getAttribute('value');
    displayTable();
};
// A field to enter a search query.
const search = document.getElementById('search');
/**
 * Changes the search flag. Displays a table.
 */
search.addEventListener("input", () => {
    regex = new RegExp(search.value.toLowerCase());
    displayTable();
});