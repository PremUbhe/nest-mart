import 'next-auth';
import { UserCart, UserWishlist } from '@/lib/Models/User';

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
      name?: string;
      type?: "user" | "vendor" | "master";
      wishlist?: UserWishlist[];
    } & DefaultSession['user'];
  }

  interface User {
    id?: string;
    username?: string;
    password?: string | null;
    type?: "user" | "vendor" | "master";
    wishlist?: UserWishlist[];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    name?: string;
    type?: "user" | "vendor" | "master";
    wishlist?: UserWishlist[];
  }
}