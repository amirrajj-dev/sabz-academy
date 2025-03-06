'use client'
import Sidebar from '@/components/user/Sidebar/Sidebar'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
      document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') as string)
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768) 
      }
  
      handleResize()
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }, [])
  

  return (
    <div className="flex min-h-screen">
      <div className="bg-base-300 fixed top-0 left-0 right-0 h-5 md:h-20 z-40" />

      <motion.div
        className="fixed top-0 right-0 bottom-0 z-50"
        animate={{ width: isExpanded && !isMobile ? 384 : 80 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        onHoverStart={() => !isMobile && setIsExpanded(true)}
        onHoverEnd={() => !isMobile && setIsExpanded(false)}
      >
        <Sidebar 
          isExpanded={isExpanded}
          isMobile={isMobile}
          setIsMobile={setIsMobile}
        />
      </motion.div>

      <motion.div 
        className="flex-shrink-0"
        animate={{ width: isExpanded && !isMobile ? 384 : 80 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />

      <motion.main
        className="flex-grow p-4 md:p-8 mt-5 md:mt-20"
        layout="position"
      >
        {children}
      </motion.main>

      <div className="bg-base-300 fixed bottom-0 left-0 top-0 w-20 md:w-24 z-40" />
    </div>
  )
}

export default UserLayout