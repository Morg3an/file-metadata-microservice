var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


{/* Project solution starts here */}
// Define multer upload middleware
const upload = multer({ dest: 'uploads/' });

// Serve static files from the 'public' directory (optional)
app.use(express.static('public'));

// Route to handle file upload
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // Extract file metadata
    const { originalname, mimetype, size } = req.file;

    // Send JSON response with file metadata
    res.json({
        name: originalname,
        type: mimetype,
        size: size
    });
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
