import { Link, Outlet } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/SharedLayout';
import { SmallSidebar, BigSidebar, Navbar } from '../../components'

const SharedLayOut = () => {
    return (
        <Wrapper>
            <main className="dashboard">
                <SmallSidebar />
                <BigSidebar />

                <div>
                    <Navbar />
                    <div className="dashboard-page">
                        <Outlet />
                    </div>
                </div>
            </main>

        </Wrapper>
    )
}

export default SharedLayOut