import {
  Button,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Stack,
} from '@chakra-ui/react'
import React from 'react'

interface ButtonWithPopoverProps {
  buttonTriggerText: string
  onClick: () => void
  children?: React.ReactNode
  isLoading: boolean
}

export const ButtonWithPopover: React.FC<ButtonWithPopoverProps> = ({
  buttonTriggerText,
  children,
  onClick,
  isLoading = false,
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button>{buttonTriggerText}</Button>
      </PopoverTrigger>
      <PopoverContent w="100%">
        <PopoverCloseButton />
        <PopoverBody mt="6">
          <Stack gap="2">
            {children && children}
            <Button
              colorScheme="orange"
              disabled={isLoading}
              isLoading={isLoading}
              onClick={onClick}
            >
              Enviar e-mail
            </Button>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
