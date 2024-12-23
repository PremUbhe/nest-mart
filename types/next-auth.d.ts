import 'next-auth';
import { UserCart, UserWishlist } from '@/lib/Models/User';

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
      username?: string;
      type?: "user" | "vendor" | "master";
      cart?: UserCart[];
      wishlist?: UserWishlist[];
    } & DefaultSession['user'];
  }

  interface User {
    id?: string;
    username?: string;
    type?: "user" | "vendor" | "master";
    cart?: UserCart[];
    wishlist?: UserWishlist[];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    username?: string;
    type?: "user" | "vendor" | "master";
    cart?: UserCart[];
    wishlist?: UserWishlist[];
  }
}