import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  // Zaštitite određene rute
  if (!token) {
    // Preusmerite korisnika na login ako nije logovan
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Propuštanje zahteva ako je logovan
  return NextResponse.next();
}

// Definišite na koje rute middleware treba da se primeni
export const config = {
  matcher: ['/home/:path*'], // Primeni middleware na /home i sve njegove podstranice
};
