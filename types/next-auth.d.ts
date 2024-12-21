import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
      username?: string;
      type?: "user" | "vendor" | "master";
      cart?: Array<string>;
      wishlist?: Array<string>;
    } & DefaultSession['user'];
  }

  interface User {
    id?: string;
    username?: string;
    type?: "user" | "vendor" | "master";
    cart?: Array<string>;
    wishlist?: Array<string>;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    username?: string;
    type?: "user" | "vendor" | "master";
    cart?: Array<string>;
    wishlist?: Array<string>;
  }
}