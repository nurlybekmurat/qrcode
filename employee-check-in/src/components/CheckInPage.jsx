import { useState, useEffect } from 'react';
import axios from 'axios';

const CheckInPage = () => {
  const [name, setName] = useState('');
  const [isNameSaved, setIsNameSaved] = useState(false);

  // Загружаем имя из localStorage при монтировании
  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setName(storedName);
      setIsNameSaved(true);
    }
  }, []);

  // Обработка сохранения имени
  const handleSaveName = () => {
    if (name.trim()) {
      localStorage.setItem('userName', name.trim());
      setIsNameSaved(true);
    } else {
      alert('Please enter a valid name.');
    }
  };

  // Обработка отправки запроса
  const handleCheckIn = async () => {
    try {
      const response = await axios.post('http://localhost:3001/check-in', { name });
      alert(response.data.message || 'Check-in successful');
    } catch (error) {
      console.error('Error during check-in:', error);
      alert('Failed to check-in.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Check In</h1>
      {!isNameSaved ? (
        <div className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded-md"
          />
          <button
            onClick={handleSaveName}
            className="bg-blue-500 text-white p-2 mt-2 rounded-md hover:bg-blue-600"
          >
            Save Name
          </button>
        </div>
      ) : (
        <button
          onClick={handleCheckIn}
          className="bg-green-500 text-white p-2 mt-2 rounded-md hover:bg-green-600"
        >
          Check In
        </button>
      )}
    </div>
  );
};

export default CheckInPage;
