from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)

DB_PATH = os.path.join(os.path.dirname(__file__), 'settings.db')

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS settings (
            key TEXT PRIMARY KEY,
            value TEXT
        )
    ''')
    # Default URL if not exists
    cursor.execute('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)', 
                  ('embed_url', 'https://web-tra.pages.dev/'))
    conn.commit()
    conn.close()

@app.route('/api/get-url', methods=['GET'])
def get_url():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('SELECT value FROM settings WHERE key = ?', ('embed_url',))
    row = cursor.fetchone()
    conn.close()
    if row:
        return jsonify({'url': row[0]})
    return jsonify({'url': 'https://web-tra.pages.dev/'})

@app.route('/api/save-url', methods=['POST'])
def save_url():
    data = request.json
    new_url = data.get('url')
    if not new_url:
        return jsonify({'error': 'URL is required'}), 400
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('REPLACE INTO settings (key, value) VALUES (?, ?)', ('embed_url', new_url))
    conn.commit()
    conn.close()
    return jsonify({'message': 'URL saved successfully', 'url': new_url})

if __name__ == '__main__':
    init_db()
    app.run(port=5000, debug=True)
