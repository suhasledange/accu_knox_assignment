import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
const BreadCrumb = () => {

    const [breadcrumbs, setBreadcrumbs] = useState([{ label: 'Home', href: '/' }]);
    const location = useLocation();
  
    useEffect(() => {
      const pathnames = location.pathname.split('/').filter((x) => x);
      const newBreadcrumbs = pathnames.map((name, index) => {
        const href = `/${pathnames.slice(0, index + 1).join('/')}`;
        const label = name.charAt(0).toUpperCase() + name.slice(1);
        return { label, href };
      });
      setBreadcrumbs([{ label: 'Home', href: '/' }, ...newBreadcrumbs]);
    }, [location]);


  return (
      <Breadcrumbs 
            separator={<ChevronRightIcon fontSize="small" />}
            aria-label="breadcrumb">
        {breadcrumbs.map((breadcrumb, index) => (
          <Link
            key={index}
            underline="hover"
            color={index === breadcrumbs.length - 1 ? 'text.primary' : 'inherit'}
            href={breadcrumb.href}
          >
            {breadcrumb.label}
          </Link>
        ))}
      </Breadcrumbs>
  )
}

export default BreadCrumb
