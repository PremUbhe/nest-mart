'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const ErrorPage = () => {

  const router = useRouter();

  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const message = searchParams.get('message');
    setErrorMessage(getErrorMessage(message));
  }, [searchParams]);

  const getErrorMessage = (message: string | null): string => {
    switch (message) {
      case 'not-authorized':
        return "You are not authorized to access this page.";
      case 'not-authenticated':
        return "Please log in to access this page.";
      case 'page-not-found':
        return "The page you are looking for does not exist.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  };

  const handleGoBack = () => {
    router.back(); // Go back to the previous page
  };

  const handleGoHome = () => {
    router.push('/'); // Navigate to the home page
  };

  return (
    <section className="w-full h-screen bg-primary flex justify-center items-center">
      <div className="flex flex-col items-center gap-5 max-w-3xl mx-auto bg-white p-10 rounded-xl shadow-xl">
        <h1 className='text-banner font-bold text-secondary'>Error</h1>
        <h4 className='text-3xl font-semibold text-blue mb-7'>{errorMessage}</h4>
        <div className='flex gap-5'>
          <Button
            variant="outline"
            size="lg"
            color="secondary"
            onClick={handleGoBack}
          >
            Go Back
          </Button>
          <Button
            variant="outline"
            size="lg"
            color="secondary"
            onClick={handleGoHome}
          >
            Go Home
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;

