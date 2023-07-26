import SettingsPageForm from '@/components/uiComponents/SettingsPageForm';
import { getStore } from '@/utils/protectuser'
import React from 'react'

interface settingsPage {
    params: {
        storeId: string;
    }
};

const StoreSettingsPage: React.FC<settingsPage> = async({params} ) => {
    const store = await getStore(params.storeId)
  return (
    <div className='flex-col'>
        <div className='flex-1 space-x-4 py-8 pt-6'>
        <SettingsPageForm initialData={store} />
        </div>
    </div>
  )
}

export default StoreSettingsPage