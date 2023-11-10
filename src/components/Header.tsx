import Link from "next/link";

const Header = () => {
    return (
        <header className="header">
            <div className="wrapper">
                <nav className="nav">                    
                    <Link className="header__home" href="/">Product</Link>
                    <Link className="header__app" href="/tire/upstair/spec/12">庫存管理</Link>
                    <Link className="header__app" href="/record">銷售</Link>
                    <Link className="header__app" href="/todo">代辦清單</Link>
                    <Link className="header__app" href="/csv">CSV</Link>
                    <Link className="header__backend" href="/backend">後台管理</Link>
                </nav>
            </div>
        </header>
    );
}

export default Header