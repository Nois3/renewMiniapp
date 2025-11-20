import { NextResponse } from 'next/server';

export async function GET() {
  const manifest = {
    accountAssociation: {
      header: "eyJmaWQiOjEsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHgwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwIn0",
      payload: "eyJkb21haW4iOiJleGFtcGxlLmNvbSJ9",
      signature: "MHg..."
    },
    frame: {
      version: "1",
      name: "Farcaster Mini App Starter",
      iconUrl: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/icon.png`,
      homeUrl: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}`,
      imageUrl: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/preview.png`,
      buttonTitle: "Launch App",
      splashImageUrl: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/splash.png`,
      splashBackgroundColor: "#000000",
      webhookUrl: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/webhook`
    }
  };

  return NextResponse.json(manifest);
}
