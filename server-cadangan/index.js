const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3100;

app.use(cors());

app.get('/apiserverb/kategori', (req, res) => {
    res.json({
        status: true,
        data: [
            { id_kategori: 134, nama_kategori: "Kursi kayu" }, 
            { id_kategori: 135, nama_kategori: "data kategori server b" }
        ]
    });
});

app.listen(PORT, () => {
    console.log(`Server Cadangan (B) berjalan di http://localhost:${PORT}`);
});