import Header from "../../elements/header";

export default function View({
    project_id,
    project_name
}) {
    const htmlContent = localStorage.getItem(`view-${project_id}`)
    const renderContent = (html) => (
        <iframe
            srcDoc={
                `<html>
                    ${html} 
                 </html>`
            }
            style={{
            }}
            name='content-viewer'
            width='100%'
            height='100%'
            title='viewer'
            sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
        />
    )

    return(
        <>
            <Header inner={
                <span> { project_name } </span>
            } />
            <main className='v-1'>
                {
                    renderContent(htmlContent)
                }
            </main>
        </>
    )
}