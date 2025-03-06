'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '@/components/user/Sidebar/Sidebar'
import { UseUserPannelStore } from '@/store/userPannelLayout.store'

const SidebarWrapper = () => {
  const {setIsMobile , isExpanded , setIsExpanded , isMobile} = UseUserPannelStore()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize() // Initial check
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <motion.div
      className="fixed top-0 right-0 bottom-0 z-50"
      animate={{ width: isExpanded && !isMobile ? 384 : 80 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onHoverStart={() => !isMobile && setIsExpanded(true)}
      onHoverEnd={() => !isMobile && setIsExpanded(false)}
    >
      <Sidebar setIsMobile={setIsMobile} isExpanded={isExpanded} isMobile={isMobile} />
    </motion.div>
  )
}

export default SidebarWrapper