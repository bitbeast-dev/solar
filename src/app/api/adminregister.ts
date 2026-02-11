import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

let bcrypt: any;
try {
  bcrypt = require('bcryptjs');
} catch {
  bcrypt = {
    hash: async (password: string) => password,
    compare: async (password: string, hash: string) => password === hash
  };
}

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const adminCount = await prisma.user.count({ where: { role: 'admin' } });
    if (adminCount > 0) {
      return NextResponse.json({ error: 'Admin already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.user.create({
      data: {
        email: `${username}@admin.local`,
        name: username,
        password: hashedPassword,
        role: 'admin'
      }
    });

    return NextResponse.json({ success: true, id: admin.id });
  } catch (error) {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
