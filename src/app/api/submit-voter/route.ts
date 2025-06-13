import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    console.log("🔔 API Hit: submit-voter");

    const db = await connectToDatabase();
    console.log("✅ Connected to DB");

    const data = await req.json();
    console.log("📦 Received Data:", data);

    const { voterId, firstName, lastName, state, district, faceVerified } = data;

    if (!voterId || !firstName || !lastName || !state || !district) {
      console.log("❗ Missing fields:", { voterId, firstName, lastName, state, district });
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

    console.log("✅ Inserted ID:", result.insertedId);

    return NextResponse.json({ message: '✅ Voter submitted', id: result.insertedId });

  } catch (error: any) {
    console.error("❌ API Error:", error.message || error);
    return NextResponse.json({ message: 'Server error', error: error.message || error }, { status: 500 });
  }
}
