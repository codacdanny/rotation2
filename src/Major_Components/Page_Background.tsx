import { Box } from "@chakra-ui/react";

import { ReactNode } from "react";

type PageBackgroundProps = {
  children: ReactNode;
};

const Page_Backround: React.FC<PageBackgroundProps> = ({ children }) => {
  return (
    <Box>
      <Box
        backgroundColor="#E1D7F2"
        maxWidth="100%"
        height="100svh"
        margin="0 auto"
        paddingY="4rem"
        position="relative"
        overflow="hidden">
        <Box
          backgroundColor="#9C7BD3"
          height="100px"
          width="100px"
          borderRadius="50%"
          position="absolute"
          right="-7%"
          top="-3%"
        />

        <Box
          backgroundColor="#CEBDE9"
          height="100px"
          width="100px"
          borderRadius="50%"
          position="absolute"
          left="-10%"
          bottom="-5%"
        />
        <Box
          width="80%"
          position="absolute"
          marginTop="7rem"
          paddingY="rem"
          top="45%"
          left="50%"
          transform="translate(-50%, -50%)">
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Page_Backround;
