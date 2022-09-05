import {RecoilRoot} from 'recoil';
import React from "react";

export const wrapRootElement = ({element}) => {
    return <RecoilRoot>{element}</RecoilRoot>
}