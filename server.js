require('dotenv').config();
const express = require('express');
const { google } = require('googleapis');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Google Drive API yapılandırması
const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});

const drive = google.drive({ version: 'v3', auth });

// Statik dosyaları serve et
app.use(express.static('public'));

// Sertifikaları getiren endpoint
app.get('/api/certificates', async (req, res) => {
    try {
        const folderId = '1wOA2Zp5Z77RPGl3etbWOzHkw-95a2tn6';
        const response = await drive.files.list({
            q: `'${folderId}' in parents and mimeType='application/pdf'`,
            fields: 'files(id, name)',
        });

        const certificates = response.data.files.map(file => ({
            id: file.id,
            name: file.name.replace(/_/g, ' ').replace('.pdf', ''),
            url: `https://drive.google.com/file/d/${file.id}/view`
        }));

        res.json(certificates);
    } catch (error) {
        console.error('Error fetching certificates:', error);
        res.status(500).json({ error: 'Sertifikalar alınırken bir hata oluştu' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 