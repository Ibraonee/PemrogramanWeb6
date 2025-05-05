document.addEventListener('DOMContentLoaded', () => {
    const guestForm = document.getElementById('guestForm');
    const guestList = document.getElementById('guestList');
  
    // Ambil data dari localStorage
    let guests = JSON.parse(localStorage.getItem('guests')) || [];
  
    function renderGuests() {
      guestList.innerHTML = '';
      guests.forEach((guest, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>${sanitize(guest.name)}</strong> (${sanitize(guest.status)})<br>
          Pesan: ${sanitize(guest.pesan)}<br>
          <button class="delete" onclick="deleteGuest(${index})">Hapus</button>
        `;
        guestList.appendChild(li);
      });
    }
  
    window.deleteGuest = function(index) {
      guests.splice(index, 1);
      localStorage.setItem('guests', JSON.stringify(guests));
      renderGuests();
    };
  
    guestForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const status = document.getElementById('status').value.trim();
      const pesan = document.getElementById('pesan').value.trim();
  
      if (name && status && pesan) {
        guests.push({ name, status, pesan });
        localStorage.setItem('guests', JSON.stringify(guests));
        renderGuests();
        guestForm.reset();
      } else {
        alert("Semua kolom harus diisi!");
      }
    });
  
    function sanitize(str) {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    }
  
    // Render saat pertama kali
    renderGuests();
  });

  // Fungsi untuk mengambil fakta tentang kucing dari API
fetch('https://catfact.ninja/fact')
.then(response => response.json())
.then(data => {
  const fact = data.fact;
  document.getElementById('cat-fact').textContent = fact; // Menampilkan fakta di elemen dengan id 'cat-fact'
})
.catch(error => {
  console.error('Error:', error);
  document.getElementById('cat-fact').textContent = 'Terjadi kesalahan dalam memuat fakta.';
});

  