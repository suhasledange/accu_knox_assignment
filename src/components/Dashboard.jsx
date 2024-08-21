import {Container } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import CachedIcon from '@mui/icons-material/Cached';
import Button from './Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TimeSelect from './TimeSelect';
import { useDashboardContext } from '../context/DashboardProvider';
import Category from './Category';
import FormMenu from './FormMenu';
const Dashboard = () => {

    const { dashboardData,setFormDialog } = useDashboardContext();

    const handleFormDialog = ()=>{
        setFormDialog(true)
    }

  return (
    <Container maxWidth="xl" className='bg-gray-200 h-full pb-8'>
    <div className='pt-4 mx-auto w-full flex-col items-center justify-center'>
        <div className='flex items-center justify-between w-full'>     
                <h1 className='font-bold text-md'>CNAPP Dashboard</h1>
                <div className='flex items-center gap-6'>
                    <Button func={handleFormDialog} text='Add Widget' icon={<AddIcon fontSize='small' className='text-gray-600'/>}/>
                    <Button icon={<CachedIcon fontSize='small' className='text-gray-600'/>}/>
                    <Button icon={<MoreVertIcon fontSize='small' className='text-gray-600'/>}/>
                    <TimeSelect/>
                </div>
        </div>


        <div className="flex flex-col gap-2 items-start w-full px-1 mt-2">
      {dashboardData?.categories?.map((category) => (
        <Category
          key={category.id}
          category={category}
        />
      ))}
    </div>

    </div>
    <FormMenu/>
</Container>
  )
}

export default Dashboard
