import React from "react";
import BreadCrumbs from "./Breadcrumbs";
import SearchIcon from '@mui/icons-material/Search';
import { Container } from "@mui/material";
const Header = () => {

  return (
        <Container maxWidth="xl" className="bg-white h-12 sticky top-0 z-30">
            <div className="h-full flex items-center justify-between">
            <BreadCrumbs/>
            <div className="flex items-center h-8 bg-gray-200 w-2/4 gap-2 px-2 rounded-md">
            <SearchIcon className="text-gray-500" fontSize="small"/>
            <input className="bg-transparent w-full outline-none" placeholder="Search anything" type="text"/>
            </div>
            </div>
        </Container>
  );
};

export default Header;
