import { useState } from 'react';

function PurchaseMedicine() {
    const [medicineName, setMedicineName] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleMedicineNameChange = (e) => {
        setMedicineName(e.target.value);
    };

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // handle buy medicine (API)
    };

    return (
        <div>
            <h2>Purchase Medicine</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Medicine Name:</label>
                    <input
                        type="text"
                        value={medicineName}
                        onChange={handleMedicineNameChange}
                        required
                    />
                </div>
                <div>
                    <label>Quantity:</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        required
                    />
                </div>
                <button type="submit">Purchase</button>
            </form>
        </div>
    );
}

export default PurchaseMedicine;
