import React from 'react';
import { Link } from 'react-router-dom';

export function NavBarFunc(showAdminMenu: boolean, NavBar: () => JSX.Element, setShowAdmin: React.Dispatch<React.SetStateAction<boolean>>) {
    const adminMenuOptions = [
        { link: "/program/list", menuText: "Programs", implemented: true },
        { link: "/step/list", menuText: "Steps", implemented: true },
        { link: "/email/list", menuText: "Email Templates", implemented: false },
        { link: "/text/list", menuText: "Text Templates", implemented: false },
        { link: "/question/list", menuText: "Questions", implemented: false },
    ];
    const mainMenuOptions = [
        { link: "/request/list", menuText: "Requests", implemented: false },
        { link: "/volunteer/list", menuText: "Volunteers", implemented: false },
        { link: "/beneficiary/list", menuText: "Beneficiaries", implemented: false },
    ];
    const adminMenuHTML = getNavBarHTML(adminMenuOptions);
    const mainnMenuHTML = getNavBarHTML(mainMenuOptions);
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
    return NavBar;
}
function getNavBarHTML(mainMenuOptions: { link: string; menuText: string; implemented: boolean; }[]) {
    return mainMenuOptions.map(menuOption => {
        return <Link to={menuOption.link} className={`nav-link ${menuOption.implemented ? "" : "tbd-font"}`}>{menuOption.menuText}</Link>;
    });
}

