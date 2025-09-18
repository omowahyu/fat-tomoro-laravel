#!/bin/bash

# Test upload with proper session and CSRF token

# First, get CSRF token and session
echo "Getting CSRF token..."
RESPONSE=$(curl -c cookies.txt -b cookies.txt -s http://localhost/login)
CSRF_TOKEN=$(echo "$RESPONSE" | grep -o 'name="csrf-token" content="[^"]*"' | sed 's/name="csrf-token" content="//;s/"//')

echo "CSRF Token: $CSRF_TOKEN"

# Login
echo "Logging in..."
curl -c cookies.txt -b cookies.txt -X POST http://localhost/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "X-CSRF-TOKEN: $CSRF_TOKEN" \
  -d "email=test@example.com&password=password&_token=$CSRF_TOKEN"

# Get new CSRF token after login
echo "Getting new CSRF token after login..."
RESPONSE=$(curl -c cookies.txt -b cookies.txt -s http://localhost/purchases/import)
CSRF_TOKEN=$(echo "$RESPONSE" | grep -o 'name="csrf-token" content="[^"]*"' | sed 's/name="csrf-token" content="//;s/"//')

echo "New CSRF Token: $CSRF_TOKEN"

# Upload file
echo "Uploading file..."
curl -c cookies.txt -b cookies.txt -X POST http://localhost/purchases/upload \
  -H "Accept: application/json" \
  -H "X-CSRF-TOKEN: $CSRF_TOKEN" \
  -F "file=@public/simple_sales_order.csv" \
  -F "type=BOH" \
  -v

# Cleanup
rm -f cookies.txt
