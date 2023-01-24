import React from 'react'
import { 
  BeakerIcon, 
  NewspaperIcon, 
  Cog6ToothIcon, 
  QueueListIcon,
  ArrowUpOnSquareIcon,
  ArrowDownOnSquareIcon,
  ClipboardDocumentCheckIcon,
  FingerPrintIcon,
  DocumentArrowUpIcon,
  CursorArrowRippleIcon,
  CheckBadgeIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline'

import Card from '@/components/utils/Card'
import Header from './utils/Header'

const Dashboard = () => {

  const Cards = [
    {
      title: "Attendance",
      icon: <BeakerIcon className='h-10 w-10 text-white transition-all group-hover:text-pink'/>
    },
    {
      title: "New Entry",
      icon: <NewspaperIcon className='h-10 w-10 text-white transition-all group-hover:text-pink'/>
    },
    {
      title: "Edit Employee",
      icon: <Cog6ToothIcon className='h-10 w-10 text-white transition-all group-hover:text-pink'/>
    },
    {
      title: "Attendance List",
      icon: <QueueListIcon className='h-10 w-10 text-white transition-all group-hover:text-pink'/>
    },
    {
      title: "Upload Data",
      icon: <ArrowUpOnSquareIcon className='h-10 w-10 text-white transition-all group-hover:text-pink'/>
    },
    {
      title: "Download Data",
      icon: <ArrowDownOnSquareIcon className='h-10 w-10 text-white transition-all group-hover:text-pink'/>
    },
    {
      title: "Attendance Report",
      icon: <ClipboardDocumentCheckIcon className='h-10 w-10 text-white transition-all group-hover:text-pink'/>
    },
    {
      title: "Gate Attendance",
      icon: <FingerPrintIcon className='h-10 w-10 text-white transition-all group-hover:text-pink'/>
    },
    {
      title: "Export Attendance",
      icon: <DocumentArrowUpIcon className='h-10 w-10 text-white transition-all group-hover:text-pink'/>
    },
    {
      title: "Live Report",
      icon: <CursorArrowRippleIcon className='h-10 w-10 text-white transition-all group-hover:text-pink'/>
    },
    {
      title: "Verify Attendance",
      icon: <CheckBadgeIcon className='h-10 w-10 text-white transition-all group-hover:text-pink'/>
    },
    {
      title: "Leave Application",
      icon: <PaperAirplaneIcon className='h-10 w-10 text-white transition-all group-hover:text-pink'/>
    }
  ]

  return (
    <main className="w-screen min-h-screen bg-dark flex flex-col justify-start items-start gap-3 text-white relative scrollbar-hide">
      
      <Header title={"Home"}/>
      <section className="w-full grid grid-cols-2 p-3 gap-3 scrollbar-hide">
        {
          Cards.map((card, index) => (
            <Card key={index} title={card.title} icon={card.icon}/>
          ))
        }
      </section>
    </main>
  )
}

export default Dashboard