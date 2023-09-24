import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const { error, status } = useRouteError();

  return (
    <section className=''>
      <div className='w-full mt-16 mx-auto flex justify-center items-center'>
        <div className='text-center'>
          <h2 className='text-warning text-5xl font-bold'>
            <span>Error</span> {status || 404}
          </h2>
          <p className='text-red-500 my-10 font-bold'>{error?.message}</p>
          <img src="https://p.xuv.be/wp-content/uploads/2016/12/screenshot-github.com-2016-12-08-14-17-45.png"
           className='error-image w-full max-w-sm mx-auto' alt="Error 404" />

          <Link to='/' className='btn btn-primary my-10'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M7.28 7.72a.75.75 0 010 1.06l-2.47 2.47H21a.75.75 0 010 1.5H4.81l2.47 2.47a.75.75 0 11-1.06 1.06l-3.75-3.75a.75.75 0 010-1.06l3.75-3.75a.75.75 0 011.06 0z" clipRule="evenodd" />
            </svg>
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
