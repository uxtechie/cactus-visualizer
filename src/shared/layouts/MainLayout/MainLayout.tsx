export interface MainLayoutProps {
  children: React.ReactNode
  sideBar?: React.ReactNode
  leftSection?: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, sideBar, leftSection }) => {
  return (
    <main className='flex'>
      <section className='flex-initial w-80'>
        {leftSection}
      </section>
      <article className='flex-1'>
        {children}
      </article>
      <aside className='flex-initial w-80'>
        {sideBar}
      </aside>
    </main>
  )
}

export default MainLayout
