import React, { useState, useEffect, useCallback } from 'react';
import { QRGenerator } from '../../lib/qr/generator';
import { QRHistoryItem } from '../../types';
import { 
  FaTrash, 
  FaClock, 
  FaHistory, 
  FaSearch, 
  FaTimes,
  FaEye,
  FaDownload,
  FaCopy
} from 'react-icons/fa';

interface HistoryPanelProps {
  history: QRHistoryItem[];
  onSelectItem: (item: QRHistoryItem) => void;
  onDeleteItem?: (itemId: string) => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ 
  history, 
  onSelectItem, 
  onDeleteItem 
}) => {
  const [items, setItems] = useState<QRHistoryItem[]>(history);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [previewItem, setPreviewItem] = useState<QRHistoryItem | null>(null);

  // Sync with parent history
  useEffect(() => {
    setItems(history);
  }, [history]);

  const clearHistory = () => {
    if (confirm('Are you sure you want to clear all QR code history? This action cannot be undone.')) {
      localStorage.removeItem('qrHistory');
      setItems([]);
    }
  };

  const deleteItem = (itemId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this QR code from history?')) {
      if (onDeleteItem) {
        onDeleteItem(itemId);
      }
      setItems(items.filter(item => item.id !== itemId));
    }
  };

  const downloadQR = (item: QRHistoryItem, event: React.MouseEvent) => {
    event.stopPropagation();
    const qrDataUrl = QRGenerator.generateQRCode(item.content, item.styling);
    const link = document.createElement('a');
    link.download = `qr-code-${item.id.slice(0, 8)}.png`;
    link.href = qrDataUrl;
    link.click();
  };

  const copyQR = async (item: QRHistoryItem, event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      const qrDataUrl = QRGenerator.generateQRCode(item.content, item.styling);
      const response = await fetch(qrDataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      // You could add a toast notification here
      alert('QR code copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy QR code:', err);
      alert('Failed to copy QR code to clipboard.');
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - timestamp;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  const getContentTypeIcon = (type: string) => {
    const icons = {
      text: '📝',
      url: '🌐',
      email: '📧',
      phone: '📱',
      wifi: '📶',
      vcard: '👤',
      event: '📅'
    };
    return icons[type as keyof typeof icons] || '🔲';
  };

  const getContentPreview = (item: QRHistoryItem) => {
    if (typeof item.content.data === 'string') {
      return item.content.data.slice(0, 50) + (item.content.data.length > 50 ? '...' : '');
    }
    
    switch (item.content.type) {
      case 'email':
        return `Email: ${(item.content.data as any).address}`;
      case 'wifi':
        return `WiFi: ${(item.content.data as any).ssid}`;
      case 'vcard':
        return `Contact: ${(item.content.data as any).firstName} ${(item.content.data as any).lastName}`;
      case 'event':
        return `Event: ${(item.content.data as any).title}`;
      default:
        return `${item.content.type.charAt(0).toUpperCase() + item.content.type.slice(1)} QR Code`;
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         getContentPreview(item).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || item.content.type === selectedType;
    return matchesSearch && matchesType;
  });

  const uniqueTypes = ['all', ...Array.from(new Set(items.map(item => item.content.type)))];

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="w-20 h-20 mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <FaHistory className="text-3xl text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No QR History Yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm">
          QR codes you generate will appear here for quick access. Create your first one to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FaHistory className="text-gray-500 dark:text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            QR History ({items.length})
          </h3>
        </div>
        <button
          onClick={clearHistory}
          className="flex items-center gap-2 px-3 py-1 text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-all"
          title="Clear all history"
        >
          <FaTrash className="text-xs" />
          Clear All
        </button>
      </div>

      {/* Search and Filter */}
      <div className="space-y-3">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search QR codes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <FaTimes />
            </button>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {uniqueTypes.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-all ${
                selectedType === type
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
              }`}
            >
              {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* History List */}
      <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar pr-1">
        {filteredItems.slice(0, 20).map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="group relative p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all cursor-pointer"
          >
            {/* Action Buttons */}
            <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
              <button
                onClick={(e) => downloadQR(item, e)}
                className="p-1.5 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                title="Download QR code"
              >
                <FaDownload className="text-xs" />
              </button>
              <button
                onClick={(e) => copyQR(item, e)}
                className="p-1.5 text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
                title="Copy QR code"
              >
                <FaCopy className="text-xs" />
              </button>
              <button
                onClick={(e) => deleteItem(item.id, e)}
                className="p-1.5 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                title="Delete from history"
              >
                <FaTrash className="text-xs" />
              </button>
            </div>

            <div className="flex gap-3">
              {/* QR Preview */}
              <div className="relative">
                <div
                  className="w-12 h-12 bg-cover bg-center rounded border-2 border-gray-100 dark:border-gray-600 group-hover:border-blue-200 dark:group-hover:border-blue-500 transition-colors"
                  style={{
                    backgroundImage: `url(${QRGenerator.generateQRCode(item.content, item.styling)})`
                  }}
                />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-white dark:bg-gray-700 rounded-full border border-gray-200 dark:border-gray-600 flex items-center justify-center text-xs">
                  {getContentTypeIcon(item.content.type)}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate pr-12">
                    {item.title || `QR Code ${item.id.slice(0, 8)}`}
                  </p>
                </div>
                
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                  {getContentPreview(item)}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <FaClock className="text-xs" />
                    {formatDate(item.timestamp)}
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full capitalize">
                    {item.content.type}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State for Filtered Results */}
      {filteredItems.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <FaSearch className="text-3xl mx-auto mb-2 opacity-50" />
          <p>No QR codes found matching your search.</p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedType('all'); }}
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 mt-2"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Footer Info */}
      {filteredItems.length > 0 && (
        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 pt-2 border-t dark:border-gray-700">
          <span>
            Showing {Math.min(filteredItems.length, 20)} of {filteredItems.length} items
          </span>
          {filteredItems.length > 20 && (
            <span className="text-blue-500">Scroll for more</span>
          )}
        </div>
      )}
    </div>
  );
};