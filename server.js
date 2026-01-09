const express = require('express');
const app = express();
const port = 5050;

// Middleware để parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Hàm chuyển đổi shortcode sang ID
function shortcodeToId(shortcode) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  let id = 0n; // Sử dụng BigInt ngay từ đầu
  
  for (let i = 0; i < shortcode.length; i++) {
    const char = shortcode[i];
    const index = alphabet.indexOf(char);
    if (index === -1) {
      throw new Error('Invalid shortcode');
    }
    id = id * 64n + BigInt(index);
  }
  
  return id.toString();
}

// Hàm chuyển đổi ID sang shortcode
function idToShortcode(id) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  let num = BigInt(id);
  let shortcode = '';
  
  while (num > 0) {
    shortcode = alphabet[Number(num % 64n)] + shortcode;
    num = num / 64n;
  }
  
  return shortcode;
}

// Endpoint: shortcode -> ID
app.get('/shortcode-to-id', (req, res) => {
  const { shortcode } = req.query;
  
  if (!shortcode) {
    return res.status(400).json({ 
      error: 'Missing shortcode parameter',
      usage: 'GET /shortcode-to-id?shortcode=YOUR_SHORTCODE'
    });
  }
  
  try {
    const id = shortcodeToId(shortcode);
    res.json({ 
      shortcode: shortcode,
      id: id 
    });
  } catch (error) {
    res.status(400).json({ 
      error: error.message 
    });
  }
});

// Endpoint: ID -> shortcode
app.get('/id-to-shortcode', (req, res) => {
  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({ 
      error: 'Missing id parameter',
      usage: 'GET /id-to-shortcode?id=YOUR_ID'
    });
  }
  
  try {
    const shortcode = idToShortcode(id);
    res.json({ 
      id: id,
      shortcode: shortcode 
    });
  } catch (error) {
    res.status(400).json({ 
      error: error.message 
    });
  }
});

// Endpoint POST (nếu muốn dùng POST)
app.post('/shortcode-to-id', (req, res) => {
  const { shortcode } = req.body;
  
  if (!shortcode) {
    return res.status(400).json({ 
      error: 'Missing shortcode in request body',
      usage: 'POST /shortcode-to-id with body: { "shortcode": "YOUR_SHORTCODE" }'
    });
  }
  
  try {
    const id = shortcodeToId(shortcode);
    res.json({ 
      shortcode: shortcode,
      id: id 
    });
  } catch (error) {
    res.status(400).json({ 
      error: error.message 
    });
  }
});

app.post('/id-to-shortcode', (req, res) => {
  const { id } = req.body;
  
  if (!id) {
    return res.status(400).json({ 
      error: 'Missing id in request body',
      usage: 'POST /id-to-shortcode with body: { "id": "YOUR_ID" }'
    });
  }
  
  try {
    const shortcode = idToShortcode(id);
    res.json({ 
      id: id,
      shortcode: shortcode 
    });
  } catch (error) {
    res.status(400).json({ 
      error: error.message 
    });
  }
});

// Trang chủ - serve HTML UI
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
  console.log(`\n🌐 Mở trình duyệt và truy cập: http://localhost:${port}`);
});

