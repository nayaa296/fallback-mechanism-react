CARA MENGGUNAKAN:

1. Buka file index.html di browser (double-click)
2. Login sudah terisi otomatis: kucing@gmail.com / 1
3. Klik "Masuk"

STRUKTUR API:
- Login      : POST /api/login     => {email, password} => {token}
- Get        : GET  /api/poktan     => Header: Bearer token
- Create     : POST /api/poktan/store => Header: Bearer token
- Update     : PUT  /api/poktan/{id}  => Header: Bearer token
- Delete     : DELETE /api/poktan/{id} => Header: Bearer token

Jika ada error CORS (akses ditolak browser):
Gunakan ekstensi browser:
- Chrome: "Moesif CORS" atau "Allow CORS"
- Atau buka dengan disabled security:
  chrome.exe --disable-web-security --user-data-dir="C:/temp/chrome_dev"

Atau gunakan file proxy.html (buka proxy.html, lalu klik tombol).
