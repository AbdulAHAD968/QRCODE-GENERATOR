// hooks/useStorage.ts
import { useState, useEffect, useCallback } from 'react';
import { QRHistoryItem } from '../types';

const HISTORY_KEY = 'qrHistory';
const MAX_HISTORY_ITEMS = 20;

export const useStorage = () => {
  const [history, setHistory] = useState<QRHistoryItem[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const loadHistory = () => {
      try {
        const stored = localStorage.getItem(HISTORY_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setHistory(Array.isArray(parsed) ? parsed : []);
        }
      } catch (error) {
        console.error('Error loading history from localStorage:', error);
        setHistory([]);
      }
    };

    loadHistory();
  }, []);

  // Add to history with duplicate prevention
  const addToHistory = useCallback((item: QRHistoryItem) => {
    setHistory(prevHistory => {
      // Remove duplicates based on content and styling
      const uniqueHistory = prevHistory.filter(existingItem => 
        !isDuplicateQR(existingItem, item)
      );
      
      // Add new item to beginning and limit to max items
      const newHistory = [item, ...uniqueHistory].slice(0, MAX_HISTORY_ITEMS);
      
      // Save to localStorage
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      } catch (error) {
        console.error('Error saving history to localStorage:', error);
      }
      
      return newHistory;
    });
  }, []);

  // Clear history
  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch (error) {
      console.error('Error clearing history from localStorage:', error);
    }
  }, []);

  // Remove single item from history
  const removeFromHistory = useCallback((id: string) => {
    setHistory(prevHistory => {
      const newHistory = prevHistory.filter(item => item.id !== id);
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      } catch (error) {
        console.error('Error updating history in localStorage:', error);
      }
      return newHistory;
    });
  }, []);

  return {
    history,
    addToHistory,
    clearHistory,
    removeFromHistory
  };
};

// Helper function to check if two QR items are duplicates
const isDuplicateQR = (item1: QRHistoryItem, item2: QRHistoryItem): boolean => {
  return (
    JSON.stringify(item1.content) === JSON.stringify(item2.content) &&
    JSON.stringify(item1.styling) === JSON.stringify(item2.styling)
  );
};