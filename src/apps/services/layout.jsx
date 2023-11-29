import HeaderServices from "./elements/header";

export default function LayoutHostApp({ inner }){
    return(
        <>
            <HeaderServices inner={
                <>
                    <a href='/'> to main page </a>
                </>
            }/>
            <div className='s-1'>
                <main className='s-2'>
                    { inner }
                </main>
            </div>
        </>
    )
}