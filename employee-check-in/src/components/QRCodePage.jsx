import { useState, useEffect } from 'react';
import QRCode from 'qrcode';

const QRCodePage = () => {
  const [qrCode, setQrCode] = useState('');

  useEffect(() => {
    const generateQRCode = async () => {
      const qrText = `${window.location.origin}/check-in`;
      const qr = await QRCode.toDataURL(qrText);
      setQrCode(qr);
    };

    generateQRCode();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Scan the QR Code</h1>
      {qrCode ? <img src={qrCode} alt="QR Code" /> : <p>Loading QR Code...</p>}
    </div>
  );
};

export default QRCodePage;
