import React from 'react';
import {Request} from "../../../../models/requests";

export interface MapRequestProps {
    center: LocationProps;
    id: string;
}

export interface LocationProps {
    lat: number;
    lng: number;
}

interface DummyRequestItemComponentProps {
    request: Request;
}

const DummyRequestItemComponent: React.FC<DummyRequestItemComponentProps> = (
    {
        request,
    },
) => (
    <div>
        {request.title}
        <br/>
        {request.description}
        <br/>
    </div>
);

DummyRequestItemComponent.propTypes = {};

export default DummyRequestItemComponent;
