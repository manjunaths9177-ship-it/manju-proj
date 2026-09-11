import os
import json
import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

DB_PATH = os.path.join(os.path.dirname(__file__), 'sln_properties.db')

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()

    # Create Properties Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS properties (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            locality TEXT NOT NULL,
            city TEXT NOT NULL,
            price REAL NOT NULL,
            price_display TEXT NOT NULL,
            type TEXT NOT NULL,
            purpose TEXT NOT NULL,
            bhk INTEGER DEFAULT 0,
            baths INTEGER DEFAULT 0,
            area_sqft INTEGER DEFAULT 0,
            facing TEXT,
            possession TEXT,
            verified INTEGER DEFAULT 1,
            featured INTEGER DEFAULT 0,
            image TEXT NOT NULL,
            gallery TEXT,
            description TEXT,
            amenities TEXT,
            agent_name TEXT DEFAULT 'Manjunath S',
            agent_phone TEXT DEFAULT '9742568746',
            agent_email TEXT DEFAULT 'manjunaths9177@gmail.com',
            created_at TEXT
        )
    ''')

    # Create Inquiries Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS inquiries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            property_id TEXT,
            name TEXT NOT NULL,
            phone TEXT NOT NULL,
            email TEXT,
            locality TEXT,
            message TEXT,
            created_at TEXT
        )
    ''')

    conn.commit()

    # Seed default properties if DB is empty
    cursor.execute('SELECT COUNT(*) FROM properties')
    count = cursor.fetchone()[0]

    if count == 0:
        seed_data = [
            (
                'sln-prop-1',
                'SLN Luxury 3 BHK Smart Apartment',
                'Indiranagar',
                'Bengaluru',
                18500000,
                '₹ 1.85 Cr',
                'Apartment',
                'Buy',
                3, 3, 1850,
                'East (Vastu Compliant)',
                'Ready to Move',
                1, 1,
                'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
                json.dumps([
                    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
                    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
                ]),
                'Ultra-modern 3 BHK luxury residence located in prime Indiranagar, Bengaluru. Close to 100ft Road dining hubs and Metro station.',
                json.dumps(['Clubhouse', 'Swimming Pool', 'Gymnasium', '24/7 Security', 'Power Backup', 'EV Charging Point']),
                'Manjunath S', '9742568746', 'manjunaths9177@gmail.com',
                '2026-09-01'
            ),
            (
                'sln-prop-2',
                'SLN Emerald 4 BHK Gated Villa',
                'Whitefield',
                'Bengaluru',
                34000000,
                '₹ 3.40 Cr',
                'Villa',
                'Buy',
                4, 4, 3200,
                'North',
                'Ready to Move',
                1, 1,
                'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80',
                json.dumps([
                    'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80',
                    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80'
                ]),
                'Exclusive 4 BHK independent duplex villa inside a premium gated community in Whitefield. Features private landscaped garden and solar power.',
                json.dumps(['Private Garden', 'Clubhouse', 'Swimming Pool', 'Tennis Court', 'Children Play Area', 'CCTV Surveillance']),
                'Manjunath S', '9742568746', 'manjunaths9177@gmail.com',
                '2026-09-03'
            ),
            (
                'sln-prop-3',
                'SLN Royal 2 BHK Premium Flat',
                'Koramangala',
                'Bengaluru',
                9800000,
                '₹ 98 Lakhs',
                'Apartment',
                'Buy',
                2, 2, 1250,
                'East',
                'Ready to Move',
                1, 0,
                'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80',
                json.dumps(['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80']),
                'Charming 2 BHK ready apartment in 4th Block Koramangala. Excellent connectivity to Tech Parks, Forum Mall, and major hospitals.',
                json.dumps(['Lift', '24/7 Security', 'Power Backup', 'Water Supply (Cauvery)', 'Reserved Parking']),
                'Manjunath S', '9742568746', 'manjunaths9177@gmail.com',
                '2026-09-05'
            ),
            (
                'sln-prop-4',
                'SLN Green Enclave Residential Plot',
                'Yelahanka',
                'Bengaluru',
                6500000,
                '₹ 65 Lakhs',
                'Plot',
                'Buy',
                0, 0, 1500,
                'North-East',
                'Immediate Registration',
                1, 1,
                'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
                json.dumps(['https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80']),
                'BDA approved 30x50 ft residential plot in Yelahanka New Town. Clear title, gated layout with asphalt roads and underground sewage.',
                json.dumps(['Gated Layout', 'A-Katha Title', 'Underground Sewage', 'Street Lighting', 'Wide 40ft Roads']),
                'Manjunath S', '9742568746', 'manjunaths9177@gmail.com',
                '2026-09-06'
            ),
            (
                'sln-prop-5',
                'SLN Heights 3 BHK Fully Furnished Flat',
                'HSR Layout',
                'Bengaluru',
                45000,
                '₹ 45,000 / mo',
                'Apartment',
                'Rent',
                3, 3, 1650,
                'East',
                'Immediate Occupancy',
                1, 0,
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80',
                json.dumps(['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80']),
                'Spacious fully furnished 3 BHK apartment in HSR Sector 2 available for family or IT executives. Complete with ACs and modular kitchen.',
                json.dumps(['Fully Furnished', 'Covered Parking', 'Lift', '24/7 Security', 'Washing Machine', 'WiFi Ready']),
                'Manjunath S', '9742568746', 'manjunaths9177@gmail.com',
                '2026-09-08'
            ),
            (
                'sln-prop-6',
                'SLN Commercial Tech Park Space',
                'Electronic City',
                'Bengaluru',
                21000000,
                '₹ 2.10 Cr',
                'Commercial',
                'Buy',
                0, 2, 2800,
                'East',
                'Ready to Move',
                1, 0,
                'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
                json.dumps(['https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80']),
                'Premium Grade-A commercial office unit in Electronic City Phase 1. Pre-leased option available with steady 8.5% annual ROI.',
                json.dumps(['100% DG Power Backup', 'Central AC', 'High Speed Lifts', 'Basement Parking', 'Fire Safety Certified']),
                'Manjunath S', '9742568746', 'manjunaths9177@gmail.com',
                '2026-09-09'
            ),
            (
                'sln-prop-7',
                'SLN Skyline Luxury Penthouse',
                'Hebbal',
                'Bengaluru',
                42000000,
                '₹ 4.20 Cr',
                'Penthouse',
                'Buy',
                4, 5, 4500,
                'North-East',
                'Ready to Move',
                1, 1,
                'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
                json.dumps(['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80']),
                'Breathtaking 4 BHK luxury penthouse overlooking Hebbal Lake. Features private terrace jacuzzi and panoramic glass walls.',
                json.dumps(['Private Terrace', 'Jacuzzi', 'Infinity Pool', 'Concierge Service', 'Private Elevator', 'Smart Home System']),
                'Manjunath S', '9742568746', 'manjunaths9177@gmail.com',
                '2026-09-10'
            )
        ]

        cursor.executemany('''
            INSERT INTO properties (
                id, title, locality, city, price, price_display, type, purpose,
                bhk, baths, area_sqft, facing, possession, verified, featured,
                image, gallery, description, amenities, agent_name, agent_phone, agent_email, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', seed_data)

        conn.commit()

    conn.close()

# Initialize DB on start
init_db()

def format_row(row):
    d = dict(row)
    d['verified'] = bool(d.get('verified'))
    d['featured'] = bool(d.get('featured'))
    
    if d.get('gallery'):
        try:
            d['gallery'] = json.loads(d['gallery'])
        except Exception:
            d['gallery'] = [d['image']]
    else:
        d['gallery'] = [d['image']]

    if d.get('amenities'):
        try:
            d['amenities'] = json.loads(d['amenities'])
        except Exception:
            d['amenities'] = []
    else:
        d['amenities'] = []

    # Rename keys to match React camelCase expectations
    return {
        'id': d['id'],
        'title': d['title'],
        'locality': d['locality'],
        'city': d['city'],
        'price': d['price'],
        'priceDisplay': d['price_display'],
        'type': d['type'],
        'purpose': d['purpose'],
        'bhk': d['bhk'],
        'baths': d['baths'],
        'areaSqft': d['area_sqft'],
        'facing': d['facing'],
        'possession': d['possession'],
        'verified': d['verified'],
        'featured': d['featured'],
        'image': d['image'],
        'gallery': d['gallery'],
        'description': d['description'],
        'amenities': d['amenities'],
        'agentName': d['agent_name'],
        'agentPhone': d['agent_phone'],
        'agentEmail': d['agent_email'],
        'createdAt': d['created_at']
    }

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'app': 'SLN Properties Python API', 'timestamp': datetime.now().isoformat()})

@app.route('/api/properties', methods=['GET'])
def get_properties():
    locality = request.args.get('locality', 'All Bengaluru')
    prop_type = request.args.get('type', 'All Types')
    purpose = request.args.get('purpose', 'All')
    max_price = request.args.get('max_price', 'ALL')
    keyword = request.args.get('search', '').lower().strip()

    conn = get_db()
    cursor = conn.cursor()

    query = "SELECT * FROM properties WHERE 1=1"
    params = []

    if locality and locality != 'All Bengaluru':
        query += " AND locality = ?"
        params.append(locality)

    if prop_type and prop_type != 'All Types':
        query += " AND type = ?"
        params.append(prop_type)

    if purpose and purpose != 'All':
        query += " AND purpose = ?"
        params.append(purpose)

    if max_price and max_price != 'ALL':
        try:
            val = float(max_price)
            query += " AND price <= ?"
            params.append(val)
        except ValueError:
            pass

    query += " ORDER BY created_at DESC"
    cursor.execute(query, params)
    rows = cursor.fetchall()
    conn.close()

    results = [format_row(row) for row in rows]

    if keyword:
        results = [
            p for p in results if (
                keyword in p['title'].lower() or
                keyword in p['locality'].lower() or
                keyword in p['description'].lower() or
                f"{p['bhk']} bhk" in keyword
            )
        ]

    return jsonify(results)

@app.route('/api/properties/<prop_id>', methods=['GET'])
def get_property_by_id(prop_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM properties WHERE id = ?", (prop_id,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        return jsonify({'error': 'Property not found'}), 404

    return jsonify(format_row(row))

@app.route('/api/properties', methods=['POST'])
def add_property():
    data = request.json or {}

    prop_id = data.get('id') or f"sln-py-{int(datetime.now().timestamp())}"
    title = data.get('title', 'SLN Property')
    locality = data.get('locality', 'Indiranagar')
    city = data.get('city', 'Bengaluru')
    price = float(data.get('price', 10000000))
    price_display = data.get('priceDisplay') or f"₹ {price:,.0f}"
    prop_type = data.get('type', 'Apartment')
    purpose = data.get('purpose', 'Buy')
    bhk = int(data.get('bhk', 3))
    baths = int(data.get('baths', 2))
    area_sqft = int(data.get('areaSqft', 1500))
    facing = data.get('facing', 'East')
    possession = data.get('possession', 'Ready to Move')
    verified = 1 if data.get('verified', True) else 0
    featured = 1 if data.get('featured', True) else 0
    image = data.get('image') or 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80'
    gallery = json.dumps(data.get('gallery') or [image])
    description = data.get('description', 'Newly listed property in Bengaluru.')
    amenities = json.dumps(data.get('amenities') or ['Security', 'Lift', 'Parking'])
    agent_name = data.get('agentName', 'Manjunath S')
    agent_phone = data.get('agentPhone', '9742568746')
    agent_email = data.get('agentEmail', 'manjunaths9177@gmail.com')
    created_at = datetime.now().strftime('%Y-%m-%d')

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO properties (
            id, title, locality, city, price, price_display, type, purpose,
            bhk, baths, area_sqft, facing, possession, verified, featured,
            image, gallery, description, amenities, agent_name, agent_phone, agent_email, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        prop_id, title, locality, city, price, price_display, prop_type, purpose,
        bhk, baths, area_sqft, facing, possession, verified, featured,
        image, gallery, description, amenities, agent_name, agent_phone, agent_email, created_at
    ))
    conn.commit()
    conn.close()

    return jsonify({'success': True, 'id': prop_id, 'message': 'Property saved in SQLite database'}), 201

@app.route('/api/inquiries', methods=['POST'])
def add_inquiry():
    data = request.json or {}
    name = data.get('name', 'Anonymous')
    phone = data.get('phone', '')
    email = data.get('email', '')
    locality = data.get('locality', '')
    message = data.get('message', '')
    property_id = data.get('propertyId', '')
    created_at = datetime.now().isoformat()

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO inquiries (property_id, name, phone, email, locality, message, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (property_id, name, phone, email, locality, message, created_at))
    conn.commit()
    inquiry_id = cursor.lastrowid
    conn.close()

    return jsonify({'success': True, 'inquiry_id': inquiry_id, 'message': 'Inquiry saved in SQLite'}), 201

@app.route('/api/inquiries', methods=['GET'])
def get_inquiries():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM inquiries ORDER BY id DESC")
    rows = cursor.fetchall()
    conn.close()
    return jsonify([dict(row) for row in rows])

if __name__ == '__main__':
    print("SLN Properties Python Server running at http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)
