//src/app/layout.js
import { Suspense } from 'react';
import ClientProviders from '@/app/ClientProviders';
import { ClientHeader } from '@/debugLibrary/clientHeader';
import '@/app/globals.css';

// Metadata for SEO and Social Media
export const metadata = {
  title: 'DevKitchen - Discover Your Next Meal',
  description: 'DevKitchen is your ultimate kitchen marketplace. Explore recipes, find ingredients, and discover your next meal with ease.',
  openGraph: {
    title: 'DevKitchen - Discover Your Next Meal',
    description: 'Your go-to kitchen marketplace for recipes, ingredients, and more.',
    url: 'https://yourapp.com',
    siteName: 'DevKitchen',
    images: [
      {
        url: 'https://yourapp.com/assets/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DevKitchen - Discover Your Next Meal',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@YourTwitterHandle',
    creator: '@YourTwitterHandle',
    title: 'DevKitchen - Discover Your Next Meal',
    description: 'Your kitchen marketplace for recipes and ingredients.',
    image: 'https://yourapp.com/assets/images/twitter-card.jpg',
  },
  authors: [
    {
      name: 'Your Name',
      url: 'https://linkedin.com/in/your-profile',
    },
  ],
  additionalLinks: {
    github: 'https://github.com/your-username',
    linkedin: 'https://linkedin.com/in/your-profile',
    facebook: 'https://facebook.com/your-page',
    instagram: 'https://instagram.com/your-handle',
  },
};

// Preload Fonts
const fonts = [
  {
    href: '/fontz/Macondo-Regular.woff',
    type: 'font/woff2',
  },
  {
    href: '/fontz/JosefinSans-Regular.woff2',
    type: 'font/woff2',
  },
];

// Conditionally import only in browser (for axe and whyDidYouRender setup)
if (typeof window !== "undefined") {
  import("@/debugLibrary/axe");
}


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        {fonts.map((font, index) => (
          <link
            key={index}
            rel="preload"
            href={font.href}
            as="font"
            type={font.type}
            crossOrigin="anonymous"
          />
        ))}
      </head>
      <body>
          <ClientProviders>
          <ClientHeader />
            <Suspense fallback={<div className="suspenseLoading">Loading...</div>}>
              {children}
            </Suspense>
          </ClientProviders>
      </body>
    </html>
  );
}
