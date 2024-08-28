const express = require('express');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

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

// نقطة النهاية لجلب معلومات الزائر وتخزينها
app.get('/visitor-info', async (req, res) => {
    try {
        const ip = req.ip;
        const response = await axios.get(`https://ipinfo.io/${ip}?token=597d93e989f6ec`);
        // تخزين المعلومات في ملف (للأغراض التجريبية)
        fs.writeFileSync('visitor-info.json', JSON.stringify(response.data, null, 2));
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching visitor info' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


app.get('/visitor-info', async (req, res) => {
    try {
        const ip = req.ip;
        const response = await axios.get(`https://ipinfo.io/${ip}?token=597d93e989f6ec`);
        console.log(response.data);  // طباعة البيانات في وحدة التحكم للتحقق
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching visitor info' });
    }
});