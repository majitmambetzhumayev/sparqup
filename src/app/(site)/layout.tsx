// src/app/layout.tsx
import { Toaster } from 'react-hot-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { QuestionnaireProvider } from '@/components/questionnaire/QuestionnaireProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <QuestionnaireProvider>
      <Header />
      {children}
      <Footer />
      {/* ✅ Toaster global */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#171717',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </QuestionnaireProvider>
  );
}
