import React from 'react';
import {Skeleton, VStack, Center, HStack, Spacer} from 'native-base';

const Loading = () => {
  return (
    <Center w="100%">
      <VStack
        w="95%"
        space={8}
        rounded="md"
        >
        <Skeleton h="20" rounded="md" />
        <HStack>
        <Skeleton.Text lines={1} w="45%"/>
        <Spacer/>
        <Skeleton.Text lines={1} w="15%"/>
        </HStack>
        <Skeleton h="40" rounded="md" />
        <Skeleton h="40" rounded="md" />
        <HStack>
        <Skeleton.Text lines={1} w="45%"/>
        <Spacer/>
        <Skeleton.Text lines={1} w="15%"/>
        </HStack>
        <Skeleton h="40" rounded="md" />
        <Skeleton h="40" rounded="md" />
      </VStack>
    </Center>
  );
};

export default ({isLoading}) => {
    if(!isLoading) return null
  return (
    <Center flex={1} px="3">
      <Loading />
    </Center>
  );
};
