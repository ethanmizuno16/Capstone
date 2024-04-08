from flask import Flask, jsonify
from flask_cors import CORS
import numpy as np
import vitaldb

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/api/get_vitals/<int:case_id>', methods=['GET'])
def get_vitals(case_id):
    print(f"Received request for case ID: {case_id}")
    # Load the data for the specified case and track.
    vals = vitaldb.load_case(case_id, ['ECG_II', 'ART'], 1/100)

    # Remove rows with NaN values as they cannot be JSON serialized
    vals_clean = vals[~np.isnan(vals).any(axis=1)]

    # Convert numpy array to list for JSON serialization
    data = {'vitals': vals_clean.tolist()} if len(vals_clean) > 0 else {'vitals': []}

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
