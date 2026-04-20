'use server';

import fs from 'fs/promises';
import path from 'path';

export interface Inquiry {
  id: string;
  type: string;
  participants: string;
  date: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'resolved';
}

const DB_FILE = path.join(process.cwd(), 'data', 'inquiries.json');

// Ensure the data directory and file exist
async function initDB() {
  try {
    await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true });
    try {
      await fs.access(DB_FILE);
    } catch {
      await fs.writeFile(DB_FILE, '[]');
    }
  } catch (error) {
    console.error('Failed to init local DB', error);
  }
}

export async function submitInquiry(data: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) {
  try {
    await initDB();
    const fileContent = await fs.readFile(DB_FILE, 'utf-8');
    const inquiries: Inquiry[] = JSON.parse(fileContent || '[]');

    const newInquiry: Inquiry = {
      ...data,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
      status: 'new'
    };

    inquiries.unshift(newInquiry);
    await fs.writeFile(DB_FILE, JSON.stringify(inquiries, null, 2));

    return { success: true };
  } catch (error) {
    console.error('Failed to save inquiry', error);
    return { success: false, error: 'Internal Server Error' };
  }
}

export async function getInquiries() {
  try {
    await initDB();
    const fileContent = await fs.readFile(DB_FILE, 'utf-8');
    return JSON.parse(fileContent || '[]') as Inquiry[];
  } catch (error) {
    console.error('Failed to read inquiries', error);
    return [];
  }
}

export async function updateInquiryStatus(id: string, status: Inquiry['status']) {
  try {
    await initDB();
    const fileContent = await fs.readFile(DB_FILE, 'utf-8');
    const inquiries: Inquiry[] = JSON.parse(fileContent || '[]');

    const updated = inquiries.map(inq => 
      inq.id === id ? { ...inq, status } : inq
    );

    await fs.writeFile(DB_FILE, JSON.stringify(updated, null, 2));
    return { success: true };
  } catch (error) {
    console.error('Failed to update inquiry', error);
    return { success: false };
  }
}
