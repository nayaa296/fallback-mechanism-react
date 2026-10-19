var express = require('express');
var router = express.Router();
const connection = require('../config/database');
const Model_penulis = require('../model/Model_penulis');
const bcrypt = require('bcrypt');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

// Konfigurasi Multer untuk Upload Gambar
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.get('/', async function(req, res, next) {
    let rows = await Model_penulis.getAll();
    res.render('penulis/index', {
        judul: 'Daftar Penulis',
        data: rows
    });
});

router.get('/create', async function(req, res, next) {
    res.render('penulis/create', {
        judul: 'Tambah Penulis'
    });
});

router.post('/store', upload.single('gambar_penulis'), async function(req, res, next) {
    try {
        let { id, nama, email, password } = req.body;
        
        // Autentikasi: Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let Data = {
            id,
            nama,
            email,
            password: hashedPassword,
            gambar_penulis: req.file.filename 
        };

        await Model_penulis.Store(Data);
        req.flash('success', 'Berhasil Menyimpan Data');
        res.redirect('/penulis');
    } catch (error) {
        req.flash('error', 'Terjadi kesalahan');
        res.redirect('/penulis');
    }
});

/* --- EDIT PAGE --- */
router.get('/edit/(:id)', async function(req, res, next) {
    let id = req.params.id;
    let rows = await Model_penulis.getId(id);
    res.render('penulis/edit', {
        id: rows[0].id,
        nama: rows[0].nama,
        email: rows[0].email,
        judul: 'Edit Penulis'
    });
});

// Bagian Update (Tanpa logika hapus file)
router.post('/update/(:id)', async function(req, res, next) {
    try {
        let id = req.params.id;
        let { nama, email, password } = req.body;
        
        let Data = {
            nama: nama,
            email: email
        };

        // Update password hanya jika kolom password diisi
        if (password) {
            const salt = await bcrypt.genSalt(10);
            Data.password = await bcrypt.hash(password, salt);
        }

        await Model_penulis.update(id, Data);
        req.flash('success', 'Berhasil Memperbarui Data');
        res.redirect('/penulis');
    } catch (error) {
        req.flash('error', 'Terjadi kesalahan');
        res.redirect('/penulis');
    }
});

// Bagian Delete (Tanpa logika hapus file)
router.get('/delete/(:id)', async function(req, res) {
    let id = req.params.id;
    await Model_penulis.delete(id);
    req.flash('success', 'Berhasil Menghapus Data');
    res.redirect('/penulis');
});

module.exports = router;