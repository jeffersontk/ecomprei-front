import { Button, Card, Stack, Text } from "@chakra-ui/react"
import React from "react"

interface HeaderAdminProps {
  title: string
  buttonTitle?: string
  buttonIcon?: React.ReactElement
  onClick?: () => void
}

const HeaderAdmin: React.FC<HeaderAdminProps> = ({
  title,
  buttonIcon,
  buttonTitle,
  onClick,
}) => {
  return (
    <Stack>
      <Card
        direction="row"
        padding="4"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        minH="72px"
        boxShadow="md"
      >
        <Text fontSize="xl" fontWeight="semibold" color="gray.600">
          {title}
        </Text>

        {buttonTitle && buttonIcon && onClick && (
          <Button
            bgGradient="linear(to-r, #FEA800, #F07301)"
            color="white"
            leftIcon={buttonIcon}
            onClick={() => onClick()}
            _hover={{
              opacity: "0.85",
            }}
          >
            {buttonTitle}
          </Button>
        )}
      </Card>
    </Stack>
  )
}

export default HeaderAdmin
