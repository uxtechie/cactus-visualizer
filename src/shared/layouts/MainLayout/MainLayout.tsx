import { ReactNode, FC } from "react"

export interface MainLayoutProps {
  children: ReactNode
  sideBar?: ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ children, sideBar }) => {
  // calibrated aspect ratio between main section and full content
  // to improve responsiveness
  const contentAspectRatio = 'aspect-[17/9]'
  const mainSectionAspectRatio = 'aspect-[13/9.15]'

  return (
    <div
      id='main-layout-blur-effect'
      className='flex h-screen w-screen overflow-hidden backdrop-blur-xl'
    >
      <section
        id='main-layout-content'
        className={`flex h-fit w-full ${contentAspectRatio} place-self-center m-x-auto md:container`}
      >
        <main
          id='main-layout-main-section'
          className={`w-full relative ${mainSectionAspectRatio}`}
        >
          {children}
        </main>
        <aside
          id='main-layout-sidebar'
          className='w-full'
        >
          {sideBar}
        </aside>
      </section>
    </div>
  )
}

export default MainLayout
