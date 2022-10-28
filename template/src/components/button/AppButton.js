import React from 'react';
import {Box, Button} from 'native-base';
export default function AppButton({label, ...other}) {
  return (
    <Box bg={'background.50'}>
      <Button
        size={'lg'}
        borderRadius={'10'}
        colorScheme={'secondary'}
        m={'4'}
        py={'3'}
        {...other}>
        {label}
      </Button>
    </Box>
  );
}
