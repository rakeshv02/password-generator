import React, { useState } from 'react';
export default function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    let chars = '';
    if (useUpper) chars += upper;
    if (useLower) chars += lower;
    if (useNumbers) chars += numbers;
    if (useSymbols) chars += symbols;
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 p-4">
      <div className="max-w-2xl mx-auto py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Password Generator</h1>
        <p className="text-gray-400 mb-8">Generate strong, random passwords instantly. Customize for maximum security.</p>
        
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-300 mb-2">Password Length: {length}</label>
          <input type="range" min="8" max="64" value={length} onChange={(e) => setLength(parseInt(e.target.value))} className="w-full" />
        </div>

        <div className="space-y-3 mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={useUpper} onChange={(e) => setUseUpper(e.target.checked)} />
            <span className="text-gray-300">Uppercase (A-Z)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={useLower} onChange={(e) => setUseLower(e.target.checked)} />
            <span className="text-gray-300">Lowercase (a-z)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} />
            <span className="text-gray-300">Numbers (0-9)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} />
            <span className="text-gray-300">Symbols (!@#$%^&*)</span>
          </label>
        </div>

        {password && (
          <div className="mb-6 p-4 bg-slate-800 border border-slate-700 rounded">
            <p className="text-2xl font-mono text-blue-400 break-all">{password}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button onClick={generatePassword} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded">Generate</button>
          <button onClick={copyToClipboard} disabled={!password} className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-semibold rounded">{copied ? '✓ Copied' : 'Copy'}</button>
        </div>
      </div>
    </div>
  );
}
