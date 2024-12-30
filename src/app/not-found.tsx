import { Button } from '@/components/ui/button'
import { Undo2 } from 'lucide-react'
import { Butterfly_Kids } from 'next/font/google'
import Link from 'next/link'
import React from 'react'

function NotFoundPage() {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div >
        <h1 className=' text-primary flex justify-center text-4xl font-bold'>
          404
          </h1>
          <span className='  text-2xl font-semibold mt-0'>
           Page Not Found
          </span><br />
          <Link href={'/'}>
          <Button className=' mt-6'>
            <Undo2 size={20}/>
            Back to Home page
          </Button>
          </Link>
      </div>
    </div>
  )
}

export default NotFoundPage