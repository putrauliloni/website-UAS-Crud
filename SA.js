// Simulasi pengguna yang valid
const validUsername = 'tryekaputrauliloni';
const validPassword = '2004';

// Mendapatkan elemen-elemen
const loginContainer = document.getElementById('login-container');
const crudContainer = document.getElementById('crud-container');
const loginForm = document.getElementById('login-form');
const mahasiswaForm = document.getElementById('mahasiswa-form');
const mahasiswaTableBody = document.querySelector('#mahasiswa-table tbody');
const loginError = document.getElementById('login-error');
const jurusanSelect = document.getElementById('jurusan');
const prodiSelect = document.getElementById('prodi');

// Opsi prodi berdasarkan jurusan
const prodiOptions = {
    'Akuntansi': ['A. Sektor Publik', 'Akuntansi'],
    'Pariwisata': ['Perhotelan', 'UPW'],
    'Bisnis': ['Bisnis'],
    'Elektro': ['TKJ', 'Listrik', 'Elektronika'],
    'Sipil': ['Jalan', 'Jembatan', 'Bangunan']
};

// Fungsi untuk mengupdate opsi prodi berdasarkan pilihan jurusan
function updateProdiOptions() {
    const selectedJurusan = jurusanSelect.value;
    const options = prodiOptions[selectedJurusan] || [];
    
    prodiSelect.innerHTML = options.map(option => `<option value="${option}">${option}</option>`).join('');
}

// Login
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
    
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
    
        if (username === validUsername && password === validPassword) {
            window.location.href = 'CRUD.htm';
        } else {
            loginError.style.display = 'block';
        }
    });
}

// CRUD Mahasiswa
if (mahasiswaForm) {
    const mahasiswaData = JSON.parse(localStorage.getItem('mahasiswaData')) || [];
    
    function loadMahasiswa() {
        mahasiswaTableBody.innerHTML = '';
        mahasiswaData.forEach((mahasiswa, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${mahasiswa.name}</td>
                <td>${mahasiswa.nim}</td>
                <td>${mahasiswa.address}</td>
                <td>${mahasiswa.jurusan}</td>
                <td>${mahasiswa.prodi}</td>
                <td class="actions">
                    <button onclick="editMahasiswa(${index})">Edit</button>
                    <button onclick="deleteMahasiswa(${index})">Delete</button>
                </td>
            `;
            mahasiswaTableBody.appendChild(row);
        });
    }
    
    mahasiswaForm.addEventListener('submit', function(event) {
        event.preventDefault();
    
        const name = document.getElementById('name').value;
        const nim = document.getElementById('nim').value;
        const address = document.getElementById('address').value;
        const jurusan = document.getElementById('jurusan').value;
        const prodi = document.getElementById('prodi').value;
        const editIndex = document.getElementById('edit-index').value;
    
        if (editIndex !== '') {
            mahasiswaData[editIndex] = { name, nim, address, jurusan, prodi };
        } else {
            mahasiswaData.push({ name, nim, address, jurusan, prodi });
        }
    
        localStorage.setItem('mahasiswaData', JSON.stringify(mahasiswaData));
        mahasiswaForm.reset();
        document.getElementById('edit-index').value = '';
        loadMahasiswa();
    });
    
    window.editMahasiswa = function(index) {
        const mahasiswa = mahasiswaData[index];
        document.getElementById('name').value = mahasiswa.name;
        document.getElementById('nim').value = mahasiswa.nim;
        document.getElementById('address').value = mahasiswa.address;
        document.getElementById('jurusan').value = mahasiswa.jurusan;
        document.getElementById('prodi').value = mahasiswa.prodi;
        document.getElementById('edit-index').value = index;

        updateProdiOptions();  // Update prodi options based on selected jurusan
    };
    
    window.deleteMahasiswa = function(index) {
        mahasiswaData.splice(index, 1);
        localStorage.setItem('mahasiswaData', JSON.stringify(mahasiswaData));
        loadMahasiswa();
    };
    
    // Update prodi options when jurusan changes
    jurusanSelect.addEventListener('change', updateProdiOptions);
    
    // Load mahasiswa data on page load
    loadMahasiswa();
    
    // Initial call to populate prodi options based on default jurusan
    updateProdiOptions();
}
