"use client";

import { useRouter } from 'next/navigation';
import React from 'react'
import Heading from './Heading';
import Button from './Button';

interface EmptyState {
    title?:string;
    subTitle?:string;
    showReset?: boolean;
}


const EmptyState: React.FC<EmptyState> = ({
    showReset,
    subTitle =  'Try changing or removing some of your filters',
    title = 'No exact matches',
}) => {

  const router = useRouter();

  return (
    <div className='
        h-[60vh]
        flex
        flex-col
        gap-2
        justify-center
        items-center
    '>
        <Heading 
            title={title}
            subtitle={subTitle}
            center
        />
        <div className='w-48 mt-4'>
            {showReset && (
                <Button
                    outline
                    label='Remove all filters'
                    onClick={() => router.push('/')}
                />
            )}
        </div>
    </div>
  )
}

export default EmptyState