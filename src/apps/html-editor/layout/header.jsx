export default function EditorHeader({ Inner }){
    return(
        <header id='header-element'>
            <div className="a1">
                <a href='/'>UniJS  Web Editor</a>
            </div>
            <div className="tl-1">
                <Inner />
            </div>
        </header>
    )
}