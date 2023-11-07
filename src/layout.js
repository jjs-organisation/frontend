import cursor1 from './static/cursor1.png'
import Header from "./elements/header";
export default function Layout({ inner }) {
    return(
        <>
            <Header />
            <div className="a2">
                <main>
                    { inner }
                </main>
            </div>
        </>
    )
}