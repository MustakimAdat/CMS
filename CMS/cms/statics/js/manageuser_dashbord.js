
// SEARCH FUNCNALITY

const searchIcon = document.getElementById('searchIcon');
const searchContainer = document.querySelector('.search-container');
const searchInput = document.getElementById('searchInput');
const tableRows = document.querySelectorAll('.order tbody tr');

// Toggle search bar visibility on search icon click
searchIcon.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent click from bubbling to the document
    searchContainer.style.display = 'block';
    searchInput.focus();
});

// Search functionality
searchInput.addEventListener('keyup', function () {
    const filter = searchInput.value.toLowerCase();
    tableRows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        row.style.display = rowText.includes(filter) ? '' : 'none';
    });
});

// Hide search bar when clicking outside
document.addEventListener('click', (event) => {
    if (!searchContainer.contains(event.target) && event.target !== searchIcon) {
        searchContainer.style.display = 'none';
    }
});




// PAGINATION

const rowsPerPage = 12; // Set rows per page
let currentPage = 1;

// Function to display rows based on the current page
function displayRows() {
    const rows = Array.from(document.querySelectorAll('.order tbody tr'));
    const totalRows = rows.length;

    rows.forEach((row, index) => {
        row.style.display = (index >= (currentPage - 1) * rowsPerPage && index < currentPage * rowsPerPage) ? '' : 'none';
    });

    updatePaginationVisibility(totalRows);
    updatePageNumbers(totalRows);
}

// Function to update the pagination display
function updatePaginationVisibility(totalRows) {
    const pagination = document.querySelector('.pagination');
    pagination.style.display = totalRows > rowsPerPage ? 'flex' : 'none';
}

// Function to update page numbers and button states
function updatePageNumbers(totalRows) {
    const pageNumbers = document.querySelector('.page-numbers');
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    pageNumbers.textContent = `< ${currentPage} >`;
    document.querySelector('.prev').disabled = currentPage === 1;
    document.querySelector('.next').disabled = currentPage === totalPages;
}

// Event listeners for pagination buttons
document.querySelector('.prev').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayRows();
    }
});

document.querySelector('.next').addEventListener('click', () => {
    const totalRows = document.querySelectorAll('.order tbody tr').length;
    if (currentPage < Math.ceil(totalRows / rowsPerPage)) {
        currentPage++;
        displayRows();
    }
});

// Initial call to display rows
displayRows();
