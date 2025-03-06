'use client'
import { UseUserPannelStore } from '@/store/userPannelLayout.store'
import { motion } from 'framer-motion'

const MainContentWrapper = ({ children }: { children: React.ReactNode }) => {
  const {isExpanded , isMobile} = UseUserPannelStore()
    return (
    <>
    
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
    </>
  )
}

export default MainContentWrapper