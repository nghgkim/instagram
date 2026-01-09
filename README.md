# Instagram Shortcode <-> ID Converter

Server đơn giản để chuyển đổi giữa Instagram shortcode và ID.

## Cài đặt

```bash
npm install
```

## Chạy server

```bash
npm start
```

Server sẽ chạy tại `http://localhost:3000`

## Sử dụng

### 1. Chuyển shortcode sang ID (GET)

```
GET http://localhost:3000/shortcode-to-id?shortcode=BXjZJQhBpW1
```

Response:
```json
{
  "shortcode": "BXjZJQhBpW1",
  "id": "1234567890123456789"
}
```

### 2. Chuyển ID sang shortcode (GET)

```
GET http://localhost:3000/id-to-shortcode?id=1234567890123456789
```

Response:
```json
{
  "id": "1234567890123456789",
  "shortcode": "BXjZJQhBpW1"
}
```

### 3. Chuyển shortcode sang ID (POST)

```
POST http://localhost:3000/shortcode-to-id
Content-Type: application/json

{
  "shortcode": "BXjZJQhBpW1"
}
```

### 4. Chuyển ID sang shortcode (POST)

```
POST http://localhost:3000/id-to-shortcode
Content-Type: application/json

{
  "id": "1234567890123456789"
}
```

## Ví dụ với curl

```bash
# Shortcode -> ID
curl "http://localhost:3000/shortcode-to-id?shortcode=BXjZJQhBpW1"

# ID -> Shortcode
curl "http://localhost:3000/id-to-shortcode?id=1234567890123456789"

# POST request
curl -X POST http://localhost:3000/shortcode-to-id \
  -H "Content-Type: application/json" \
  -d '{"shortcode":"BXjZJQhBpW1"}'
```

