import { CustomFlowbiteTheme } from 'flowbite-react';

export const theme: CustomFlowbiteTheme = {
  sidebar: {
    root: {
      base: "h-full",
      inner: "h-full overflow-y-auto overflow-x-hidden bg-white/50 dark:bg-gray-900/50 py-4 px-3"
    },
    item: {
      base: "flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800",
      active: "bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400",
      icon: {
        base: "h-5 w-5 flex-shrink-0 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white",
        active: "text-blue-600 dark:text-blue-400"
      }
    }
  },
  button: {
    base: "group flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none transition-all duration-200",
    pill: {
      off: "rounded-lg",
      on: "rounded-full"
    }
  },
  navbar: {
    root: {
      base: "fixed z-30 w-full border-b border-gray-200 bg-white/50 dark:border-gray-700 dark:bg-gray-900/50 backdrop-blur-xl"
    }
  },
  avatar: {
    root: {
      base: "flex justify-center items-center space-x-4 rounded-full",
      bordered: "p-1 ring-2",
      img: {
        off: "rounded-full",
        on: "rounded-full"
      },
      size: {
        xs: "w-6 h-6",
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-20 h-20",
        xl: "w-36 h-36"
      }
    }
  }
} as const; 