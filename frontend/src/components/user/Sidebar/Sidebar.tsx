'use client'
import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { userMenuItems } from '@/data/data'
import Image from 'next/image'
import SabzText from '@/components/shared/SabzText'
import Link from 'next/link'

interface SidebarProps {
  isExpanded: boolean
  isMobile: boolean
  setIsMobile: (isMobile: boolean) => void
}

const Sidebar = ({ isExpanded, isMobile, setIsMobile }: SidebarProps) => {

  const sidebarVariants = {
    collapsed: { width: 58 },
    expanded: { width: 384 }
  }

  const itemVariants = {
    collapsed: { opacity: 0, x: -20 },
    expanded: { opacity: 1, x: 0 }
  }

  const hoverVariants = {
    hover: { scale: 1.1, originX: 0 },
    rest: { scale: 1 }
  }

  return (
    <motion.div
      className="bg-base-300 min-h-screen z-50 fixed shadow-xl"
      initial="collapsed"
      animate={isExpanded && !isMobile ? 'expanded' : 'collapsed'}
      variants={sidebarVariants}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ width: isMobile ? 58 : undefined }}
    >
      <div className={`flex flex-col pt-16 ${isExpanded ? 'pr-10' : 'pr-2'} items-start`}>
        {!isMobile && (
          <motion.div
            className="flex items-center gap-4 ml-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: isExpanded ? 1 : 0 }}
            transition={{ delay: 0.2 }}
          >
            <Image 
              src={'/logo/logo.webp'} 
              alt='sabzlearn logo' 
              width={80} 
              height={80} 
              className="rounded-lg"
            />
            <AnimatePresence>
              {isExpanded && <SabzText size='size-30' />}
            </AnimatePresence>
          </motion.div>
        )}

        <ul className='flex flex-col gap-6 mt-12 w-full px-.5'>
          {userMenuItems.filter(item=>item.label !== 'پنل ادمین' && item.label !== 'divider' && item.label !== "پنل کاربر").map((item, index) => (
            <motion.li 
              key={index}
              className='relative group'
              variants={hoverVariants}
              whileHover="hover"
              animate="rest"
            >
              <Link href={item.href} className='flex items-center gap-4'>
                <motion.span
                  className={`text-2xl p-2 rounded-lg bg-base-100 shadow-md ${isMobile ? 'tooltip tooltip-left' : ''}`}
                  whileHover={{ rotate: 10 }}
                  data-tip={isMobile ? item.label : ''}
                >
                  {item.icon}
                </motion.span>

                {!isMobile && (
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.span
                        className='text-lg font-dana-extra-light absolute left-20 bg-base-100 px-4 py-2 rounded-lg shadow-md'
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        variants={itemVariants}
                        transition={{ type: 'spring', stiffness: 200 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default Sidebar