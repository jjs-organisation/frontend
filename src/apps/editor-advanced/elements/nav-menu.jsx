import {RenderAllPopups} from "./popup/popup-object";
import React from "react";

export const NavMenu = () => (
    <>
        <nav style={{    marginLeft: 150 }}>
            <ul className="nav-links">
                <li>
                    <a href="#" className="desktop-item">File</a>
                    <div type="checkbox" id="showDrop"/>
                    <label htmlFor="showDrop" className="mobile-item">File</label>
                    <ul className="drop-menu">
                        <li><a href="#" className='open-popup__project_create'>New project</a></li>
                        <li><a href="#" className='open-popup__project_open'>Open project</a></li>
                        <li><a href="#" className='open-popup__project_save'>Save project</a></li>
                        <li><a href="#">Save all</a></li>
                        <li><a href="#" className='open-popup__project_settings'>Settings</a></li>
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
                        <li><a href="#" className='open-popup__dataview_1'>Browse connections</a></li>
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
        <RenderAllPopups />
    </>
)