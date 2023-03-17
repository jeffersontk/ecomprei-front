import React, { forwardRef } from "react"
import { UseFormRegister } from "react-hook-form"
import { Select as SelectChakra } from "@chakra-ui/react"

export const Select = forwardRef<
  HTMLSelectElement,
  { label: string; options: string[] } & ReturnType<UseFormRegister<any>>
>(function SelectComponent(
  { onChange, onBlur, name, label, options, ...rest },
  ref,
) {
  return (
    <>
      <SelectChakra
        _focus={{
          borderColor: "#F5AE26",
          boxShadow: "0 0 0 1px #F5AE26",
        }}
        name={name}
        {...rest}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
      >
        <option value="">Sem {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </SelectChakra>
    </>
  )
})
