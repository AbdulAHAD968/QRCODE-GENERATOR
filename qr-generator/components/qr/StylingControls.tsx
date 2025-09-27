import React from 'react';
import { QRStyling } from '../../types';
import {
  FaPalette,
  FaExpandAlt,
  FaBorderNone,
  FaShieldAlt,
  FaImage,
  FaEyeDropper,
  FaTimes
} from 'react-icons/fa';

interface StylingControlsProps {
  styling: QRStyling;
  onChange: (styling: QRStyling) => void;
}

export const StylingControls: React.FC<StylingControlsProps> = ({ styling, onChange }) => {
  const errorCorrectionLevels = [
    { value: 'L' as const, label: 'Low (7%)', description: 'Smallest size, less durable' },
    { value: 'M' as const, label: 'Medium (15%)', description: 'Good balance' },
    { value: 'Q' as const, label: 'Quartile (25%)', description: 'Better durability' },
    { value: 'H' as const, label: 'High (30%)', description: 'Most durable, largest size' }
  ];

  const handleColorChange = (colorType: 'foreground' | 'background', value: string) => {
    // Basic hex color validation
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      onChange({ ...styling, [colorType]: value });
    }
  };

  const removeLogo = () => {
    onChange({ ...styling, logo: undefined });
  };

  return (
    <div className="space-y-8 p-1">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <span className="text-xl text-blue-600 dark:text-blue-400">
          <FaPalette />
        </span>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">QR Code Styling</h3>
      </div>

      {/* Size Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <span className="text-gray-500">
              <FaExpandAlt />
            </span>
            <span>Size</span>
          </label>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-md dark:bg-blue-900 dark:text-blue-200">
            {styling.size}px
          </span>
        </div>
        <input
          type="range"
          min={128}
          max={512}
          step={8}
          value={styling.size}
          onChange={(e) => onChange({ ...styling, size: parseInt(e.target.value, 10) })}
          className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>Small</span>
          <span>Large</span>
        </div>
      </div>

      {/* Margin Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <span className="text-gray-500">
              <FaBorderNone />
            </span>
            <span>Margin</span>
          </label>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-md dark:bg-blue-900 dark:text-blue-200">
            {styling.margin}px
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={20}
          value={styling.margin}
          onChange={(e) => onChange({ ...styling, margin: parseInt(e.target.value, 10) })}
          className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>None</span>
          <span>Wide</span>
        </div>
      </div>

      {/* Color Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-gray-500">
            <FaEyeDropper />
          </span>
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Colors</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* Foreground Color */}
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
              QR Code Color
            </label>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <input
                  type="color"
                  value={styling.foreground}
                  onChange={(e) => handleColorChange('foreground', e.target.value)}
                  className="w-10 h-10 cursor-pointer rounded-lg border-2 border-gray-200 dark:border-gray-600"
                />
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs pointer-events-none">
                  <FaEyeDropper />
                </span>
              </div>
              <input
                type="text"
                value={styling.foreground}
                onChange={(e) => handleColorChange('foreground', e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-lg text-sm font-mono dark:bg-gray-700 dark:border-gray-600"
                placeholder="#000000"
                maxLength={7}
              />
            </div>
          </div>

          {/* Background Color */}
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
              Background Color
            </label>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <input
                  type="color"
                  value={styling.background}
                  onChange={(e) => handleColorChange('background', e.target.value)}
                  className="w-10 h-10 cursor-pointer rounded-lg border-2 border-gray-200 dark:border-gray-600"
                />
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none">
                  <FaEyeDropper />
                </span>
              </div>
              <input
                type="text"
                value={styling.background}
                onChange={(e) => handleColorChange('background', e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-lg text-sm font-mono dark:bg-gray-700 dark:border-gray-600"
                placeholder="#FFFFFF"
                maxLength={7}
              />
            </div>
          </div>
        </div>

        {/* Transparency Toggle */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
              Transparent Background
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Remove background color entirely
            </p>
          </div>
          <button
            onClick={() => onChange({ ...styling, transparent: !styling.transparent })}
            aria-pressed={styling.transparent}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              styling.transparent ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                styling.transparent ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Error Correction Level */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-gray-500">
            <FaShieldAlt />
          </span>
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Error Correction</span>
        </div>

        <select
          value={styling.errorCorrection}
          onChange={(e) =>
            onChange({ ...styling, errorCorrection: e.target.value as QRStyling['errorCorrection'] })
          }
          className="w-full p-3 border border-gray-300 rounded-lg text-sm dark:bg-gray-700 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        >
          {errorCorrectionLevels.map(level => (
            <option key={level.value} value={level.value}>
              {level.label}
            </option>
          ))}
        </select>

        <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {errorCorrectionLevels.find(level => level.value === styling.errorCorrection)?.description}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            Higher levels allow the QR code to be scanned even if damaged
          </p>
        </div>
      </div>

      {/* Logo Upload */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-gray-500">
            <FaImage />
          </span>
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Logo</span>
        </div>

        {!styling.logo ? (
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  if (file.size > 50000) {
                    alert('Logo must be smaller than 50KB');
                    return;
                  }
                  onChange({ ...styling, logo: file });
                }
              }}
              className="hidden"
              id="logo-upload"
            />
            <label htmlFor="logo-upload" className="cursor-pointer">
              <span className="mx-auto text-2xl text-gray-400 mb-2 block">
                <FaImage />
              </span>
              <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload logo</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">PNG, JPG up to 50KB</p>
            </label>
          </div>
        ) : (
          <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-green-600">
                <FaImage />
              </span>
              <div>
                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                  {(styling.logo as File).name}
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  {Math.round((styling.logo as File).size / 1024)}KB
                </p>
              </div>
            </div>
            <button
              onClick={removeLogo}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
              title="Remove logo"
              aria-label="Remove logo"
            >
              <span>
                <FaTimes />
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
