const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// خدمة الملفات الثابتة من مجلد 'public'
app.use(express.static(path.join(__dirname, 'public')));

// عرض الصفحة الرئيسية
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// عرض صفحة معلومات الزائر
app.get('/visitor-data', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'visitor-data.html'));
});

// نقطة النهاية لجلب معلومات الزائر
app.get('/visitor-info', async (req, res) => {
    try {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const response = await axios.get(`https://ipinfo.io/${ip}?token=597d93e989f6ec`);
        // لقد قمنا بحذف السطر الذي يحتوي على fs.writeFileSync
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching visitor info' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});




app.use(cors()); // هذا يسمح بطلبات CORS من أي نطاق

// ما تبقى من تعريفات الراوتر والسيرفر
