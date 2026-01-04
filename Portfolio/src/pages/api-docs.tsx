import { useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';

// Dynamically import SwaggerUI to avoid SSR issues
// @ts-ignore - swagger-ui-react types may not be available
const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });
import 'swagger-ui-react/swagger-ui.css';

export default function ApiDocs() {
  useEffect(() => {
    // Add custom styles for better integration
    const style = document.createElement('style');
    style.textContent = `
      .swagger-ui .topbar { display: none; }
      .swagger-ui .info { margin: 20px 0; }
      .swagger-ui .scheme-container { background: transparent; padding: 20px 0; }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <Head>
        <title>API Documentation | Portfolio</title>
        <meta name="description" content="Complete API documentation for Portfolio website" />
      </Head>
      <div style={{ padding: '20px', backgroundColor: '#fff', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid #e5e7eb' }}>
            <h1 style={{ marginBottom: '10px', fontSize: '2rem', fontWeight: 'bold', color: '#111827' }}>
              Portfolio API Documentation
            </h1>
            <p style={{ marginBottom: '10px', color: '#6b7280', fontSize: '1rem' }}>
              Interactive API documentation with request/response examples. 
              You can test endpoints directly from this page.
            </p>
            <div style={{ 
              padding: '12px 16px', 
              backgroundColor: '#dbeafe', 
              border: '1px solid #93c5fd', 
              borderRadius: '8px',
              fontSize: '0.875rem',
              color: '#1e40af'
            }}>
              <strong>🔒 Protected:</strong> This documentation is only accessible to authenticated users.
            </div>
          </div>
          <SwaggerUI 
            url="/swagger.json"
            docExpansion="list"
            defaultModelsExpandDepth={2}
            defaultModelExpandDepth={2}
            tryItOutEnabled={true}
          />
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/admin/login?callbackUrl=/api-docs',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

