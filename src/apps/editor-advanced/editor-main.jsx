import {CodeEditor} from "./core/code-editor";

export default function EditorMain() {
    const ElementFrame = () => (
        <>
            <div className='z-1-upper-panel'>
                <div className='z-1-upper-panel-nav'>
                    <span className='z-1-upper-panel-title'>ProjectName</span>
                    <nav style={{    marginLeft: 150 }}>
                        <ul className="nav-links">
                            <li>
                                <a href="#" className="desktop-item">File</a>
                                <div type="checkbox" id="showDrop"/>
                                <label htmlFor="showDrop" className="mobile-item">File</label>
                                <ul className="drop-menu">
                                    <li><a href="#">New project</a></li>
                                    <li><a href="#">Open project</a></li>
                                    <li><a href="#">Save project</a></li>
                                    <li><a href="#">Save all</a></li>
                                    <li><a href="#">Settings</a></li>
                                    <li><a href="#">To main</a></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                    <nav style={{    marginLeft: 0 }}>
                        <ul className="nav-links">
                            <li>
                                <a href="#" className="desktop-item">Plugins</a>
                                <div type="checkbox" id="showDrop"/>
                                <label htmlFor="showDrop" className="mobile-item">Plugins</label>
                                <ul className="drop-menu">
                                    <li><a href="#">Create plugin</a></li>
                                    <li><a href="#">View plugins</a></li>
                                    <li><a href="#">Publish plugin</a></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                    <nav style={{ marginLeft: 0 }}>
                        <ul className="nav-links">
                            <li>
                                <a href="#" className="desktop-item">Database</a>
                                <div type="checkbox" id="showDrop"/>
                                <label htmlFor="showDrop" className="mobile-item">Plugins</label>
                                <ul className="drop-menu">
                                    <li><a href="#">Create connection</a></li>
                                    <li><a href="#">Browse connections</a></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                    <nav style={{ marginLeft: 0 }}>
                        <ul className="nav-links">
                            <li>
                                <a href="#" className="desktop-item">Help</a>
                                <div type="checkbox" id="showDrop"/>
                                <label htmlFor="showDrop" className="mobile-item">Plugins</label>
                                <ul className="drop-menu">
                                    <li><a href="#">Editor</a></li>
                                    <li><a href="#">Data</a></li>
                                    <li><a href="#">Plugins</a></li>
                                    <li><a href="#">Settings</a></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className='z-1-upper-panel-func'>
                    <select className='z-3'>
                        <option>Compile</option>
                        <option>View</option>
                    </select>
                    <input type='button' value='Start' className='z-4 z-4-start'/>
                    <input type='button' value='Stop' className='z-4 z-4-stop'/>
                </div>
            </div>
            <div className='z-1'>
                <div className='z-1-upper'>
                    <div className='z-2-wrapper'>
                        <div className='z-2-left'>

                        </div>
                        <div className='z-2-center'>
                            <CodeEditor />
                        </div>
                        <div className='z-2-right'>

                        </div>
                    </div>
                </div>
                <div className='z-1-lower'>

                </div>
            </div>
        </>
    )
    return (
        <>
            <ElementFrame />
        </>
    )
}