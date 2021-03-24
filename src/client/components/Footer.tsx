import * as React from 'react';

const Footer = (props: FooterProps) => {   
    return (
        <div className="shadow bg-warning position-relative p-2 mt-3 text-center">
           <h6>Designed by <a href='https://www.andrewkolbe.com' rel='noreferrer' target='_blank'>Andrew Kolbe</a></h6>
       </div>
    );
}

interface FooterProps {}

export default Footer;