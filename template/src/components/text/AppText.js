import React from "react";
import { Text } from 'native-base';
export default function AppText({children, fontWeight=400, fontSize=14, ...other}){
    return(
       <Text fontFamily={'body'} fontWeight={fontWeight} fontSize={fontSize} {...other}>{children}</Text>
    )

}