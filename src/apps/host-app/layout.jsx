import HeaderHostApp from "./header";

export default function LayoutHostApp({ inner }){
    return(
        <>
            <HeaderHostApp session={false} />
            <div className='h-1'>
                {  inner }
            </div>
        </>
    )
}