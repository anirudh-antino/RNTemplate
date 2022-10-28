import React from "react";
import { Box, HStack, Icon, Modal, Button } from 'native-base';

import Octicons from 'react-native-vector-icons/Octicons'

export default function CustomModal({ handleYes, isOpen, onClose, handleNo,renderChild}){
    return(
        <Modal animationPreset="slide" isOpen={isOpen} onClose={onClose} avoidKeyboard justifyContent="flex-end" size={'full'}>
        <Modal.Content borderTopRadius={'3xl'} >
            <Box alignItems={'center'} mx="4">
                <Icon as={Octicons} name="dash" size={'4xl'}/>
            </Box>
            {renderChild}
            <HStack m={"4"} mb={"8"} justifyContent={'space-between'}>
                <Button w={"45%"} py={'3'} colorScheme={"secondary"} onPress={handleYes}>Yes</Button>
                <Button w={"45%"}  bg={'white'} variant={"outline"} _text={{color:"black"}} onPress={handleNo}>No</Button>
            </HStack>
        </Modal.Content>
      </Modal>
    )

}