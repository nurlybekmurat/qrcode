import { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';

const QRCodeGenerator = () => {
  const [qrCode, setQrCode] = useState('');
  const [uniqueKey, setUniqueKey] = useState(Date.now().toString());
  const timerRef = useRef(null);

  const generateQRCode = async (key) => {
    const qrText = `${window.location.origin}/check-in?key=${key}`;
    const qr = await QRCode.toDataURL(qrText);
    setQrCode(qr);
  };

  const updateQRCode = () => {
    const newKey = Date.now().toString();
    setUniqueKey(newKey);
    generateQRCode(newKey);
  };

  useEffect(() => {
    generateQRCode(uniqueKey);
    timerRef.current = setInterval(updateQRCode, 10 * 60 * 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-bold mb-4">Scan the QR Code</h1>
      {qrCode ? (
        <img src={qrCode} alt="QR Code" />
      ) : (
        <p>Loading QR Code...</p>
      )}
    </div>
  );
};

export default QRCodeGenerator;
