import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const db = await connectToDatabase();
    const data = await req.json();

    const { voterId, firstName, lastName, state, district, faceVerified } = data;

    if (!voterId || !firstName || !lastName || !state || !district) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const result = await db.collection('voterdbuser').insertOne({
      voterId,
      firstName,
      lastName,
      state,
      district,
      faceVerified,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: '✅ Voter submitted', id: result.insertedId });
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  }
}
