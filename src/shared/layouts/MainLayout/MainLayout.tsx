export interface MainLayoutProps {
  children: React.ReactNode
  sideBar?: React.ReactNode
  leftSection?: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, sideBar, leftSection }) => {
  return (
    <section className='flex'>
      <section className='flex-initial w-80'>
        {leftSection}
      </section>
      <main className='flex-1'>
        {children}
      </main>
      <aside className='flex-initial w-80'>
        {sideBar}
      </aside>
    </section>
  )
}

export default MainLayout
