document.addEventListener("DOMContentLoaded", function () {
    const stats = [
      { title: 'Total Universities', value: '100', color: 'border-danger' },
      { title: 'Students', value: '1200', color: 'border-primary' },
      { title: 'Mentors', value: '48', color: 'border-info' },
      { title: 'Programs', value: '50', color: 'border-warning' },
      { title: 'Courses', value: '300', color: 'border-danger' },
    ];

    const statsContainer = document.getElementById("stats");

    // <div class="col-lg-2 col-md-3 col-sm-5">
    stats.forEach((stat) => {
      const statCard = `
          <div class="col-lg box m-2">
          <div class="card ${stat.color} border-top">
            <div class="card-body">
              <h6 class="card-title">${stat.title}</h6>
              <p class="card-text ">${stat.value}</p>
            </div>
          </div>
        </div>`;
      statsContainer.innerHTML += statCard;
    });
  });




  //Search functionality
  // Load data from data.json
  // fetch('data.json')
  //   .then(response => response.json())
  //   .then(data => {
  //     universities = data;
  //     displayTable(universities);
  //   });
  // Example data for testing
  let universities = [];
  let currentPage = 1;
  const itemsPerPage = 4;

  // Example data for testing
  universities = [
    { sNo: '01', universityName: 'Harvard University', programsOffered: '15', students: '200', mentors: '20' },
    { sNo: '02', universityName: 'Stanford University', programsOffered: '10', students: '150', mentors: '15' },
    { sNo: '03', universityName: 'MIT', programsOffered: '12', students: '180', mentors: '18' },
    { sNo: '04', universityName: 'University of California', programsOffered: '20', students: '250', mentors: '25' },
    { sNo: '05', universityName: 'University of Oxford', programsOffered: '18', students: '230', mentors: '23' },
    { sNo: '06', universityName: 'Cambridge University', programsOffered: '16', students: '210', mentors: '21' },
    { sNo: '07', universityName: 'University of Tokyo', programsOffered: '14', students: '190', mentors: '19' },
    { sNo: '08', universityName: 'ETH Zurich', programsOffered: '13', students: '170', mentors: '17' },
    { sNo: '09', universityName: 'University of Germany', programsOffered: '15', students: '200', mentors: '20' },
    { sNo: '10', universityName: 'University College London', programsOffered: '17', students: '220', mentors: '22' },
    // Add more entries as needed
  ];

  function displayTable(data) {
    const tableBody = document.getElementById('universitiesTable');
    tableBody.innerHTML = ''; // Clear previous table rows

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = data.slice(start, end);

    paginatedItems.forEach((university) => {
      const row = `
        <tr>
          <td class="py-4">${university.sNo}</td>
          <td class="py-4 text-primary">${university.universityName}</td>
          <td class="py-4">${university.programsOffered}</td>
          <td class="py-4">${university.students}</td>
          <td class="py-4">${university.mentors}</td>
        </tr>
      `;
      tableBody.insertAdjacentHTML('beforeend', row);
    });

    // Show "Nothing found" message if no data
    document.getElementById('noResultsMessage').style.display = data.length === 0 ? 'block' : 'none';
  }

  function setupPagination(data) {
    const pageCount = Math.ceil(data.length / itemsPerPage);
    const paginationNumbers = document.getElementById('paginationNumbers');
    paginationNumbers.innerHTML = ''; // Clear previous pagination

    for (let i = 1; i <= pageCount; i++) {
      const pageItem = document.createElement('span');
      pageItem.classList.add(i === currentPage ? 'page-active' : 'page-inactive');
      pageItem.innerText = i;
      pageItem.onclick = () => goToPage(i);
      paginationNumbers.appendChild(pageItem);
    }
  }

  function goToPage(pageNumber) {
    currentPage = pageNumber;
    displayTable(universities);
    setupPagination(universities);
    document.getElementById('currentPage').innerText = currentPage;
  }
  // Function to go to the next page
  function nextPage() {
    const pageCount = Math.ceil(universities.length / itemsPerPage);
    if (currentPage < pageCount) {
      currentPage++;
      displayTable(universities);
      setupPagination(universities);
      document.getElementById('currentPage').innerText = currentPage;
    }
  }

  // Function to go to the previous page
  function previousPage() {
    if (currentPage > 1) {
      currentPage--;
      displayTable(universities);
      setupPagination(universities);
      document.getElementById('currentPage').innerText = currentPage;
    }
  }

  function filterTable() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filteredData = universities.filter(university =>
      university.universityName.toLowerCase().includes(query)
    );

    // console.log("filtered data=",filteredData);
    if (query === '') {
      // Show all data if search input is empty
      displayTable(universities);
    } else if (filteredData.length > 0) {
      currentPage = 1;
      displayTable(filteredData);
    } else {
      displayTable([]);
      document.getElementById('noResultsMessage').style.display='block';
    }
  }

  function searchUniversities() {
    filterTable();
  }

  // Initial display
  displayTable(universities);
  setupPagination(universities);