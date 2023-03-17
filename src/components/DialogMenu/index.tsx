import { Root, Trigger, Portal, Title, Close } from '@radix-ui/react-dialog'
import { StyledContent, StyledOverlay } from '../Dialog'

export const Modal = ({
  isOpen = false,
  children,
  onOpenChange,
  disabled,
}: any) => (
  <Root open={isOpen} onOpenChange={disabled ? undefined : onOpenChange}>
    {children}
  </Root>
)

export const ModalTrigger = Trigger

export const ModalContent = (props: any) => {
  return (
    <Portal>
      <StyledOverlay />
      <StyledContent {...props} />
    </Portal>
  )
}

export const ModalTitle = Title

export const ModalClose = Close
