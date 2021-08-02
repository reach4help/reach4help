import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function getNavBarHTML(mainMenuOptions: { link: string; menuText: string; implemented: boolean; }[]) {
    return mainMenuOptions.map(menuOption => {
        return (
            <Link to={menuOption.link} key={menuOption.menuText} className={`nav-link ${menuOption.implemented ? "" : "tbd-font"}`}>
                {menuOption.menuText}
            </Link>
        );
    });
}

export function NavBarFunc() {
    const [showAdminMenu, setShowAdmin] = useState(false);
    const adminMenuOptions = [
        { link: "/program/list", menuText: "Programs", implemented: true },
        { link: "/stage/list", menuText: "Stages", implemented: true },
        { link: "/email/list", menuText: "Email Templates", implemented: false },
        { link: "/text/list", menuText: "Text Templates", implemented: false },
        { link: "/question/list", menuText: "Questions", implemented: false },
    ];
    const mainMenuOptions = [
        { link: "/request/list", menuText: "Requests", implemented: true },
        { link: "/volunteer/list", menuText: "Volunteers", implemented: false },
        { link: "/beneficiaries/list", menuText: "Beneficiaries", implemented: false },
    ];
    const adminMenuHTML = getNavBarHTML(adminMenuOptions);
    const mainnMenuHTML = getNavBarHTML(mainMenuOptions);

    let NavBar = (() => { return (<div></div>) });
    if (showAdminMenu) {
        NavBar = () => {
            return (
                <div>
                    <Link to={'/'} className="nav-link">
                        <span onClick={() => setShowAdmin(false)}>Home</span>
                    </Link>
                    {adminMenuHTML}
                </div>
            );
        };
    } else {
        NavBar = () => {
            return (
                <div>
                    <Link to={'/admin'} className="nav-link">
                        <span onClick={() => setShowAdmin(true)}>Admin</span>
                    </Link>
                    {mainnMenuHTML}
                </div>
            );
        };
    }
    console.log(mainMenuOptions)
    return NavBar;
}

