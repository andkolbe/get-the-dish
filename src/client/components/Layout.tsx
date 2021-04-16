import React from 'react';

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <main className='container'>
            <section className='row justify-content-center mt-5'>
                <div className='col-lg-7'>
                    {children}
                </div>
            </section>
        </main>
    );
} 

interface LayoutProps {}

export default Layout;